const e = require("express");
const express = require("express");
const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  port: 6379
});

client.connect();

const app = express();

// cpu
const fibonacci = (n) => {
  if (n < 2) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

app.get("/fib/:num", async (req, res) => {
  const num = parseInt(req.params.num);
  let result_cache;
  let start = Date.now();
  result_cache =  await client.get(`fib-${num}`);
  let end = Date.now();
  console.log(`redis time: ${end - start}`);
  if(result_cache == null){
    start = Date.now();
    result_cache = fibonacci(num);
    end = Date.now();
    console.log(`calc time: ${end - start}`);
    const cacheKey = `fib-${num}`;
    client.set(cacheKey, result_cache);
  }
  res.json({  calc_time: end - start });
  
});


app.listen(3000, () => {
  console.log("Listening on port 3000");
});