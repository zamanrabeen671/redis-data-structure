const express = require("express");
const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  port: 6379
});

client.connect();
const app = express();

// SET: Sets a string value for a given key
app.get('/set', async (req, res) => {
  try {
    const reply = await client.set('key_three', 'lorum ipsum');
    res.send(`String value set: ${reply}`);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error setting string value');
  }
});
// GET: Retrieves all Redis key values
app.get('/getall', async (req, res) => {
  try {
    const keys = await client.keys('*');
    const values = await Promise.all(keys.map(key => client.get(key)));
    const keyValuePairs = keys.map((key, index) => ({ key, value: values[index] }));
    res.send(keyValuePairs);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving Redis key values');
  }
});

// INCR: Increments the integer value of a string by 1
app.get('/incr', async (req, res) => {
  try {
    const reply = await client.incr('count');
    res.send(`Counter value: ${reply}`);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error incrementing counter');
  }
});


// INCR: Increments the integer value of a string by 1
app.get('/decr', async (req, res) => {
  try {
    const reply = await client.decr('count');
    res.send(`Counter value: ${reply}`);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error incrementing counter');
  }
});

// INCRBY: Increments the integer value of a string by a specified amount
app.get('/incrby', async (req, res) => {
  try {
    const reply = await client.incrBy('count', 5);
    res.send(`Counter value: ${reply}`);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error incrementing counter');
  }
});

// DECRBY: Decrements the integer value of a string by a specified amount
app.get('/decrby', async (req, res) => {
  try {
    const reply = await client.decrBy('count', 5);
    res.send(`Counter value: ${reply}`);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error decrementing counter');
  }
});

// APPEND: Appends a string value to the end of an existing string
app.get('/append', async (req, res) => {
  try {
    const reply = await client.append('username_hira', 'World!');
    res.send(`String value: ${reply}`);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error appending string');
  }
});

app.get('/get_string', async (req, res) => {
  try {
    const reply = await client.get('username_hira', ' World!');
    res.send(`String value: ${reply}`);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error appending string');
  }
});


app.listen(3000, () => {
  console.log("Listening on port 3000");
});