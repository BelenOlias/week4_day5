const express = require('express')
const router = express.Router()

const Book = require('../models/book.model')
const Author = require('../models/author.model')


// Books list
router.get('/listado', (req, res) => {

    Book.find({}, { title: 1 })         // Title and ID only
        .then(books => res.render('books-list', { books }))
        .catch(err => console.log('ERROR:', err))
})


// Book detail
router.get('/detalles/:book_id', (req, res) => {

    const id = req.params.book_id

    Book.findById(id)
        .populate('author')         // Nombre del campo a popular
        .then(theFullBookDetails => res.render('book-details', theFullBookDetails))
        .catch(err => console.log("ERRORR", err))
})


// New book form render
router.get('/crear', (req, res) => res.render('book-create-form'))

// New book form process
router.post('/crear', (req, res) => {

    const { title, description, author, rating } = req.body

    Book.create({ title, description, author, rating })
        .then(() => res.redirect('/libros/listado'))
        .catch(err => console.log("ERRORR", err))
})


// Edit book form render
router.get('/editar', (req, res) => {

    const book_id = req.query.book_id

    // Hacer llamnada opara traer todos los autores
    // pasarlo a la vista para renderizar una lista desplegable de selección con un autor por cada opción

    Book.findById(book_id)
        .then(theFullBookDetails => res.render('book-edit-form', theFullBookDetails))
        .catch(err => console.log("ERRORR", err))
})


// Edit book form process
router.post('/editar/:book_id', (req, res) => {

    // No disponemos del ID en el formulario, por lo que lo obtenemos mediante Route Params
    const book_id = req.params.book_id

    const { title, description, author, rating } = req.body

    Book.findByIdAndUpdate(book_id, { title, description, author, rating })
        .then(() => res.redirect('/libros/listado'))
        .catch(err => console.log("ERRORR", err))
})


module.exports = router
