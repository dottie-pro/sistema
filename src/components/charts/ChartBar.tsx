import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useState } from 'react';
import Link from 'next/link';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartBar: React.FC = () => {
    const [chartData, setChartData] = useState({
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
        datasets: [
            {
                label: 'Fãs',
                data: [5, 10, 3, 8, 15, 7, 11],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1,
            },
        ],
    });

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="w-full bg-white rounded-lg shadow p-4 md:p-6">
            <div className="flex justify-between">
                <div>
                    <h5 className="leading-none text-3xl font-bold text-gray-900 pb-2">94k</h5>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">Fãs VS Novos Fãs</p>
                </div>
                <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                    5%
                    <svg className="w-3 h-3 ms-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 13V1m0 0L1 5m4-4 4 4" />
                    </svg>
                </div>
            </div>
            <div className="mt-4 w-full">
                <Bar data={chartData} options={chartOptions} />
            </div>
            <div className="grid grid-cols-1 items-center border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center pt-5">
                    {/* Button */}
                    <button
                        id="dropdownDefaultButton"
                        data-dropdown-toggle="lastDaysdropdown"
                        data-dropdown-placement="bottom"
                        className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-center inline-flex items-center"
                        type="button"
                    >
                        Últimos 7 dias
                        <svg className="w-2.5 m-2.5 ms-1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    {/* Dropdown menu */}
                    <div id="lastDaysdropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                Ontem
                            </Link>
                            <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                Hoje
                            </Link>
                            <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Últimos 7 dias
                            </Link>
                            <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Últimos 30 dias
                            </Link>
                            <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Últimos 90 dias
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChartBar;
