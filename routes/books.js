const express = require('express');
const Book = require('../models/book.model');
const Author = require('../models/author.model');

const router = express.Router()

//All Books Route
router.get('/', async (req, res) => {
    res.send("books")
   
})


//New Book Route
router.get('/new', async (req, res) => {
    console.log("here");
    try {
        console.log("here 1");
        const authors = await Author.Find({})
        console.log("here 2");
        const book = new Book()
        console.log("here 3");
        res.render('books/new', {authors:authors, book:book})
        console.log("here 4");
    } catch  {
        res.redirect('/books')
        console.log('here now')
    }
})


//Create Book Route
router.post('/', async (req, res) => {

   res.send('create')
})

module.exports = router