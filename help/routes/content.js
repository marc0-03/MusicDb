const { response } = require('express');
var express = require('express');
var router = express.Router();
const pool = require('../database');
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');

router.get('/', async function(req, res, next) {

    if (req.session.loggedin) {
        req.session.destroy();
        res.send('CONTENT SITE -- LOGGED IN');
    } else {
        res.render('content.njk', { title: 'content' });
    }

});
  
router.get('/content', async function (req, res, next) {
    console.log(req.session);
    if (req.session.loggedin) {
      //res.render('content.njk', { title: 'content' , name: req.session.name});
        await pool.promise()
            .query('SELECT meeps.*,users.name FROM meeps JOIN users ON users.id=meeps.user_id ORDER BY created_at DESC')
            .then(([rows, fields]) => {
                res.render('content.njk', {
                    meeps: rows,
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    meeps: {
                        error: 'Error gettings meeps'
                    }
                })
            });  
      
    } else {
    //  res.json(req.session);
      res.redirect('/users/signin');
    }
  
});

router.get('/newartist', async function (req, res, next) {
    res.render('Newartist.njk', { title: 'Artist' });
});
router.post('/newartist', async function (req, res, next) {
    const sql = 'INSERT INTO masnyd_artists (name) VALUES (?)'; 
    const name = req.body.name;
    await pool.promise()
    .query(sql, [name])
    .then((response) => {
        res.render('content.njk', { title: 'content' });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            meeps: {
                error: "Cannot retrieve meeps"
            }
        });
    });
});

router.get('/newsong', async function (req, res, next) {
    res.render('Newsong.njk', { title: 'Artist' });
});
module.exports = router;