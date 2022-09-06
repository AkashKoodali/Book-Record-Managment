const express = require("express");

const { 
  getAllUsers, 
  getSingleUserById, 
  createNewUser, 
  updateUserById, 
  deleteUser, 
  getSubscriptionDetailsById 
} = require("../controllers/user-controller");

const router = express.Router();


/**
 * Route: /users
 * Method: GET
 * Dscription: Get all users
 * Access: Public
 * Parameters: None 
 */
 router.get("/", getAllUsers);


/**
 * Route: /users/:id
 * Method: GET
 * Dscription: Get single user by id
 * Access: Public
 * Parameters: id
 */
router.get("/:id", getSingleUserById);


/**
 * Route: /users
 * Method: POST
 * Dscription: Create new user
 * Access: Public
 * Parameters: None
 */
router.post("/", createNewUser);


/**
 * Route: /users/:id
 * Method: PUT
 * Dscription: Updating user data
 * Access: Public
 * Parameters: id
 */
router.put("/:id", updateUserById);


/**
 * Route: /users/:id
 * Method: DELETE
 * Dscription: Delete a user by id
 * Access: Public
 * Parameters: id
 */
router.delete('/:id', deleteUser);


/**
 * Route: /users/subscription-details/{id}
 * Method: GET
 * Dscription: Get user subscription details
 * Access: Public
 * Parameters: id
 */
 router.get("/subscription-details/:id", getSubscriptionDetailsById);
  

module.exports = router;
