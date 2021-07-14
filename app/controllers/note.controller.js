const Note = require('../models/note.model.js');

// create new note function
exports.create = (req, res) => {
    // validate request
    if(!req.body.content){
        return res.status(400).send({
            message: "note content cannot be empty"
        });
    }
    // create a note
    const note = new Note({
        title: req.body.title || "Untitled Note",
        content: req.body.content
    });

    // then save note into database
    note.save().then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "some error occurred"
        });
    });
};

exports.findAll = (req, res) =>{

};

exports.findOne = (req, res) =>{

};

exports.update = (req, res) =>{

};

exports.delete = (req, res) =>{

};