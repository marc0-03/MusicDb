const { response } = require('express');
var express = require('express');
var router = express.Router();
const pool = require('../database');
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');

/* GET users listing. */

router.get('/', function (req, res, next) {
  res.render('signin.njk', { 
    session: req.session,
    title: 'signin' 
  });
});
router.get('/signin', function (req, res, next) {
  res.render('signin.njk', { 
    session: req.session,
    title: 'signin' 
  });
});
router.get('/signup', function (req, res, next) {
  res.render('signup.njk', { 
    session: req.session,
    title: 'signup' 
  });
});

router.post('/signin', async function (req, res, next) {
  const name = req.body.name
  const password = req.body.password
  await pool
  .promise()
  .query("SELECT id, password FROM masnyd_users WHERE name = ?", [name])
  .then(([rows]) => {
    console.log(rows[0].password);
   bcrypt.compare(password, rows[0].password, function (err, result) {
      console.log(result)
      if (result) {
      req.session.name = name;
      req.session.loggedin = true;
      req.session.userID = rows[0].id;
      console.log(req.session.name, req.session.userID);

      //return res.json(req.session)
      return res.redirect('/content');
  
      } else {
        res.render('signin.njk', { session: req.session, title: 'signin', error: 'Wrong username or password' });
      }
    });
  })
  .catch((err) => {
    res.render('signin.njk', { session: req.session, title: 'signin', error: 'Wrong username or password' });

    console.log(err);
  });
});
router.post('/signup', function (req, res, next) {
  const name = req.body.name
  const password = req.body.password
  const check = req.body.cpassword
  if (name.length < 4) {
    res.render('signup.njk', { session: req.session, title: 'signup', error: 'username to short' });
  } else if (password.length < 4) {
    res.render('signup.njk', { session: req.session, title: 'signup', error: 'Password to weak' });
  } 
  if (password != check) {
    res.render('signup.njk', { session: req.session, title: 'signup', error: 'Passwords did not match' });
  }



  bcrypt.hash(password, 10, async function (err, hash) {
    console.log(hash)
    await pool
      .promise()
      .query("INSERT INTO masnyd_users (name,password) VALUES (?,?)", [name, hash])
      .then((response) => {
        res.redirect('/users/signin');
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
router.get('/signout', function (req, res, next) {
      req.session.destroy();
      res.redirect('/content');
});



module.exports = router;