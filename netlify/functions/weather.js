exports.handler = async () => {
    try {
      const API_KEY = process.env.WEATHER_API_KEY;
  
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=${API_KEY}&units=metric`
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
        body: JSON.stringify({ error: err.message }),
      };
    }
  };