const Note = require('../models/NoteModel');
const User = require('../models/UserModel');

const asyncHandler = require('express-async-handler');

const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().lean();
  if (notes?.length > 0) {
    //according to the user story, we need to add username to notes and then return to client
    const notesWithUser = await Promise.all(
      notes.map(async (note) => {
        // const user = await User.findOne(note.user).lean().exec();
        const user = await User.findById(note.user).lean().exec();
        console.log(user);
        return { ...note, username: user.username };
      })
    );
    return res.json(notesWithUser);
  } else {
    return res.status(400).json({ message: 'there is no any note.' });
  }
});

const addNote = asyncHandler(async (req, res) => {
  const { user, title, text } = req.body;
  // console.log(1232321321, user, title, text);
  if (!user || !title || !text) {
    return res.status(400).json({ message: 'every field is needed.' });
  }
  //check for the title
  const duplicateTitle = await Note.findOne({ title }).lean().exec();
  // console.log(duplicateTitle);
  if (duplicateTitle) {
    return res.status(409).json({ message: 'The title is duplicate.' });
  }

  const newNote = await Note.create({ user, title, text });
  if (newNote) {
    return res.status(201).json(newNote);
  } else {
    return res.status(400).json({ message: 'Invalid data received.' });
  }
});

const deleteNote = asyncHandler(async (req, res) => {});

const updateNote = asyncHandler(async (req, res) => {
  const { id, user, title, text, completed } = req.body;
  if (!id || !user || !title || !text || typeof completed !== 'boolean') {
    return res.status(400).json({ message: 'every field is required' });
  }
  const note = await Note.findById(id).exec();
  if (!note) {
    return res.status(400).json({ message: 'note not found' });
  }
  //check title
  const duplicateTitle = await Note.findOne({ title }).lean().exec();
  if (duplicateTitle && duplicateTitle?._id.toString() !== id) {
    return res.status(409).json({ message: 'title name has occupied.' });
  }
  note.user = user;
  note.title = title;
  note.text = text;
  note.completed = completed;
  const updatedNote = await note.save();
  return res.status(301).json(`${updatedNote.title} has been updated`);
});
const getNoteById = asyncHandler(async (req, res) => {});

module.exports = { getAllNotes, addNote, deleteNote, updateNote, getNoteById };
