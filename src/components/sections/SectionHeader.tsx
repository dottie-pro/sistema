import { useAppContext } from "@/context/AppContext"
import { useEffect, useState } from "react";

interface SectionProps {
    title?: string
}

export const SectionHeader = ({ title }: SectionProps) => {
    

    return (
        <div className="w-full h-auto">
            <div className="h-auto w-full">
                <h1 className="mb-4 text-4xl fw-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-3xl">
                    {title}
                </h1>
            </div>
        </div>
    )
}