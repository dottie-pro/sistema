import React, { ReactNode } from 'react';

interface CardProps {
    children?: ReactNode,
    gap?: number
}

export const Card: React.FC<CardProps> = ({ children, gap = 1 }) => {
    return (
        <div className={`max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow flex-col flex gap-${gap}`}>
            {children}
        </div>
    );
};
