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
    const noteId = req.params.noteId;
    if(!noteId){
        return res.status(404).send({
            message: "Note id is required"
        });
    }
    Note.findById(noteId).then(note =>{
        if(!note){
            return res.status(404).send({
                message : "Note not found with id "+ noteId 
            })
        }
        res.send({note: note, message: "note fetched successfully"});
    }).catch(err =>{
        if(err.kind === "ObjecitId"){
            return res.status(404).send({
                message: "Note not found with id "+noteId
            });
        }
        return res.status(500).send({
            message : "Error retrieving note with id "+noteId
        })
    });
};

// update a note with an id
exports.update = (req, res) =>{
    const noteId = req.params.noteId;
    const content = req.body.content;
    if(!noteId){
        return res.status(404).send({
            message: "Invalid note id provided"
        });
    }
    if(!content){
        return res.status(404).send({
            message: "content cannot be empty"
        })
    }
    Note.findByIdAndUpdate(noteId, {
        title: req.body.title || "untitled note",
        content : content
    }, {new:true}).then(note =>{
        if(!note){
            return res.status(404).send({
                message: "note not found with an id "+ noteId
            })
        }
        res.send(note);
    });

};

exports.delete = (req, res) =>{
    const noteId = req.params.noteId;
    if(!noteId) return res.status(404).send({messgae: "Note id cannot be empty"});
    Note.findByIdAndRemove(noteId).then(note =>{
        if(!note){
            return res.status(404).send({message: "Note not found with id "+noteId});
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err =>{
        if(err.kind === "ObjectId" || err.name === "NotFound"){
            return res.status(404).send({
                message: "Note not found with an id "+noteId
            });
        }
        return res.send(500).send({
            message: "Could not delete note with id "+noteId
        });
    });
};
