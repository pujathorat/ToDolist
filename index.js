// Import required modules
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import {dirname} from "path";
import {fileURLToPath} from "url";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static("public"));

// Set up mongoose connection
mongoose.connect('mongodb://localhost:27017/ListDB');

const db = mongoose.connection;

// Define schemas for fruits, vegetables, and cereals
const fruitSchema = new mongoose.Schema({
  name: String
});
const vegetableSchema = new mongoose.Schema({
  name: String
});
const cerealSchema = new mongoose.Schema({
  name: String
});
const teddySchema = new mongoose.Schema({
  name: String
});
const beautySchema = new mongoose.Schema({
  name: String
});
const kurtiSchema = new mongoose.Schema({
  name: String
});

// Create models for fruits, vegetables, and cereals
const Fruit = mongoose.model('Fruit', fruitSchema);
const Vegetable = mongoose.model('Vegetable', vegetableSchema);
const Cereal = mongoose.model('Cereal', cerealSchema);
const Teddy = mongoose.model('Teddy', teddySchema);
const Beauty = mongoose.model('Beauty', beautySchema);
const Kurti = mongoose.model('Kurti', kurtiSchema);
// Routes
app.get('/', async (req, res) => {
  try {
    // Create 5 fruits
    const fruits = await Fruit.create([
      { name: 'Apple' },
      { name: 'Banana' },
      { name: 'Orange' },
      { name: 'Grapes' },
      { name: 'Strawberry' },
    ]);

    // Create 5 vegetables
    const vegetables = await Vegetable.create([
      { name: 'Carrot' },
      { name: 'Broccoli' },
      { name: 'Spinach' },
      { name: 'Tomato' },
      { name: 'Cucumber' },
    ]);

    // Create 5 cereals
    const cereals = await Cereal.create([
      { name: 'Wheat' },
      { name: 'Rice' },
      { name: 'Oats' },
      { name: 'Corn' },
      { name: 'Barley' },
    ]);
   
    // Create 5 teddys
    const teddys = await Teddy.create([
      { name: 'Rabbit' },
      { name: 'Dog' },
      { name: 'Cat' },
      { name: 'Turtle' },
      { name: 'Panda' },
    ]);
    // Create 5 cereals
    const beauty = await Beauty.create([
      { name: 'Lipstick' },
      { name: 'Compact' },
      { name: 'Lotion' },
      { name: 'Hairband' },
      { name: 'Eyeliner' },
    ]);
    const kurties = await Kurti.create([
      { name: 'Red' },
      { name: 'Pink' },
      { name: 'Blue' },
      { name: 'Black' },
      { name: 'White' },
    ]);
    res.render('index.ejs', { fruits, vegetables, cereals, teddys, beauty, kurties });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});
  app.post('/', function (req, res) {
    const id = req.body.item
    const Item = mongoose.model('Item', ItemSchema);
    Item.findByIdAndDelete(id).exec()
    res.render('index.ejs', { item: {fruits, vegetables, cereals, teddys, beauty, kurties} });
  });
  app.get("/new-page", async (req, res) => {
    try {
      const selectItem = req.query.item; 
      // Fetch items from the database
      const fruits = await Fruit.find();
      const vegetables = await Vegetable.find();
      const cereals = await Cereal.find();
      const teddys = await Teddy.find();
      const beauty = await Beauty.find();
      const kurties = await Kurti.find();
  
      // Render the new page with the items
      res.render("new-page.ejs",{item:{fruits, vegetables, cereals, teddys, beauty, kurties }});
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
  // app.get("/new-page", async (req, res) => {
  //   try {
  //     const selectItem = req.query.item; // Assuming the selection is passed as a query parameter named "item"
  //     let selectItem;
      
  //     // Fetch items from the database based on the selection
  //     switch (selectItem) {
  //       case 'fruits':
  //       item = await Fruit.find();
  //         break;
  //       case 'vegetables':
  //         item = await Vegetable.find();
  //         break;
  //       case 'cereals':
  //         item = await Cereal.find();
  //         break;
  //       case 'teddys':
  //         item = await Teddy.find();
  //         break;
  //       case 'beauty':
  //         item = await Beauty.find();
  //         break;
  //       case 'kurties':
  //         item = await Kurti.find();
  //         break;
  //       default:
  //         // Handle invalid selection
  //         return res.status(400).send('Invalid selection');
  //     }
  
  //     // Render the new page with the selected items
  //     res.render("new-page.ejs",{item:{fruits, vegetables, cereals, teddys, beauty, kurties }});
  //   }  catch (err) {
  //     console.error(err);
  //     res.status(500).send('Internal Server Error');
  //   }
  // });
// Route to handle "Back to Home" button click
app.get("/backhome", (req, res) => {
  res.redirect("/");
});
app.get("/submit", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});
app.post("/submit", (req, res) => {
  console.log(req.body.username)
  const username = req.body.username;
  res.render(__dirname + "/views/submit.ejs", {
      name: username
  })
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});