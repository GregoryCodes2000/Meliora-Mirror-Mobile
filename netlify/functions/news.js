exports.handler = async () => {
  try {
    const API_KEY = process.env.NEWS_API_KEY;

    if (!API_KEY) {
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          error: "Missing NEWS_API_KEY",
          articles: [],
        }),
      };
    }

    const response = await fetch(
      `https://newsapi.org/v2/everything?domains=businessinsider.com,techcrunch.com,theverge.com,arstechnica.com&pageSize=10&sortBy=publishedAt&language=en&apiKey=${API_KEY}`
    );

    const data = await response.json();

    console.log("NEWS API RAW RESPONSE:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          error: data.message || "Failed to fetch news",
          articles: [],
        }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        articles: data.articles || [],
      }),
    };
  } catch (err) {
    console.error("NEWS FUNCTION ERROR:", err);

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: err.message,
        articles: [],
      }),
    };
  }
};