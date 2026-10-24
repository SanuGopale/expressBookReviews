
const express = require('express');
const axios = require('axios');
const auth = require('./auth_users.js');
const books = require('./booksdb.js');

const public_users = express.Router();

// Register a new user
public_users.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: 'Username and password are required'
    });
  }

  if (auth.users[username]) {
    return res.status(409).json({
      message: 'User already exists'
    });
  }

  auth.users[username] = {
    username,
    password
  };

  return res.status(200).json({
    message: 'User successfully registered'
  });
});

// Get all books
public_users.get('/', (req, res) => {
  return res.status(200).json(books);
});

// Get book by ISBN using Axios and a Promise
public_users.get('/isbn/:isbn', (req, res) => {
  axios.get('http://localhost:5000/')
    .then(response => {
      const book = response.data[req.params.isbn];

      if (!book) {
        return res.status(404).json({
          message: 'Book not found'
        });
      }

      return res.status(200).json(book);
    })
    .catch(error => {
      console.error(error.message);
      return res.status(500).json({
        message: 'Error retrieving book'
      });
    });
});

// Get books by author using Axios and a Promise
public_users.get('/author/:author', (req, res) => {
  axios.get('http://localhost:5000/')
    .then(response => {
      const author = decodeURIComponent(req.params.author).toLowerCase();

      const result = Object.values(response.data).filter(
        book => book.author.toLowerCase() === author
      );

      return res.status(200).json(result);
    })
    .catch(error => {
      console.error(error.message);
      return res.status(500).json({
        message: 'Error retrieving books by author'
      });
    });
});

// Get books by title using Axios and a Promise
public_users.get('/title/:title', (req, res) => {
  axios.get('http://localhost:5000/')
    .then(response => {
      const title = decodeURIComponent(req.params.title).toLowerCase();

      const result = Object.values(response.data).filter(
        book => book.title.toLowerCase() === title
      );

      return res.status(200).json(result);
    })
    .catch(error => {
      console.error(error.message);
      return res.status(500).json({
        message: 'Error retrieving books by title'
      });
    });
});

// Get reviews for a book
public_users.get('/review/:isbn', (req, res) => {
  const book = books[req.params.isbn];

  if (!book) {
    return res.status(404).json({
      message: 'Book not found'
    });
  }

  return res.status(200).json(book.reviews || {});
});

module.exports.general = public_users;
