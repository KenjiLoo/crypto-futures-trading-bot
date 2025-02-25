const { MACD, EMA } = require("technicalindicators");
const placeOrder = require("./placeOrder");
const { TRADING_PAIRS, RISK_REWARD_RATIO } = require("../config/bingx");

class StrategyService {
  async analyzeMarket() {
    for (const symbol of TRADING_PAIRS) {
      const marketData = await placeOrder.fetchMarketData(symbol);
      const closes = marketData.map((candle) => parseFloat(candle.close));

      const ema200 = EMA.calculate({ period: 200, values: closes });
      const macd = MACD.calculate({
        fastPeriod: 12,
        slowPeriod: 26,
        signalPeriod: 9,
        values: closes,
      });

      const latestMACD = macd[macd.length - 1];
      const latestPrice = closes[closes.length - 1];
      const latestEMA200 = ema200[ema200.length - 1];

      if (latestMACD && latestMACD.histogram > 0 && latestPrice > latestEMA200) {
        return this.executeTrade(symbol, "BUY", latestPrice, latestEMA200);
      }
      if (latestMACD && latestMACD.histogram < 0 && latestPrice < latestEMA200) {
        return this.executeTrade(symbol, "SELL", latestPrice, latestEMA200);
      }
    }
  }

  async executeTrade(symbol, side, entryPrice, ema200) {
    const stopLoss = side === "BUY" ? ema200 * 0.99 : ema200 * 1.01;
    const takeProfit =
      side === "BUY"
        ? entryPrice + (entryPrice - stopLoss) * RISK_REWARD_RATIO
        : entryPrice - (stopLoss - entryPrice) * RISK_REWARD_RATIO;

    return bingxService.placeOrder(symbol, side, 1, stopLoss, takeProfit);
  }
}

module.exports = new StrategyService();