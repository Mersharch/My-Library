const express = require('express');
const Author = require('../models/author.model');

const router = express.Router()

//All Authors Route
router.get('/', async (req, res) => {

    let sOptions={}
    if(req.query.name != null && req.query.name != ""){
        sOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(sOptions)
        res.render('authors/index',{authors:authors})
    } catch {
        res.redirect('/')
    }
})


//New Author Route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() });
})


//Create Author Route
router.post('/', async (req, res) => {

    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save()
        res.redirect('/authors')
        console.log(newAuthor);
    } catch {
        res.render('authors/new', {errorMsg:'Error creating Author'})
    }
   
})

module.exports = router