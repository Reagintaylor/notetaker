const apiRouter = require('express').Router();
const fs = require('fs');
const uuid = require('../helpers/uuid')



    //get route
    apiRouter.get('/notes', (req, res) => {
        // Log that a GET request was received
        console.info(`${req.method} request received to get notes`);

        // Read notes
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        
        res.json(data);



    });


    //post route
    apiRouter.post('/notes', (req, res) => {
        // Log that a POST request was received
        console.info(`${req.method} request received to add a note`);

        // Destructuring assignment for the items in req.body
        const newNote = req.body;

        //assign an id
        newNote.id = uuid()

        // Read notes 
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        // Push new note to file
        data.push(newNote);


        fs.writeFileSync('./db/db.json', JSON.stringify(data))


        console.log("successful post!");
        res.json(data);

    });


    //delete
    apiRouter.delete("/notes/:id", (req, res) => {

        // Fetched id to delete
        let noteId = request.params.id.toString();

        console.log(`DELETE note request for noteId: ${noteId}`);

        // Read data from 'db.json' file
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        // grab all notes without that id
        const newData = data.filter(note => note.id.toString() !== noteId);

        // Overwrite file with new data
        fs.writeFileSync('./db/db.json', JSON.stringify(newData));

        console.log(`\nSuccessfully deleted note with id : ${noteId}`);

        // Send response
        res.json(newData);
    });


module.exports= apiRouter;