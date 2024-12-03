import React from "react"

interface CardTitleProps {
    text: string,
    center?: boolean,
    color?: string
}

export const CardTitle: React.FC<CardTitleProps> = ({ text = "Noteworthy technology acquisitions 2021",
    center = false, color = 'gray-900' }) => {
    return (
        <h5 className={`mb-2 text-2xl font-bold tracking-tight text-${color} ${center && 'text-center'}`}>
            {text}
        </h5>
    )
}