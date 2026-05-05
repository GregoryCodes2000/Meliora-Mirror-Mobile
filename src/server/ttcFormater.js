export function formatForMirror(alert) {
  const end = new Date(alert.activePeriod.end);

  const endStr = end.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const shuttle =
    alert.shuttleType === "Will Operate" || alert.shuttleType === "Running"
      ? "Shuttle buses running"
      : "";

  return `${alert.route} Closure
${alert.stopStart} → ${alert.stopEnd}
${shuttle || alert.effectDesc || ""}
Until ${endStr}`;
}