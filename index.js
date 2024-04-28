const express = require ("express");
const app = express();
const path = require('path');
const fs = require("fs");
const cors = require ('cors'); // <--------- para que puedan ver los datos de nuestra api  hacer  --> npm i cors
//const fotosController = require("./controllers/fotosController");

app.use(express.json());

app.use(cors());

// indicamos a express usar la plantilla EJS que esta en carpeta views.
app.set('view engine', 'ejs');

//si la ruta por defecto no es /views debemos decirle a node que la carpeta se encuentra
// en otra ruta, para ello usamos:
app.set('views', './public/views');

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static('public'));

const fotosFilePath = path.join(__dirname, "data/db_fotos.json");
const db_fotos = JSON.parse(fs.readFileSync(fotosFilePath, "utf-8"));
/* En la constante "db_fotos" ya tenemos los fotos que están 
guardados en la carpeta data como Json (un array de objetos literales) */

app.get("/", (req,res) =>{

    res.render("index.ejs", { fotos : db_fotos }); 
});

app.get("/api/fotos", (req,res) => {
   
    res.send(db_fotos);
});

app.get("/api/fotos/:id", (req,res) => {
   
    const foto = db_fotos.find(c => c.id === parseInt(req.params.id));
    if (!foto) return res.status(404).send("Foto no encontrada");
    else res.send(foto);
});


app.get("/api/fotos/:id/img", (req, res) => {
    const foto = db_fotos.find(c => c.id === parseInt(req.params.id));
    if (!foto) return res.status(404).send("Foto no encontrada");
    else res.sendFile(path.join(__dirname, 'public', 'images', foto.img));
});

// ponemos a escuchar el servidor
app.listen(process.env.PORT || 3042, () =>  // si subimos a un hosting este nos dará el puerto, sinó sera 3041
console.log('Servidor corriendo en http://localhost:3042')
);
