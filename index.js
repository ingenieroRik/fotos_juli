const express = require ("express");
const app = express();
const path = require('path');
const fs = require("fs");


app.use(express.json());



const fotosFilePath = path.join(__dirname, "data/db_fotos.json");
const db_fotos = JSON.parse(fs.readFileSync(fotosFilePath, "utf-8"));

app.get("/", (req,res) => {
    res.send("db_fotos api");
});

app.get("/api_fotos/db_fotos", (req,res) => {
    res.send(db_fotos);
});

app.get("/api_fotos/db_fotos/:id", (req,res) => {
    const foto = db_fotos.find(c => c.id === parseInt(req.params.id));
    if (!foto) return res.status(404).send("Foto no encontrada");
    else res.send(foto);
});

// ponemos a escuchar el servidor
app.listen(process.env.PORT || 3042, () =>  // si subimos a un hosting este nos dará el puerto, sinó sera 3041
console.log('Servidor corriendo en http://localhost:3042')
);
