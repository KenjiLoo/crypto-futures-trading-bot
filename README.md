# crypto futures trading bot
This is a trading bot based on the MACD + 100 EMA indicator, which executes conservative trades when the market is on a trend. 

This bot mainly trades 5 of the highest volume pairs - BTC, ETH, SOL, XRP, BNB /USDT as the risk these pairs are generally considered stable. The exchange this bot will execute trades on is BingX.

# env file
```
BINGX_API_KEY=your_api_key
BINGX_SECRET_KEY=your_secret_key
LEVERAGE=5
RISK_REWARD_RATIO=1.5
```

# run server
```nodemon src/index```