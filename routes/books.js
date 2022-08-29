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


module.exports = router;