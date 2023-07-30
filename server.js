const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');

const app = express();
const port = 3000;


app.use(bodyParser.json());


app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});


app.post('/api/user', (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(18).max(100).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return next(error); 
  }


  const user = req.body;


  res.json({ message: 'User created successfully!', user });
});


app.use((err, req, res, next) => {
  if (err.isJoi) {

    return res.status(400).json({ error: err.details[0].message });
  }


  console.error(err);
  res.status(500).json({ error: 'Something went wrong.' });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
