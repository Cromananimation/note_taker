const express = require('express');
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');
const uuid = require('./helpers/uuid');
const path = require("path");

const router = express.Router();

// GET Route for retrieving all the notes
router.route('/')
  .get((req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"))
  })

router.route("/notes")
  .all((req, res, next) => {
    
    next()
  })
  .get((req, res) => {
    res.sendFile(path.join(__dirname + '/public/notes.html'))
  })

// ('/', (req, res) => {
//     readFromFile('./db/tips.json', 'utf8').then((data) => res.json(JSON.parse(data)));
// });

// getting the route for a specific note
// router.get('/:id', (req.res), () => {
//     const noteId= req.params.note_id;
//     readFromFile('./db/db.json')
//     .then((data) => JSON.parse(data))
//     .then((json) => {
//         const result =json.filter((note) => nopte.id === noteId);
//         return result.length > 0
//         ? res.json(result)
//         :res.json('No notes with that ID');
//     });
// })
// router.get('/notes', (req.res), () => {
//   const noteId= req.params.note_id;
//   readFromFile('./db/db.json')
//   .then((data) => JSON.parse(data))
//   .then((json) => {
//       const result =json.filter((note) => nopte.id === noteId);
//       return result.length > 0
//       ? res.json(result)
//       :res.json('No notes with that ID');
//   });
// })

// // POST Route for a new note
// router.post('/', (req, res) => {
//   console.info(`${req.method} request received to add a note`);
//   console.log(req.body);

//   const { title, text, } = req.body;

//   if (req.body) {
//     const newNote = {
//       title,
//       text_id: uuid(),
//     };

//     readAndAppend(path, './db/db.json');
//     res.json(`Note added successfully 🚀`);
//   } else {
//     res.error('Error in adding Note');
//   }
// });

module.exports = router;
