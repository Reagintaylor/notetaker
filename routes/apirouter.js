const apiRouter = require('express').Router();
const fs = require('fs');
const uuid = require('../helpers/uuid')

    //get
    apiRouter.get('/notes', (req, res) => {
        console.info(`${req.method} request received to get notes`);
        //reads the data
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        res.json(data);
    });


    //post 
    apiRouter.post('/notes', (req, res) => {
        console.info(`${req.method} request received to add note`);
        const newNote = req.body;
        //assigns a random id
        newNote.id = uuid()
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        // puts new note in fs
        data.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(data))
        res.json(data);

    });

    //delete
    apiRouter.delete("/notes/:id", (req, res) => {
        // Fetched id
        let noteId = req.params.id;
        // noteId.destroy();
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        const newData = data.filter(note => note.id !== noteId);
        fs.writeFileSync('./db/db.json', JSON.stringify(newData));
        console.log(` ${noteId} note deleted!`);
        res.json(newData);
    });


module.exports = apiRouter;