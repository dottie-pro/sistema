import React from "react"

interface PropsButton {
    text: string,
    onClick: React.MouseEventHandler<HTMLAnchorElement>
}

export const CardButton: React.FC<PropsButton> = ({ text = "read more", onClick = () => { } }) => {

    return (
        <div>
            <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#FF6700] rounded-lg hover:bg-[#FF6700] focus:ring-4 focus:outline-none"
                onClick={onClick}>
                {text}
                <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </a>
        </div>
    )
}