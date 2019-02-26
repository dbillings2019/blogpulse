const express = require('express');
const db = require('../models');
const router = express.Router();

//GET /authors - reads all authors
router.get('/', function(req, res) {
    db.author.findAll()
    .then(function(authors) {
        res.render('authors/index', {authors})
    });
});

//POST /authors - creates a new author
router.post('/', function(req, res) {
    db.author.create({
        name: req.body.name
    }).then(function(author) {
        res.redirect('/authors')
    });
});

//GET /authors/new - sends the form for creating a new author
router.get('/new', function(req, res) {
    res.render('authors/new');
});

//GET /authors/:id - show one author AND their posts
router.get('/:id', function(req, res) {
    db.author.findOne({
        where: {id: parseInt(req.params.id)},
        include: [db.post]
    }).then(function(author){
        res.render('authors/show', {author});
    });
});

module.exports = router;