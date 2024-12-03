import React from "react"

interface CardTextProps {
    text: string,
    center?: boolean,
    bold?: boolean,
    color?: string
}

export const CardText: React.FC<CardTextProps> = ({ text = "Here are",
    center = false, bold = false, color = 'gray-700' }) => {
    return (
        <p className={`${center && 'text-center'} mb-3 font-${bold ? 'bold' : 'normal'} text-${color}`}>
            {text}
        </p>
    )
}