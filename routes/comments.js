const express = require('express');
const db = require('../models');
const router = express.Router();


//POST /comments - create a new comment
router.post('/', function(req, res) {
    db.post.findById(parseInt(req.body.postId))
    .then(function(post) {
        post.createComment({
            name: req.body.name,
            content: req.body.content
        }).then(function(comment) {
            res.redirect('/posts/' + post.id )
        })
    });
});

module.exports = router;