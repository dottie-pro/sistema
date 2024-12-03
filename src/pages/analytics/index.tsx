import { Body, SectionHeader } from "@/components"
import { Button } from "@/components/button/Button"
import { Table, TableDropdownMenu, TablePagination, TableSearchInput } from "@/components/table"
import { useAppContext } from "@/context/AppContext"
import { api } from "@/helpers/api"
import { FilesAnalyticsObjectData } from "@/helpers/types"
import { AxiosResponse } from "axios"
import { useRouter } from "next/router"
import React, { useCallback, useEffect, useState } from "react"

const AnalyticsTextData: React.FC = () => {
    const [analytics, setAnalytics] = useState<FilesAnalyticsObjectData[]>([])
    const { setAlertData, setLoading, userData } = useAppContext()
    const [selectedData, setSelectedData] = useState<string[]>([])
    const [allSelectedData, setAllSelectedData] = useState<boolean>(false)
    const [searchText, setSearchText] = useState<string>('')
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10;


    const getAnalytics = async () => {
        setLoading(true)
        try {
            const response = await api.get(`/filesData/list?page=${currentPage}&limit=${itemsPerPage}&search=${searchText}&userId=${userData._id}`);
            const { success, filesData, total } = response.data
            if (!success) {
                setAlertData({
                    active: true,
                    title: 'Ocorreu um erro ao buscar os Análises.',
                    message: 'Erro ao buscar pelos Análises',
                    type: 'error'
                })
                return
            }

            if (success) {
                setAnalytics(filesData);
                setTotalPages(Math.ceil(total / itemsPerPage)); // Calcula o total de páginas
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAnalytics()
    }, [currentPage])


    const handleCheckboxChange = useCallback((id: string, active: boolean) => {
        setSelectedData(prevSelected => {
            if (active) {
                return [...prevSelected, id]
            } else {
                return prevSelected.filter(selectedId => selectedId !== id)
            }
        });
    }, []);


    const handleAllCheckboxSelected = useCallback(() => {

        const allSelected = selectedData?.length == analytics?.length

        if (allSelected) setAllSelectedData(false)
        else setAllSelectedData(true)

        setSelectedData(prevSelected => {
            if (allSelected) {
                return []
            } else {
                return analytics.map(item => item._id)
            }
        });
    }, [analytics, selectedData]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSendPlanilhaEmail = async () => {
        if (selectedData?.length > 0) {
            try {
                setLoading(true)
                const response: AxiosResponse<any> = await api.post(`/filesData/send-planilha-email`, { textDataIds: selectedData })
                const { data } = response
                if (!data?.success) {

                    setAlertData({
                        active: true,
                        title: 'Ocorreu um erro',
                        message: 'Tivemos alguns problemas ao enviar planilha por e-mail. Tente novamente mais tarde ou contato o suporte.',
                        type: 'error'
                    })

                    return false
                }

                setAlertData({
                    active: true,
                    title: 'Tudo certo!',
                    message: 'A Planilha foi enviada para seu e-mail.',
                    type: 'success'
                })

                setSelectedData([])
            } catch (error) {
                console.log(error)
                return error
            } finally {
                setLoading(false)
            }
        } else {
            setAlertData({
                active: true,
                title: 'Atenção!',
                message: 'Selecione pelo menos um dado para enviarmos a planilha.',
                type: 'info'
            })
        }
    }

    const handleDeleteTextFiles = async () => {
        if (selectedData?.length > 0) {
            try {
                setLoading(true)
                let success = true
                for (let id of selectedData) {
                    const response: AxiosResponse<any> = await api.delete(`/filesData/delete/${id}`)
                    const { data } = response
                    if (!data?.success) {
                        success = false
                    }

                }
                if (!success) {

                    setAlertData({
                        active: true,
                        title: 'Ocorreu um erro',
                        message: 'Tivemos alguns problemas ao excluír dados. Tente novamente mais tarde ou contato o suporte.',
                        type: 'error'
                    })

                    return false
                }


                setAlertData({
                    active: true,
                    title: 'Tudo certo!',
                    message: 'Os dados foram excluídos.',
                    type: 'success'
                })

                await getAnalytics()

                setSelectedData([])
            } catch (error) {
                console.log(error)
                return error
            } finally {
                setLoading(false)
            }
        } else {
            setAlertData({
                active: true,
                title: 'Atenção!',
                message: 'Selecione pelo menos um dado que será excluído.',
                type: 'info'
            })
        }
    }

    const dropdownItems = [
        { label: 'Novo', href: '/upload-files' },
        { label: 'Excluír', href: '#', onclick: () => handleDeleteTextFiles() }
    ];


    return (
        <Body>
            <SectionHeader title="Arquivos e Campanhas" />

            {analytics && analytics?.length > 0 ?
                <div className="flex w-full h-full flex-col">
                    <div className="flex items-center rounded justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white px-2 py-4">

                        <TableDropdownMenu items={dropdownItems} />

                        <div className="flex gap-4 items-center">
                            <TableSearchInput placeholder="Buscar por Influêncer"
                                value={searchText} handleChange={(value) => setSearchText(value)}
                                fetchData={() => getAnalytics()} />
                            <div className="flex gap-2 items-center px-2 py-1 cursor-pointer hover:text-primary transition duration-150 ease-in-out hover:scale-105 hover:shadow-md rounded-lg"
                                onClick={() => handleSendPlanilhaEmail()}>
                                <span className="text-gray-700 text-light text-sm">Exportar em Excel</span>
                                <img
                                    src="./icons/excel.png"
                                    className="h-6 w-6"
                                    alt="excel-logo"
                                />
                            </div>
                        </div>

                    </div>
                    <Table>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border">
                            <tr>
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input
                                            id="checkbox-all-search"
                                            type="checkbox"
                                            checked={selectedData.length === analytics.length && analytics.length > 0}
                                            onChange={handleAllCheckboxSelected}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:border-gray-600"
                                        />
                                        <label htmlFor="checkbox-all-search" className="sr-only">
                                            Selecionar todos
                                        </label>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Influêncer
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Plataforma
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ação/Campanha
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Qnt Arquivos
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ação
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {analytics.map((item, index) => {
                                const selected = selectedData?.includes(item?._id)
                                return (
                                    <tr key={index} className="bg-white border-b  hover:bg-gray-50 dark:hover:bg-gray-200"
                                        style={{ backgroundColor: selected ? "#FFE5B5" : "#fff" }}>
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <input
                                                    id="checkbox-table-search-2"
                                                    type="checkbox"
                                                    checked={selectedData?.includes(item?._id)}
                                                    onChange={(e) => {
                                                        handleCheckboxChange(item?._id, e.target.checked)
                                                    }}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2  dark:border-gray-600"
                                                />
                                                <label
                                                    htmlFor="checkbox-table-search-2"
                                                    className="sr-only"
                                                >
                                                    checkbox
                                                </label>
                                            </div>
                                        </td>
                                        <th
                                            scope="row"
                                            className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            <div className="ps-3">
                                                <div className="text-base font-semibold">
                                                    {item.influencer}
                                                </div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">{item.plataform}</td>
                                        <td className="px-6 py-4">{item.campaign}</td>
                                        <td className="px-6 py-4">{item.files.length}</td>
                                        <td className="px-6 py-4 cursor-pointer">
                                            <div onClick={() => router.push(`/analytics/${item._id}`)}>
                                                <a
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                >
                                                    Ver análise
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>

                    <TablePagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                </div>
                : (
                    <div className="flex gap-4 w-full items-center justify-center mt-20">
                        <div className="flex gap-4 flex-col items-center">
                            <span className="text-gray-600">Não encontramos Dados processados.</span>
                            <Button text="Subir Imagem" onClick={() => router.push('/upload-files')} />
                        </div>
                    </div>
                )}
        </Body>
    )

}

export default AnalyticsTextData