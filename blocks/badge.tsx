import * as React from 'react'

interface Props {
    color?: "yellow" | "green"
}

const colorSchemes = {
    white: {
      background: "rgb(237, 242, 247)",
      color: "rgb(26, 32, 44)",
    },
    yellow: {
        background: "rgb(254, 252, 191)",
        color: "rgb(116, 66, 16)",
    },
    green: {
        background: "rgb(198, 246, 213)",
        color: "rgb(34, 84, 61)",
    },
    red: {
        background: "rgb(254, 215, 215)",
        color: "rgb(130, 39, 39)",
    },
}

const Badge: React.FC<Props> = ({ color, children }) => {
    const colorScheme = colorSchemes[color || "white"]

    return (
        <div style={{
            padding: "0 4px",
            background: colorScheme.background,
            borderRadius: "2px",
            display: "inline-flex",
            fontSize: "12px",
            fontWeight: "700",
            lineHeight: "22px",
            color: colorScheme.color,
            textTransform: "uppercase"
        }}>
            {children}
        </div>
    )
}

export default Badge
