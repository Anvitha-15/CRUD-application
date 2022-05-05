var Userdb = require('../model/model');

// create and save new user
exports.create = (req,res) =>{
    //Validate the data
    if(!req.body){
        res.status(400).send({ message: "Content not found"});
        return
    }

    // new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });

    user.save(user)
    .then(data => {
        // res.send(data)
        res.redirect('/add')
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some err occured!"
        })
    })
}





// Retrive and return all users/ single user
exports.find = (req,res) =>{

    if(req.query.id){

        const id = req.query.id;

        Userdb.findById(id)
        .then(data => {
           if(!data){
               res.status(404).send({
                   message : "Not found the user"
               })
           }else{
               res.send(data);
           }
        })
        .catch(err => {
            res.status(500).send({
                message : "Some err occured while finding the data"
            })
        })
    }
    else{
        Userdb.find()
        .then(user =>{
            res.send(user)
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Cannot able to find the user!"
            })
    })

    }
    
}





// Update new identified user by user id
exports.update = (req,res) =>{
    if(!req.body){
        res.status(400).send({
            message : "Data to update cannot be empty!"
        })
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body,{useFindAndModify:false})
    .then(data =>{
        if(!data){
            res.status(404).send({
                message : `Cannot find the user,${id}`
            })
        }else{
            res.send(data);
        }
    })
    .catch(err =>{
        res.status(500).send({
            message : err.message || "Some err occured while updating the data"
        })
    })
}






// Delete a user by specific id
exports.delete = (req,res) =>{

    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data =>{
        if(!data){
            res.status(404).send({
                message : `Cannot delete the User ${id}!`
            })
        }
        else{
            res.send({
                message: "User is deleted successfully!"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message : err.message || "Cannot able to delete"
        })
    })
}