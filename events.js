const EventEmitter = require("events");
const http = require("http");
const fs = require("fs");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

//  Sync nature
myEmitter.on("newSale", () => {
  console.log("new sale");
});

myEmitter.on("newSale", () => {
  console.log("Costumer name: Jonas");
});

myEmitter.on("newSale", (stock) => {
  console.log("items left: ", stock);
});

myEmitter.emit("newSale", 9);

/////////////////////////////////////////////
const server = http.createServer();

// server.on("request", (req, res) => {
//   console.log("Request received");
//   res.end("Request received");
// });

server.on("request", (req, res) => {
  //   console.log("Request received");
  //   console.log("Another Request received");

  const readable = fs.createReadStream("test-file.txt");

  //   Solution 1
  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });

  //   readable.on("end", () => {
  //     res.end();
  //   });

  // Solution 2
  //   readableSource.pipe(writeableDest)
  readable.pipe(res);
});

server.on("close", (req, res) => {
  console.log("Server closed");
  res.end("Server closed");
});

// start
server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests");
});
