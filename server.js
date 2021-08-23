const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});


mongoose.connect("mongodb://localhost/react-shopping-cart-db", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const Product = mongoose.model("products", new mongoose.Schema(
    {
        _id : {
            type: String, default: shortid.generate
        },
        title: {
            type: String
        },
        desciption: {
            type: String
        },
        image: {
            type: String
        },
        price: {
            type: Number
        },
        availableSizes: {
            type: [String]
        }
    }
));

app.get("/api/products", async (req, res) => {

    const products = await Product.find({});
    res.send(products);
});

app.post("/api/products", async (req, res) => {

    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();

    res.send(savedProduct);
});

app.delete("/api/products/:id", async (req, res) => {
    
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
});


app.listen(5000, () => {
    console.log('serve at http://localhost:5000');
});



