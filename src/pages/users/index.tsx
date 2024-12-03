import { Body, SectionHeader } from "@/components"
import { Table, TableDropdownMenu, TablePagination, TableSearchInput } from "@/components/table"
import { useAppContext } from "@/context/AppContext"
import { api } from "@/helpers/api"
import { UserDataObject } from "@/helpers/types"
import { AxiosResponse } from "axios"
import { randomUUID } from "crypto"
import { useRouter } from "next/router"
import React, { useCallback, useEffect, useState } from "react"

const Users: React.FC = () => {
    const [users, setUsers] = useState<UserDataObject[]>([])
    const [selectedData, setSelectedData] = useState<string[]>([])
    const [searchText, setSearchText] = useState<string>('')
    const { setAlertData, setLoading } = useAppContext()
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10;
    const router = useRouter()


    const getUsers = async () => {
        try {
            const response = await api.get(`/user/list?page=${currentPage}&limit=${itemsPerPage}&search=${searchText}`);
            const { success, users, total } = response?.data
            if (!success) {
                setAlertData({
                    active: true,
                    title: 'Ocorreu um erro ao buscar os usuários.',
                    message: 'Erro ao buscar pelos usuários',
                    type: 'error'
                })
                return
            }

            setUsers(users);
            setTotalPages(Math.ceil(total / itemsPerPage));

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])



    const handleDeleteUser = async () => {
        if (selectedData?.length > 0) {
            try {
                setLoading(true)
                let success = true
                for (let id of selectedData) {
                    const response: AxiosResponse<any> = await api.delete(`/user/delete/${id}`)
                    const { data } = response
                    if (!data?.success) {
                        success = false
                    }

                }
                if (!success) {

                    setAlertData({
                        active: true,
                        title: 'Ocorreu um erro',
                        message: 'Tivemos alguns problemas ao excluír o usuário. Tente novamente mais tarde ou contato o suporte.',
                        type: 'error'
                    })

                    return false
                }


                setAlertData({
                    active: true,
                    title: 'Tudo certo!',
                    message: 'Usuários excluídos.',
                    type: 'success'
                })

                await getUsers()

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
                message: 'Selecione pelo menos um usuário que será excluído.',
                type: 'info'
            })
        }
    }

    const dropdownItems = [
        { label: 'Novo', href: '/users/new' },
        { label: 'Excluir Usuario', href: '#', onclick: () => handleDeleteUser() },
    ];


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
        const allSelected = selectedData?.length == users?.length
        if (allSelected) {
            setSelectedData([])
        } else {
            setSelectedData(users.map(item => item._id || ''));
        }
    }, [users, selectedData]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


    return (
        <Body>
            <SectionHeader title="Usuários" />
            <div className="flex w-full h-full flex-col">
                <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white py-2 px-2">
                    <TableDropdownMenu items={dropdownItems} />
                    <TableSearchInput placeholder="Pesquisar por Usuario"
                        value={searchText}
                        handleChange={(value) => setSearchText(value)}
                        fetchData={() => getUsers()}
                    />
                </div>
                <Table>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-all-search"
                                        type="checkbox"
                                        checked={selectedData.length === users.length && users.length > 0}
                                        onChange={handleAllCheckboxSelected}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:border-gray-600"
                                    />
                                    <label htmlFor="checkbox-all-search" className="sr-only">
                                        Selecionar todos
                                    </label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nome
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Telefone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ação
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? users.map((item, index) => {
                            const userId = item?._id || ''
                            const selected = selectedData?.includes(userId)
                            return (
                                <tr key={index} className="bg-white border-b  hover:bg-gray-50 dark:hover:bg-gray-200"
                                    style={{ backgroundColor: selected ? "#FFE5B5" : "#fff" }}>
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input
                                                id="checkbox-table-search-2"
                                                type="checkbox"
                                                checked={selectedData?.includes(userId)}
                                                onChange={(e) => {
                                                    handleCheckboxChange(userId, e.target.checked)
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
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src="./icons/user.png"
                                            alt="Thomas Lean"
                                        />
                                        <div className="ps-3">
                                            <div className="text-base font-semibold">
                                                {item.name}
                                            </div>
                                            <div className="font-normal text-gray-500">
                                                {item.email}
                                            </div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            {item.phone}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 cursor-pointer">
                                        <div onClick={() => router.push(`/users/${item._id}`)}>
                                            <a
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                Editar usuário
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                            :
                            <span>Não encontramos usuários cadastrados</span>}
                    </tbody>
                </Table>

                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </Body>
    )

}

export default Users