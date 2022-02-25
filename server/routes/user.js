const express = require('express')
const router = express.Router();

const User = require('../models/users')
// router.get('/', User.getUsers)
// router.post('/', User.addUsers)

router.post('/', (req,res) => {
    console.log(req.body);
    const user = User({
        name: req.body.name,
        id: req.body.id
    })
    res.send(req.body)
    user.save((err, addUsers) => {
        if(err){
            console.error(err)
            res.send({
                "status": "fail",
                "message": err.message
            })
        }else{
            res.send({"status":"OK"})
            
        }
    })
})

module.exports = router;