/**
 *  Lab Exercise 6 in Full Stack Development
 * @author: Jam Furaque
 */


const mongoose = require('mongoose');
//TODO - Create Note Schema here having fields
//      - noteTitle
//      - noteDescription
//      - priority (Value can be HIGH, LOW or MEDIUM)
//      - dateAdded
//      - dateUpdated
const NoteSchema = new mongoose.Schema({
    noteTitle: {
        type: String,
        required: true
    },
    noteDescription: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true,
        default: "LOW",
        enum: ['HIGH', 'MEDIUM', 'LOW']
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date
    }
});
const Notes = mongoose.model('Notes', NoteSchema);
module.exports = Notes;