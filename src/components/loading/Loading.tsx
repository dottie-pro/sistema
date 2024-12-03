import React from 'react';

export const Loading: React.FC = () => {
    return (
        <div className="absolute w-full flex flex-col items-center justify-center h-screen -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
            {/* <!-- Texto de carregamento --> */}
            {/* <div className="text-lg font-semibold text-gray-700 mb-4 justify-center text-center">
                Carregando...
            </div> */}

            {/* <!-- Rodapé com um ícone de upload --> */}
            <div className="mt-4 flex items-center">
                <svg
                    className="animate-spin h-8 w-8 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                    />
                </svg>
                <span className="ml-2 text-blue-600">Carregando...</span>
            </div>
        </div>
    )
}
