import axios from "axios";

export async function getTTCAlerts() {
  try {
    const res = await axios.get("https://alerts.ttc.ca/api/alerts/site-wide", {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const raw = res.data.siteWideCustom || [];
    const now = Date.now();

    // Only active subway alerts
    const activeSubway = raw.filter((a) => {
      const start = new Date(a.activePeriod?.start).getTime();
      const end = new Date(a.activePeriod?.end).getTime();
      return (
        a.routeType === "Subway" &&
        now >= start &&
        now <= end &&
        ["REDUCED_SERVICE", "NO_SERVICE", "CLOSURE"].includes(a.effect)
      );
    });

    return activeSubway;
  } catch (err) {
    console.error("Error fetching TTC alerts:", err.message);
    return [];
  }
}