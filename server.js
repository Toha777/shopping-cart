const express =require("express");
const bodyParser =require("body-parser");
const mongoose =require("mongoose");
const shotid =require("shortid");

const app = express();
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost/shopping-cart-db", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const Product = mongoose.model(
    "products",
    new mongoose.Schema({
        _id: { type: String, default: shotid.generate },
        title: String,
        description: String,
        image: String,
        price: Number,
        availableSizes: [String]
    })
)

app.get("/api/products", async (req,res) => {
    const products =await Product.find({});
    res.send(products);
});

app.post("/api/products", async (req,res) => {
    const newProduct = new Product(req.body);
    const sevedProduct =await newProduct.save();
    res.send(sevedProduct);
});

app.delete("/api/products/:id", async (req,res) => {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deleteProduct);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"));
