const express =require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
const {
    getAllBooks, 
    getSingleBookById, 
    getAllIssuedBooks 
} = require("../controllers/book-controller");

// const BookModel = require("../models/book-model");
// const UserModel = require("../models/user-model");

const { UserModel, BookModel } = require("../models");

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
router.post("/", (req,res)=>{
    const { data } = req.body;
    if(!data){
        return res.status(400).json({
            success: false,
            message: "No data provided",
        });
    }
    const book = books.find((each)=> each.id === data.id);
    if(book){
        return res.status(404).json({
            success: false,
            message: "Book already exists with this id, please use a unique id"
        });
    }
    const allBooks = [...books, data];
    return res.status(200).json({
        success: true,
        data: allBooks,
    });
});



/**
 * Route: /books/:id
 * Method: PUT
 * Dscription: Update book
 * Access: Public
 * Parameters: id
 */
 router.put("/:id", (req,res)=>{
    const { id } = req.params;
    const { data } = req.body;
    
    const book = books.find((each)=> each.id === id);
    if(!book){
        return res.status(400).json({
            success: false,
            message: "Book not found with this perticular id"
        });
    }
    const updateData = books.map((each)=>{
        if(each.id === id){
            return { ...each, ...data }
        }
        return each;
    })
    return res.status(200).json({
        success: true,
        data: updateData,
    });
});


module.exports = router;