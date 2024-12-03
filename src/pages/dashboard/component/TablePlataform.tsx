import { Table } from "@/components/table"

interface TablePlataformProps {
    data: any
}

const TablePlataform: React.FC<TablePlataformProps> = ({ data = [] }) => {
    // Verifica se `data` tem pelo menos um item e obtém as chaves; caso contrário, `columnNames` será um array vazio.
    const columnNames = data.length > 0 ? Object.keys(data[0]) : []

    const formatDate = (dateString: string) => {
        // Tenta criar um objeto Date a partir do dateString
        const date = new Date(dateString)
        // Verifica se é uma data válida
        if (isNaN(date.getTime())) return dateString
        // Formata a data no formato dd/MM/yyyy
        return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date)
    }

    return (
        <Table>
            <thead className="text-xs text-gray-700 uppercase bg-primary border">
                <tr>
                    {columnNames.map((colName) => (
                        <th key={colName} scope="col" className="px-6 py-3 text-white">
                            {colName}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {
                    data.map((item: any, index: number) => (
                        <tr key={index} className="bg-white border-b">
                            {columnNames.map((colName) => (
                                <td key={colName} className="px-6 py-4">
                                    {/* Formata a data caso a coluna seja "data", caso contrário exibe o valor normal */}
                                    {colName === 'data' ? formatDate(item[colName]) : item[colName] || 'N/A'}
                                </td>
                            ))}
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}

export default TablePlataform
