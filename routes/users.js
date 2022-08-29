const express = require("express");
const {users} = require("../data/users.json");

const router = express.Router();


/**
 * Route: /users
 * Method: GET
 * Dscription: Get all users
 * Access: Public
 * Parameters: None 
 */
 router.get("/", (req,res)=>{
    res.status(200).json({
        success: true,
        data: users,
    })
});


/**
 * Route: /users/:id
 * Method: GET
 * Dscription: Get single user by id
 * Access: Public
 * Parameters: id
 */
router.get("/:id", (req,res)=>{
    const { id } = req.params;
    const user = users.find((each)=> each.id === id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
    return res.status(200).json({
        success: true,
        data: user,
    });
});


/**
 * Route: /users
 * Method: POST
 * Dscription: Create new user
 * Access: Public
 * Parameters: None
 */
router.post("/", (req,res)=>{
    const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;
    const user = users.find((each)=> each.id === id);
    if(user){
        return res.status(404).json({
            success: false,
            message: "User exists with this id",
        });
    }
    
    users.push({
        id,
        name,
        surname,
        subscriptionType,
        subscriptionDate,
    });
    res.status(201).json({
        success: true,
        data: users,
    })
});


/**
 * Route: /users/:id
 * Method: PUT
 * Dscription: Updating user data
 * Access: Public
 * Parameters: id
 */
router.put("/:id", (req,res)=>{
    const { id } = req.params;
    const { data } = req.body;
    const user = users.find((each)=> each.id === id);
    if(!user){
        return  res.status(404).json({success: false, message: "User not found"});
    }
    const updateUser = users.map((each)=>{
        if(each.id===id){
            return {
                ...each,
                ...data,
            }
        }
        return each;
    });
    return res.status(200).json({
        success: true,
        data: updateUser,
    });
});


/**
 * Route: /users/:id
 * Method: DELETE
 * Dscription: Delete a user by id
 * Access: Public
 * Parameters: id
 */
router.delete('/:id', (req,res)=>{
    const { id } = req.params;
    const user = users.find((each)=> each.id === id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User to be deleted was not found",
        });
    }
    const index = users.indexOf(user);
    users.splice(index, 1);
    return res.status(202).json({
        success: true,
        data: users,
    })
});

module.exports = router;
