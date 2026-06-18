exports.handler = async (event) => {
    try {
      const symbol = event.queryStringParameters?.symbol || "AAPL";
      const API_KEY = process.env.FINNHUB_API_KEY;
  
      const response = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
      );
  
      const data = await response.json();
  
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(data),
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: err.message }),
      };
    }
  };