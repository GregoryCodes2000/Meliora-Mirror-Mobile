exports.handler = async () => {
    try {
      const response = await fetch(
        "https://alerts.ttc.ca/api/alerts/site-wide"
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