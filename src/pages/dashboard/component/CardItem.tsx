// CardItem.js
import React from 'react';

interface CardItemProps {
    text: string
    icon: string
    onClick?: () => void
    isSelected?: boolean
}

const CardItem: React.FC<CardItemProps> = ({ text, icon, onClick, isSelected = false }) => {
    return (
        <div
            onClick={onClick}
            className={`flex py-3 px-5 w-full ${isSelected ? 'bg-primary' : 'bg-gray-100 hover:bg-gray-200'} justify-center items-center gap-3 rounded-lg cursor-pointer shadow-lg group`}
        >
            <svg className={`w-[26px] h-[26px] ${isSelected ? 'text-white' : 'text-gray-500'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="1" d={icon} />
            </svg>
            <h2 className={`${isSelected ? 'text-white' : "text-gray-500"} font-light text-lg whitespace-nowrap`}>{text}</h2>
        </div>
    );
};

export default CardItem;
