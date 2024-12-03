import React, { ReactNode, useState } from "react"

interface TooltipProps {
    title?: string,
    children: ReactNode
}

export const Tooltip: React.FC<TooltipProps> = ({ title, children }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)

    return (
        <div
            className={`relative inline-block`}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}

            {/* Tooltip Container */}
            <div
                className={`${!title && 'hidden'} absolute z-10 inline-block px-2 py-2 text-white bg-gray-400 rounded-lg shadow-sm transition-opacity duration-300 ${
                    isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                style={{ bottom: '120%', left: '50%', minWidth: 200, transform: 'translateX(-50%)' }}
                role="tooltip"
            >
                <span className="text-xs tracking-tight leading-normal whitespace-normal">{title}</span>

                {/* Tooltip Arrow */}
                <div
                    className="tooltip-arrow"
                    data-popper-arrow
                    style={{
                        position: 'absolute',
                        top: '100%',  // Arrow should be at the bottom of the tooltip
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '0',
                        height: '0',
                        borderLeft: '5px solid transparent',
                        borderRight: '5px solid transparent',
                        borderTop: '5px solid #cbd5e1',  // Same color as tooltip background
                    }}
                />
            </div>
        </div>
    )
}
