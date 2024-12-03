import React, { useState } from "react";

interface Option {
    label: string;
    value: string;
}

interface DropdownProps {
    title: string;
    options: Option[]; // Atualizado para receber um array de objetos com label e value
    onSelect?: (value: string) => void;
    value: string | null;
    disabled?: boolean
}

export const Dropdown: React.FC<DropdownProps> = ({
    title = "Dropdown",
    onSelect,
    value = null,
    options = [],
    disabled = false
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionSelect = (optionValue: string) => {
        if (onSelect) {
            onSelect(optionValue);
        }
        setIsOpen(false);
    };

    const combinedOptions = [{ label: title || "Selecionar uma opção", value: "" }, ...options];


    return (
        <div className="relative inline-block text-left w-full">
            <div>
                <button
                    type="button"
                    disabled={disabled}
                    onClick={handleToggle}
                    className="flex items-center justify-between w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                >
                    {value || title}
                    <svg
                        className="w-2.5 h-2.5 ms-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                        />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className="absolute right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-full z-10">
                    <div className="py-2 text-sm text-gray-700">
                        {combinedOptions.map(({ label, value }) => (
                            <span
                                key={value}
                                onClick={() => handleOptionSelect(value)}
                                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                role="menuitem"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleOptionSelect(value);
                                    }
                                }}
                            >
                                {label} {/* Usando label para exibir a opção */}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
