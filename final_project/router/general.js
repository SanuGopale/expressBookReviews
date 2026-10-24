const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.get('/', function (req, res) {
  res.status(200).json(books);
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/', function (req, res) {
  res.status(200).json(books);
});
  
// Get book details based on author
public_users.get('/', function (req, res) {
  res.status(200).json(books);
});
// Get all books based on title
public_users.get('/', function (req, res) {
  res.status(200).json(books);
});

//  Get book review
public_users.get('/', function (req, res) {
  res.status(200).json(books);
});
module.exports.general = public_users;
