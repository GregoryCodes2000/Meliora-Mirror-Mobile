exports.handler = async () => {
    try {
      const API_KEY = process.env.NEWS_API_KEY;
  
      const response = await fetch(
        `https://newsapi.org/v2/everything?domains=businessinsider.com,techcrunch.com,theverge.com,arstechnica.com&pageSize=10&apiKey=${API_KEY}`
      );
  
      const data = await response.json();
  
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
    } catch (err) {
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          error: err.message,
        }),
      };
    }
  };