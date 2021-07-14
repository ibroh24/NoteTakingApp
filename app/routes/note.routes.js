module.exports = (app) =>{
    const notes = require('../controllers/note.controller.js');

    // creating a new note
    app.post('/notes', notes.create);

    // retrieve all notes
    app.get('/notes', notes.findAll);

    // retrieve single note with noteID
    app.get('/notes/:nodeId', notes.findOne);

    // update a note with noteID
    app.put('/notes/:noteId', notes.update);

    // destroy a not with noteID
    app.delete('notes/:noteId', notes.delete);
}