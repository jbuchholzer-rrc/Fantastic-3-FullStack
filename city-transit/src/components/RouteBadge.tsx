import "./RouteBadge.css"

type RouteBadgeProps = {
  number: string
  badgeStyle?: string | null
}

function RouteBadge({ number, badgeStyle }: RouteBadgeProps) {
  // the API stores badge colors as a JSON string
  // parse it to get background-color, border-color, and text color
  let style: React.CSSProperties = {
    backgroundColor: "var(--color-primary)",
    color: "#ffffff",
  }

  if (badgeStyle) {
    try {
      const parsed = JSON.parse(badgeStyle)
      style = {
        backgroundColor: parsed["background-color"] || "var(--color-primary)",
        color: parsed["color"] || "#ffffff",
        borderColor: parsed["border-color"] || "transparent",
        borderWidth: "1px",
        borderStyle: "solid",
      }
    } catch {
      // if parsing fails just use the default blue
    }
  }

  return (
    <span className="route-badge" style={style}>
      {number}
    </span>
  )
}

export default RouteBadge
