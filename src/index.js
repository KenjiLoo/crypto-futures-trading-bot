const express = require("express");
const strategyService = require("./services/technical");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/trade", async (req, res) => {
  try {
    const result = await strategyService.analyzeMarket();
    res.json({ message: "Trade executed", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));