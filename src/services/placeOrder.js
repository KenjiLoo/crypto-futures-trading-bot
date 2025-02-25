const axios = require("axios");
const { API_KEY, SECRET_KEY } = require("../config/bingx");

const API_URL = "https://api.bingx.com"; // Adjust for real market endpoints

class BingXService {
  async fetchMarketData(symbol) {
    const response = await axios.get(`${API_URL}/v1/market/kline`, {
      params: { symbol, interval: "4h", limit: 100 },
    });
    return response.data;
  }

  async placeOrder(symbol, side, quantity, stopLoss, takeProfit) {
    const orderData = {
      symbol,
      side,
      quantity,
      leverage: 5,
      stopLoss,
      takeProfit,
    };

    return await axios.post(`${API_URL}/v1/order/place`, orderData, {
      headers: { "X-BINGX-APIKEY": API_KEY },
    });
  }
}

module.exports = new BingXService();