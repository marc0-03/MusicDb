const { response } = require('express');
var express = require('express');
var router = express.Router();
const pool = require('../database');
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');


router.get('/', async function(req, res, next) {
    /*
    if (req.session.loggedin) {
        req.session.destroy();
        res.send('CONTENT SITE -- LOGGED IN');
    } else {
    }
    */
   console.log(req.session)

    await pool.promise()
        .query('SELECT masnyd_songs.*,masnyd_artists.name FROM masnyd_songs JOIN masnyd_artists ON masnyd_songs.artists=masnyd_artists.id')
        .then(([rows, fields]) => {
            console.log(rows);
            
            res.render('content.njk', {
                session: req.session,
                songs: rows,
                title:  'content',
                layout: 'layout.njk'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                meeps: {
                    error: 'Error getting songs'
                }
            })
        })
    

});
  
router.get('/content', async function (req, res, next) {
    console.log(req.session);
    if (req.session.loggedin) {
        await pool.promise()
            .query('SELECT meeps.*,users.name FROM meeps JOIN users ON users.id=meeps.user_id ORDER BY created_at DESC')
            .then(([rows, fields]) => {
                res.render('content.njk', {
                    session: req.session,
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

router.get('/newartist', function (req, res, next) {
    if (!req.session.loggedin) {
        res.redirect("/content")
    }
    res.render('Newartist.njk', {
        session: req.session,
        title: 'Artist' 
    });
});
router.post('/newartist', async function (req, res, next) {
    if (!req.session.loggedin) {
        res.redirect("/content")
    }
    const sql = 'INSERT INTO masnyd_artists (name, date) VALUES (?,?)';
    const date = req.body.start;
    const name = req.body.name;
    await pool.promise()
    .query(sql, [name, date])
    .then((response) => {
        res.redirect("/content")
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
    if (!req.session.loggedin) {
        res.redirect("/content")
    }
    await pool.promise()
        .query('SELECT * FROM masnyd_artists')
        .then(([rows, fields]) => {
            res.render('Newsong.njk', {
                session: req.session,
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
});

router.post('/newsong', async function (req, res, next) {
    if (!req.session.loggedin) {
        res.redirect("/content")
    }
    console.log(req.body);
    const sql = 'INSERT INTO masnyd_songs (song_name, song_album, artists, genres, song_link) VALUES (?,?,?,?,?)';
    const song_name = req.body.songname;
    const song_album = req.body.albumname;
    const artists = req.body.artists;
    const genres = req.body.genres;
    let song_link = req.body.song_link;
    console.log(artists);
    console.log(genres);

    let x = song_link.split('/')[4]
    let y = x.split('?')[0]
    console.log(y);
    song_link = "https://open.spotify.com/embed/track/"+y+"?utm_source=generator";
    console.log(song_link);

    await pool.promise()
    .query(sql, [song_name, song_album, artists, genres.join(), song_link])
    .then((response) => {
        res.redirect("/content")
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            meeps: {
                error: "something went wrong"
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
        .query('SELECT masnyd_songs.*,masnyd_artists.name FROM masnyd_songs JOIN masnyd_artists ON masnyd_songs.artists=masnyd_artists.id WHERE masnyd_songs.id = ?', [id])
        .then(([rows, fields]) => {
            res.render('song.njk', {
                session: req.session,
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
router.post('/song/:id', async (req, res, next) => {
    const id = req.params.id;
    const sql = 'INSERT INTO masnyd_ratings (user_id, rating, song_id) VALUES (?,?,?)';
    let rating = req.body.range;

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
                session: req.session,
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

router.post('/search', async (req, res, next) => {
    const search = "SELECT masnyd_songs.*, masnyd_artists.name FROM masnyd_songs JOIN masnyd_artists ON masnyd_songs.artists=masnyd_artists.id WHERE song_name LIKE '%"+req.body.search+"%'";
    console.log(search)   

    await pool.promise()
        .query(search)
        .then(([rows, fields]) => {
            res.render('content.njk', {
                session: req.session,
                songs: rows,
                title:  'content',
                layout: 'layout.njk'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                tasks: {
                    error: 'Error getting tasks'
                }
            })
        })
});

module.exports = router;