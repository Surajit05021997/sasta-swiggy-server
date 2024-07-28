const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
require('dotenv').config();

const whitelist = ['http://localhost:5173', 'https://sastaswiggy.netlify.app'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Sasta swiggy server running");
});

app.post('/order', async (req, res) => {
  try {
    const instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })

    const order = await instance.orders.create({
      amount: req.body.amount,
      amount: 50000,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        key1: "value3",
        key2: "value2"
      }
    })
    res.status(200).send(order);
  } catch(error) {
    res.status(500).send(error);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`);
});
