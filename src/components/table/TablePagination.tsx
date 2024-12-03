interface TablePaginationProps {
    currentPage: number;
    totalPages: number;  // Total de itens para calcular a contagem de páginas
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
    currentPage,
    totalPages,
    itemsPerPage,
    onPageChange,
}) => {

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalPages * itemsPerPage);


    return (
        <section className="flex items-center w-full">
            <div className="w-full mx-auto">
                <div className="relative overflow-hidden bg-white rounded-b-lg shadow-md">
                    <nav className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
                        aria-label="Table navigation">
                        <span className="text-sm font-normal text-gray-500">
                            Mostrando <span className="font-semibold text-gray-900">{startItem}</span> a{" "}
                            <span className="font-semibold text-gray-900">{endItem}</span> de{" "}
                            <span className="font-semibold text-gray-900">{totalPages * itemsPerPage}</span>
                        </span>
                        <ul className="inline-flex items-stretch -space-x-px">
                            <li>
                                <button
                                    onClick={() => onPageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                >
                                    <span className="sr-only">Anterior</span>
                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                            clipRule="evenodd"></path>
                                    </svg>
                                </button>
                            </li>
                            {[...Array(totalPages)].map((_, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => onPageChange(index + 1)}
                                        className={`flex items-center justify-center px-3 py-2 text-sm leading-tight ${
                                            currentPage === index + 1
                                                ? 'border text-white bg-gray-700'
                                                : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li>
                                <button
                                    onClick={() => onPageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                >
                                    <span className="sr-only">Próximo</span>
                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"></path>
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </section>
    );
};
