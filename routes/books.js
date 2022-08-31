const express =require("express");
const router = express.Router();
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");


/**
 * Route: /books
 * Method: GET
 * Dscription: Get all books
 * Access: Public
 * Parameters: None 
 */
router.get("/", (req,res)=>{
    res.status(200).json({
        suceess: true,
        data: books,
    })
});


/**
 * Route: /books/:id
 * Method: GET
 * Dscription: Get book by id
 * Access: Public
 * Parameters: id 
 */
 router.get("/:id", (req,res)=>{
  const { id } = req.params;
  const book = books.find((each)=> each.id === id);
  if(!book){
    return res.status(404).json({
        success: false,
        message: "Book not found",
    });
  }
  return res.status(200).json({
    success: true,
    data: book,
  });
});



/**
 * Route: /books/issued/by-user
 * Method: GET
 * Dscription: Get all issued books
 * Access: Public
 * Parameters: none
 */
router.get("/issued/by-user", (req,res)=>{
    const usersWithIssuedBooks = users.filter((each) => {
        if(each.issuedBook) return each; 
    });
    const issuedBook = [];
    usersWithIssuedBooks.forEach((each)=>{
        const book = books.find((book)=> book.id === each.issuedBook);

        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;
        issuedBook.push(book);
    });
    if(issuedBook.length === 0)
     return res.status(404).json({
        success: false,
        message: "No books issued yet"
     });
    return res.status(200).json({
        success: true,
        data: issuedBook,
    }); 
});



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