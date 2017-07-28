const express = require('express');
const bodyParser = require('body-parser');
const app = express();
let PORT = process.env.PORT || 9000;

app.use(bodyParser.urlencoded({extended: true}));

let db = require('./models');

let Users = db.Users;

console.log(Users.prototype);

app.post('/users', function (req, res) {
  Users.create({ username: req.body.username }) // .create method is given to us by sequelize
  .then(function (user) {
    res.json(user);
  });
});

app.get('/users', function(req, res) {
  Users.findAll()  // .findAll method is given to us by sequelize
    .then(function (users) {
      res.json(users);
    });
});

app.get('/', (req, res) => {
  res.send('hello, how are you?');
});

app.listen(PORT, () => {
  db.sequelize.sync();
  console.log(`server running on ${PORT}`);
});

