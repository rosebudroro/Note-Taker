const router = require('express').Router();
const fs = require('fs')
let dbJSON = require("../db/db.json")

router.get('/api/notes', async (req, res) => {
    dbJSON = await JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    res.json(dbJSON);
});

// Defines the post request to this routes end point '/api/notes'
router.post('/api/notes', (req, res) => {
    dbJSON = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    console.log("POST", req.body)
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: Math.floor(Math.random() * 999)
    };
    dbJSON.push(newNote);
    fs.writeFileSync("db/db.json", JSON.stringify(dbJSON));
    res.json(dbJSON);
});

router.delete('/api/notes/:id', (req, res) => {
    let data = fs.readFileSync("db/db.json", "utf8");
    const dataJSON = JSON.parse(data);
    const newNotes = dataJSON.filter((note) => {
        return note.id !== req.params.id;
    });
    fs.writeFileSync("db/db.json", JSON.stringify(newNotes));
    res.json("Note deleted.");
});


module.exports = router;