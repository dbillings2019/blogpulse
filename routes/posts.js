const express = require('express');
const db = require('../models');
const router = express.Router();

//POST /posts - create a new post
router.post('/', function(req, res) {
    db.post.create({
        title: req.body.title,
        content: req.body.content,
        authorId: req.body.authorId
    }).then(function(post) {
        res.redirect('/');
    }).catch(function(error) {
        res.status(500).render('main/500')
    });
});

//GET /posts/new - sends the form for a new post
router.get('/new', function(req, res) {
    db.author.findAll()
    .then(function(authors) {
        res.render('posts/new', {authors});
    }).catch(function(error) {
        res.status(500).render('main/500');
    });
});

//GET /posts/:id - reads one post
router.get('/:id', function(req, res) {
    db.post.findOne({
        where: {id: parseInt(req.params.id)},
        include: [db.author, db.comment]
    }).then(function(post) {
        if (!post) throw Error();
        res.render('posts/show', {post});
    }).catch(function(error) {
        res.status(500).render('main/500')
    });
});

module.exports = router;