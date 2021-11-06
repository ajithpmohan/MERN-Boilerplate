const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// build-in middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Node Express World');
});

app.use(notFound);
app.use(errorHandlerMiddleware);

app.enable('trust proxy');

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
