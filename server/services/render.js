const axios = require('axios');

exports.home = (req,res) =>{

    // using axios getting the data from the API mentioned in then func, and accessing the data alone by response.data
    axios.get('http://localhost:3000/api/users')
    .then(function(response){
        console.log(response);
        res.render('index',{users : response.data});

    })
    .catch(err =>{
        res.send(err);
    })
}

exports.add = (req,res) =>{
    res.render('addUser');
}

exports.update = (req,res) =>{
    // specific user from db
    // when the particular user is been clicked to update btn means that user id is been passed to API route to access that particular data from show.ejs
    // using axios getting the data from the API mentioned in then func, and accessing the data alone by userData.data and passing that data to respective file and render the data thier
    axios.get('http://localhost:3000/api/users', {params: {id:req.query.id}})    
    .then(function(userData){
        res.render('updateUser',{user:userData.data})
    }).catch(err =>{
        res.send(err);
    } )
    
}