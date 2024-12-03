import Image from "next/image"
import React from "react"

interface CardIconProps {
    icon: string,
    alt: string,
    width: number,
    height: number,
}

export const CardIcon: React.FC<CardIconProps> = ({
    icon = "", alt = "icon-card", width = 25, height = 25 }) => {
    return (
        <Image alt={alt} src={icon} width={width} height={height} />
    )
}