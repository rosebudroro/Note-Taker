const router = require('express').Router();
// var uniqid = require('uniqid');
const fs = require('fs')


router.get('/api/notes', async (req, res) => {
    const dbJSON = await JSON.parse(fs.readFileSync("db/db.json","utf8"));
    res.json(dbJSON);
  });
  
  // Defines the post request to this routes end point '/api/notes'
router.post('/api/notes', (req, res) => {
    const dbJSON = JSON.parse(fs.readFileSync("db/db.json","utf8"));
    const newNote = {
      title: req.body.title,
      text: req.body.text
    };
    dbJSON.push(newNote);
    fs.writeFileSync("db/db.json",JSON.stringify(dbJSON));
    res.json(dbJSON);
  });

  module.exports = router;