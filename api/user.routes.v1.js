//
// ./api/v1/user.routes.v1.js
//
var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var User = require('../model/user.model');

//
// Geef een lijst van alle users.
//
routes.get('/users', function(req, res) {
    res.contentType('application/json');
    User.find({})
        .then((users) => {
            // console.log(users);
            res.status(200).json(users);
        })
        .catch(() => {
            res.status(404).json({'error' : 'bad request'});
        })
});

//
// Retourneer één specifieke users. Hier maken we gebruik van URL parameters.
// Vorm van de URL: http://hostname:3000/api/v1/users/23
//
routes.get('/users/:id', function(req, res) {
    res.contentType('application/json');
    let userId = req.params.id;
    User.findOne({name: userId})
        .then((user) => {
            res.status(200).json(user);
        })
        .catch(() => {
            res.status(404).json({'error' : 'bad request'});
        })

});

//
// Voeg een user toe. De nieuwe info wordt gestuurd via de body van de request message.
// Vorm van de URL: POST http://hostname:3000/api/v1/users
//
routes.post('/users', function(req, res) {
    res.contentType('application/json');
    let user = new User(req.body);
    user.save()
        .then(() => {
            res.status(200).json(user);
        })
        .catch(() => {
            res.status(404).json({'error' : 'bad request'});
        })
});

//
// Wijzig een bestaande user. De nieuwe info wordt gestuurd via de body van de request message.
// Er zijn twee manieren om de id van de users mee te geven: via de request parameters (doen we hier)
// of als property in de request body.
// 
// Vorm van de URL: PUT http://hostname:3000/api/v1/users/23
//
routes.put('/users/:id', function(req, res) {
    res.contentType('application/json');
    let user = new User(req.body);
    // User.findByIdAndUpdate({_id: user._id}, {name: user.name})
    User.findByIdAndUpdate({_id: user._id}, {name: user.name})
        .then((user) => {
            res.status(200).json(user);
            res.redirect('../');
        })
        .catch(() => {
            res.status(404).json({'error' : 'bad request'})
        })
});

//
// Verwijder een bestaande user.
// Er zijn twee manieren om de id van de users mee te geven: via de request parameters (doen we hier)
// of als property in de request body.
// 
// Vorm van de URL: DELETE http://hostname:3000/api/v1/users/23
//
routes.delete('/users/:id', function(req, res) {
    res.contentType('application/json');
    let userId = req.params.id;
    User.findOneAndRemove({name: userId})
        .then(() => {
            res.status(200).json({'id': userId});
        })

        .catch(() => {
            res.status(404).json({'error' : 'bad request'})
        })
});

module.exports = routes;