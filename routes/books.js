const express =require("express");
// const { books } = require("../data/books.json");
// const { users } = require("../data/users.json");

const {
    getAllBooks, 
    getSingleBookById, 
    getAllIssuedBooks, 
    addNewBook,
    updateBookById
} = require("../controllers/book-controller");

// const BookModel = require("../models/book-model");
// const UserModel = require("../models/user-model");

//const { UserModel, BookModel } = require("../models");

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Dscription: Get all books
 * Access: Public
 * Parameters: None 
 */
router.get("/", getAllBooks);


/**
 * Route: /books/:id
 * Method: GET
 * Dscription: Get book by id
 * Access: Public
 * Parameters: id 
 */
 router.get("/:id", getSingleBookById);


/**
 * Route: /books/issued/by-user
 * Method: GET
 * Dscription: Get all issued books
 * Access: Public
 * Parameters: none
 */
router.get("/issued/by-user", getAllIssuedBooks);


/**
 * Route: /books
 * Method: POST
 * Dscription: Craete a book
 * Access: Public
 * Parameters: none
 */
router.post("/", addNewBook);



/**
 * Route: /books/:id
 * Method: PUT
 * Dscription: Update book
 * Access: Public
 * Parameters: id
 */
 router.put("/:id", updateBookById);
 


module.exports = router;