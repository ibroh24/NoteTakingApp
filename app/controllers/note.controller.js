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

    // then save note into db
    note.save().then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "some error occurred"
        });
    });
};

// get all notes
exports.findAll = (req, res) =>{
    Note.find().then(notes =>{
        res.send(notes);
    }).catch(err =>{
            res.status(500).send({message: err.message || "error occured"
        });
    });
};

// retrieve single note
exports.findOne = (req, res) =>{
    Note.findById(req.params.noteId).then(note =>{
        if(!note){
            return res.status(404).send({
                message : "Note not found with id "+ req.params.noteId 
            })
        }
        res.send(note);
    }).catch(err =>{
        if(err.kind === "ObjecitId"){
            return res.status(404).send({
                message: "Note not found with id "+req.params.noteId
            });
        }
        return res.status(500).send({
            message : "Error retrieving note with id "+req.params.noteId
        })
    });
};

exports.update = (req, res) =>{

};

exports.delete = (req, res) =>{

};
