const express = require('express');
const router = express.Router();
const noteController = require('../controller/noteController');
router
  .route('/')
  .get(noteController.getAllNotes)
  .patch(noteController.updateNote)
  .post(noteController.addNote)
  .delete(noteController.deleteNote);

module.exports = router;
