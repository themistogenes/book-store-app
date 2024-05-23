import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
 
const app = express();

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  })

  app.get('/', (req, res) => {
    console.log(req);
    return res.status(200).send('Welcome');
  })