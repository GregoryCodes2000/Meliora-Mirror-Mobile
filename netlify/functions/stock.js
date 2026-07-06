exports.handler = async (event) => {
  try {
    const symbol = event.queryStringParameters?.symbol || "AAPL";
    const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;

    const [quoteRes, chartRes] = await Promise.all([
      fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
      ),
      fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1mo`
      ),
    ]);

    const quote = await quoteRes.json();
    const yahoo = await chartRes.json();

    let candles = [];

    if (
      yahoo.chart &&
      yahoo.chart.result &&
      yahoo.chart.result.length > 0
    ) {
      const result = yahoo.chart.result[0];

      const timestamps = result.timestamp || [];
      const quoteData = result.indicators.quote[0];

      candles = timestamps.map((t, i) => ({
        time: t,
        open: quoteData.open[i],
        high: quoteData.high[i],
        low: quoteData.low[i],
        close: quoteData.close[i],
      }))
      .filter(
        c =>
          c.open != null &&
          c.high != null &&
          c.low != null &&
          c.close != null
      )
      .slice(-10); // only last 5 daily candles
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quote,
        candles,
      }),
    };
  } catch (err) {
    console.error(err);

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
};