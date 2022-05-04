const { response } = require('express');
var express = require('express');
var router = express.Router();
const pool = require('../database');
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');

/* GET users listing. */

router.get('/', function (req, res, next) {
  res.render('signin.njk', { title: 'signin' });
});
router.get('/signin', function (req, res, next) {
  res.render('signin.njk', { title: 'signin' });
});
router.get('/signup', function (req, res, next) {
  res.render('signup.njk', { title: 'signup' });
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
        res.render('signin.njk', { title: 'signin', error: 'Wrong username or password' });
      }
    });
  })
  .catch((err) => {
    res.render('signin.njk', { title: 'signin', error: 'Wrong username or password' });

    console.log(err);
  });
});
router.post('/signup', function (req, res, next) {
  const name = req.body.name
  const password = req.body.password
  const check = req.body.cpassword
  if (name.length < 4) {
    res.send("Username is to short");
  } else if (password.length < 4) {
    res.send("PAssword to weAk");
  } 
  if (password != check) {
    res.send("PAssword and check dont match");
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
      res.redirect('/users');
});


router.post('/', async (req, res, next) => {
  // { "tweet": "koda post" }
  const tweets = req.body.tweets;
  const id = req.session.userID;
  await pool
      .promise()
      .query('INSERT INTO meeps (body,user_id) VALUES (?,?)', [tweets, id])
      .then((response) => {
          if (response[0].affectedRows === 1) {
              res.redirect('/users/content');
          } else {
              res.status(400).json({
                  tweet: {
                      error: 'Invalid tweet',
                  },
              });
          }
      })
      .catch((err) => {
          console.log(err);
      });
});



module.exports = router;