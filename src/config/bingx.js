require("dotenv").config();

module.exports = {
  API_KEY: process.env.BINGX_API_KEY,
  SECRET_KEY: process.env.BINGX_SECRET_KEY,
  LEVERAGE: process.env.LEVERAGE || 5,
  RISK_REWARD_RATIO: process.env.RISK_REWARD_RATIO || 1.5,
  TRADING_PAIRS: ["BTCUSDT", "ETHUSDT", "SOLUSDT", "XRPUSDT", "BNBUSDT"],
};