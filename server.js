var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
// app.get('/', function (req, res) {
//   res.send('<b>My</b> first express http server');
// });

// app.get('/welcome', function (req, res) {
//   res.send('<b>Hello</b> welcome to my http server made with express');
//   res.status(200);
// });

allPets = [];
petTypes = ['Dog', 'Cat', 'Parrot', 'Hamster', 'Spider', 'Rabbit', 'Fish'];
id = 0;

app.get('/pets', function (req, res) {
  res.send(allPets);
  res.status(200);
});

app.post('/pets', function (req, res) {
  const { count, price, pet_type } = req.body;

  if (!count || count <= 0) {
    res.send(400, { error: 'Please fill count correctly' });
  }

  if (!price || price < 0) {
    res.send(400, { error: 'Please fill price correctly' });
  }

  if (!pet_type || !petTypes.includes(pet_type)) {
    res.send(400, { error: 'Please fill pet type correctly' });
  }

  var found = false;
  for (let i = 0; i < allPets.length; i++) {
    if (allPets[i].pet_type == pet_type) {
      allPets[i].count += count;
      found = true;
    }
  }

  if (!found) {
    req.body.id = id += 1;
    allPets.push(req.body);
  }

  res.send(allPets);
  res.status(201);
  return;
});

app.delete('/pets/:id', function (req, res) {
  var id = req.params.id;

  for (let i = 0; i < allPets.length; i++) {
    if (allPets[i].id == id) {
      allPets.splice(i, 1);
      res.send({ result: `${id} deleted` });
    }
  }
  if (!allPets.includes(id)) {
    res.send({ result: `${id} not found` });
    return;
  }
});

app.get('/pets/:id', function (req, res) {
  var id = req.params.id;

  for (let i = 0; i < allPets.length; i++) {
    if (allPets[i].id == id) {
      res.send({ result: allPets[i] });
      return;
    }
  }

  res.send({ result: `${id} not found` });
  return;
});

app.put('/pets/:id', function (req, res) {
  var id = req.params.id;
  const { count, price } = req.body;

  for (let i = 0; i < allPets.length; i++) {
    if (allPets[i].id == id && count > 0 && price > 0) {
      const newObj = allPets[i];
      newObj.count = count;
      newObj.price = price;

      res.send({ result: newObj });
      return;
    }
  }

  res.send({ result: `${id} not found` });
  return;
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

port = 3000;
app.listen(port, function () {
  console.log(`Pet Shop listening on port http://127.0.0.1:${port}`);
  //   console.log(`Example app listening on port http://localhost:${port}`);
  //   console.log(`Example app listening on port http://0.0.0.0:${port}`);
});
