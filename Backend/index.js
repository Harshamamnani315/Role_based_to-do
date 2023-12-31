const express = require('express');
var cors = require('cors');
const connectToMongo = require('./db');
const dotenv = require('dotenv');
dotenv.config();
connectToMongo();
const app = express()
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
  res.status(300).send("Harsha's Main Backend is running properly");
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/todos', require('./routes/todos'));


app.listen(port, () => {
  console.log(`Main Backend listening on port ${port}`)
})