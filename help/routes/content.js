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
    const sql = 'INSERT INTO masnyd_artists (name, date) VALUES (?,?)';
    const date = req.body.start;
    const name = req.body.name;
    await pool.promise()
    .query(sql, [name, date])
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
    await pool.promise()
        .query('SELECT * FROM masnyd_artists')
        .then(([rows, fields]) => {
            res.render('Newsong.njk', {
                artists: rows,
                title:  'NewSong',
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                meeps: {
                    error: 'Error getting meeps'
                }
            })
        })

    res.render('', { title: 'Artist' });
});

router.post('/newsong', async function (req, res, next) {
    const sql = 'INSERT INTO masnyd_songs (song_name, song_album, artists, genres, audiofile, imagefile) VALUES (?,?,?,?,?,?)';
    const song_name = req.body.song_name;
    const song_album = req.body.song_album;
    const artists = req.body.artists;
    const genres = req.body.genres;
    const audiofile = req.body.audiofile;
    const imagefile = req.body.imagefile;

    await pool.promise()
    .query(sql, [song_name, song_album, artists, genres, audiofile, imagefile])
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


router.get('/song/:id', async (req, res, next) => {
    const id = req.params.id;

    if (isNaN(req.params.id)) {
        res.status(400).json({
            meep : {
                error: 'Bad request'
            }
        })
    } else {
        await pool.promise()
        .query('SELECT * FROM masnyd_songs WHERE id = ?', [id])
        .then(([rows, fields]) => {
            res.render('song.njk', {
                songs: rows,
                title:  'meeps',
                layout: 'layout.njk'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                meeps: {
                    error: 'Error getting meeps'
                }
            })
        })
    }
});

module.exports = router;