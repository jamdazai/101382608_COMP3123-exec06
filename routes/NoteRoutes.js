/**
 *  Lab Exercise 6 in Full Stack Development
 * @author: Jam Furaque
 */

const express = require('express');
const router = express.Router();
const noteModel = require('../models/NotesModel.js');

//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
router.post('/notes', (req, res) => {
    if (!req.body.noteTitle || !req.body.noteDescription) {
        return res.status(400).send({
            message: "Title / Description cannot be empty!"
        });
    }
    noteModel.findOne({
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription
    }).then(existingNote => {
        if (existingNote) {
            return res.status(400).send({
                message: "Note with the same title and description already exist in the database."
            });
        }
        const note = new noteModel({
            noteTitle: req.body.noteTitle,
            noteDescription: req.body.noteDescription,
            priority: req.body.priority || 'LOW'
        });
        note.save()
            .then(data => {
                res.status(201).send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});



//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
router.get('/notes', (req, res) => {
    noteModel.find()
        .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});


//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
router.get('/notes/:noteId', (req, res) => {
    noteModel.findById(req.params.noteId)
        .then(note => {
        if (!note) {
            return res.status(404).send({
                message: "Error fetching note with id: " + req.params.noteId
            });
        }res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Error fetching note with id: " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error fetching note with id: " + req.params.noteId
        });
    });
})


//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
router.put('/notes/:noteId', (req, res) => {
    if (!req.body.noteTitle) {
        return res.status(400).send({
            message: "Note title cannot be empty"
        });
    }
    noteModel.findByIdAndUpdate(req.params.noteId, {
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority || 'LOW',
        dateUpdated: Date.now()
    }, { new: true })
    .then(note => {
        if (!note) {
            return res.status(404).send({
                message: "Error fetching note with id: " + req.params.noteId
            });
        }
        res.send(note);
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
});


//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
router.delete('/notes/:noteId', (req, res) => {
    noteModel.findByIdAndDelete(req.params.noteId)
        .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }res.status(200).send({message: "Note deleted successfully!"});
    }).catch(err => {
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
});
module.exports = router;