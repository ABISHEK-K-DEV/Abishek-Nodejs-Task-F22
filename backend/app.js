const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://gopi08427:bwB9yxVE15nqn8W3@cluster0.d8khtby.mongodb.net/product")
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));
  
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  comments: { type: [String], default: [] },
});

const Product = mongoose.model('Product', productSchema);
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/products/:id/like', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product.likes += 1;
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to like product' });
  }
});

app.post('/products/:id/dislike', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product.dislikes += 1;
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to dislike product' });
  }
});

app.post('/products/:id/comment', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const { comment } = req.body;
    product.comments.push(comment);
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

app.post('/checkout', async (req, res) => {
  try {
    res.json({ message: 'Order placed successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Checkout failed' });
  }
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
