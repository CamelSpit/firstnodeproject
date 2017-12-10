const express = require('express');
const bodyParser = require('body-parser');
const app = new express();
const port = 3008;
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
const Controller = require("./controller/controller.js");


app.get("/api/pending", Controller.getPending);
app.put("/api/champions/:name/:id", Controller.putChampion);
app.get("/api/champions", Controller.getChamps);
app.post("/api/champion/:name", Controller.postChamp);
app.delete('/api/champion/:id', Controller.deleteChamp);

app.listen(port, ()=> console.log(`Big Brother is listening on port ${port}.`))