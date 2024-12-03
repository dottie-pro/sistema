import { useRouter } from "next/router";
import { ReactNode } from "react";

interface TableProps {
    children: ReactNode
}


export const Table = ({ children }: TableProps) => {
    const router = useRouter()

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                {children}
            </table>
        </div>
    );
};

