const express = require("express");
const path = require("path");
const cors = require("cors"); // Import cors for backend
const app = express();
const port = 3001;

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from React app running on localhost:3000
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // If you are using cookies or authentication headers
};

app.use(cors(corsOptions)); // Enable CORS with the options

// Simulate a 404 error
app.get("/non-existent-route", (req, res) => {
  res.status(404).send({
    error: "Resource not found.",
  });
});
// Simulate a slow API response that delays for 5 minutes
app.get("/very-slow-response", (req, res) => {
  setTimeout(() => {
    res.send("This response was delayed for 5 minutes.");
  }, 10000); // 300,000 ms = 5 minutes
});

// Simulate a slow API that delays for 30 seconds before responding
app.get("/slow-api-onload", (req, res) => {
  setTimeout(() => {
    res.send("This response was delayed for 30 seconds.");
  }, 30000); // 30-second delay
});

app.get("/slow-response", (req, res) => {
  setTimeout(() => {
    res.send("This response was delayed for 10 seconds.");
  }, 10000); // Delay of 10 seconds
});
// Serve the PDF with the wrong content type
app.get("/incorrect-mime", (req, res) => {
  const filePath = path.join(__dirname, "files", "sample.pdf");
  res.setHeader("Content-Type", "text/html"); // Incorrect MIME type
  res.download(filePath, "sample.pdf", (err) => {
    if (err) {
      res.status(500).send({
        error: "Error occurred while downloading the file.",
      });
    }
  });
});

// Simulate a 500 Internal Server Error
app.get("/error-route", (req, res) => {
  res.status(500).send({
    error: "Internal Server Error occurred.",
  });
});
// Simulate a request that never responds
app.get("/no-response", (req, res) => {
  // Do not send any response, making the request hang indefinitely
});

// API to return the PDF file
app.get("/download-pdf", (req, res) => {
  const filePath = path.join(__dirname, "files", "sample.pdf");
  res.download(filePath, "sample.pdf", (err) => {
    if (err) {
      res.status(500).send({
        error: "Error occurred while downloading the file.",
      });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
