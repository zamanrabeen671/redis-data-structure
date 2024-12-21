const express = require("express");
const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  port: 6379
});

client.connect();
const app = express();

// SETEX: Sets a string value with a specified expiration time
app.get('/setex', async (req, res) => {
    try {
        // Using SET with the EX option instead of SETEX
        const reply = await client.set('user_one:1234', 'Hello, World!', {
            EX: 10 // Expires in 10 seconds
        });
        res.send(`String value set: ${reply}`);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error setting string value');
    }
});

// GETEX: Retrieves the string value associated with a given key
app.get('/getex', async (req, res) => {
  try {
    const reply = await client.get('user_one:1234');
    res.send(`String value set: ${reply}`);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error setting string value');
  }
});

app.get('/psetex', async (req, res) => {
    try {
      const reply = await client.set('mystring', 'Hello, World!', {
          PX: 10000 // Expires in 10 seconds
      });
      res.send(`String value set: ${reply}`);
    } catch (err) {
      console.log(err);
      res.status(500).send('Error setting string value');
    }
});

// Session Management with Expiration 
// Cache with Expiration
// One-Time Password (OTP) Storage
// Rate Limiting with Expiration

// This example allows one request per user per minute by setting a rate-limit key that expires after 60 seconds. 
// If the key exists, 
// it means the user has hit the rate limit and must wait until the key expires to make another request.
// Short-Lived Tokens (Password Reset, Email Verification)
// Temporary Cart Data in E-commerce

// PSETEX: Sets a string value with a specified expiration time in milliseconds


app.listen(3000, () => {
  console.log("Listening on port 3000");
});