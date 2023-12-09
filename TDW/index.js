const express = require('express');
const app = express();
const db = require("mongoose");
const controlador = require("./Controllers/produtoController");

app.use(express.json());

connectDB = async () => {
    try {
      await db.connect('mongodb://localhost:27017/restaurante', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Ligação MongoDB feita com sucesso.');
    } catch (error) {
      console.error('Ligação MongoDB não estabelecida:', error);
      process.exit(1);
    }
  };

  /*
  const connectDB = () => {
    return mongoose.connect('mongodb://localhost:27017/restaurante', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

connectDB()
    .then(() => {
        console.log('MongoDB connection successful.');
        controlador(app, mongoose);
        app.listen(3000, function(){
            console.log(`Servidor arrancado!`)
        });
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    });
  */

connectDB();
controlador(app);


app.listen(3000, function(){
    console.log(`Servidor arrancado!`)
})
