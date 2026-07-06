exports.handler = async () => {
  try {
    const response = await fetch(
      "https://www.ttc.ca/ttcapi/routedetail/getallroutesandstopsalerts"
    );

    const data = await response.json();
    

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        alerts: (data.routeAlerts || []).filter(
          alert =>
            alert.routeType === "Subway" ||
            alert.routeType === "Streetcar"
        ),
        updated: data.lastUpdated,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
};