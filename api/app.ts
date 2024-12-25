import express from "express";
const app = express();

app.get("/health-check", (req, res) => {
  res.json({
    code: 200,
    message: "Server running!",
  });
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
