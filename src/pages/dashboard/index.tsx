import { useAppContext } from "@/context/AppContext"
import { formatMilhares, formatPorcentagem } from "@/helpers"
import { api } from "@/helpers/api"
import { ReportDashboard } from "@/helpers/types"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import CardItem from "./component/CardItem"
import TablePlataform from "./component/TablePlataform"

const Dashboard: React.FC = () => {
    const { userData } = useAppContext()
    const [reportData, setReportData] = useState<ReportDashboard>({
        influencers: 0,
        publis: 0,
        seguidores_totais: 0,
        impressoes_views: 0,
        alcance_total: 0,
        alcance_seguidores: 0,
        engajamento_total: 0,
        taxa_de_engajamento: 0,
        comentarios_total: 0
    })
    const [report, setReport] = useState<any>({})
    const [graphSelected, setGraphSelected] = useState<string>('video_curto')
    const router = useRouter()


    const fetcherData = async () => {
        try {
            const response = await api.get('/report/dashboard')
            const { indicadores, reports } = response.data
            setReportData(indicadores)
            setReport(reports)
        } catch (error) {
            console.log(error)
            return error
        }
    }

    useEffect(() => {
        fetcherData()
    }, [])


    const IconPaths = {
        todos: "M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
        video_curto: "M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
        stories: "M10 3v4a1 1 0 0 1-1 1H5m4 10v-2m3 2v-6m3 6v-3m4-11v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z",
        video_longo: "M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01",
        outros: "M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"
    };



    return (
        <div className="px-8 flex gap-4 justify-center w-full">
            <div className="flex px-12 flex-col gap-3 w-full py-8">

                <div>
                    <h1 className="text-gray-700 fw-bold text-2xl">Menu Rápido</h1>
                </div>

                <div className="flex gap-4">

                    <div className="flex gap-4 w-full">
                        <div className="flex py-3 px-5 w-full bg-white items-center gap-3 rounded-lg
                cursor-pointer hover:bg-gray-100 shadow-lg" onClick={() => router.push(`/users/${userData._id}`)}>
                            <svg className="w-[26px] h-[26px] text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="1" d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>


                            <h2 className="text-gray-700 font-light text-lg">Meus Dados</h2>
                        </div>

                        <div className="flex py-3 px-5 w-full bg-white items-center gap-3 rounded-lg
                cursor-pointer hover:bg-gray-100 shadow-lg" onClick={() => router.push('/analytics')}>
                            <svg className="w-[26px] h-[26px] text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M10 3v4a1 1 0 0 1-1 1H5m4 10v-2m3 2v-6m3 6v-3m4-11v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z" />
                            </svg>

                            <h2 className="text-gray-700 font-light text-lg whitespace-nowrap">Arquivos Enviados</h2>
                        </div>

                        <div className="flex py-3 px-5 w-full bg-white items-center gap-3 rounded-lg
                cursor-pointer hover:bg-gray-100 shadow-lg" onClick={() => router.push('/upload-files')}>
                            <svg className="w-[26px] h-[26px] text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01" />
                            </svg>

                            <h2 className="text-gray-700 font-light text-lg whitespace-nowrap">Subir Imagens</h2>
                        </div>

                        <div className="flex py-3 px-5 w-full bg-white items-center gap-3 rounded-lg
                cursor-pointer hover:bg-gray-100 shadow-lg" onClick={() => router.push(`/users/${userData._id}`)}>
                            <svg className="w-[26px] h-[26px] text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z" />
                            </svg>

                            <h2 className="text-gray-700 font-light text-lg whitespace-nowrap">Alterar Senha</h2>
                        </div>
                    </div>
                </div>


                    <div>
                        <h1 className="text-gray-700 fw-bold text-2xl mt-4">Dashboard</h1>
                    </div>

                    <div className="flex gap-2 w-full">
                        <div className="bg-white px-4 py-4 flex w-full flex-col items-center justify-center rounded-lg border">
                            <h2 className="text-gray-700 font-light text-md whitespace-nowrap">Volume Máximo de Seguidores</h2>
                            <h2 className="text-gray-700 font-bold text-2xl whitespace-nowrap">{formatMilhares(reportData.seguidores_totais)}</h2>

                            <div className="px-2 py-2 flex w-full justify-center items-center gap-2">
                                <div className="bg-white px-4 py-4 flex w-full flex-col items-center rounded-lg shadow">
                                    <span className="text-gray-700 font-light text-md whitespace-nowrap">Influencers</span>
                                    <span className="text-gray-700 font-bold text-md whitespace-nowrap">{formatMilhares(reportData.influencers)}</span>
                                </div>

                                <div className="bg-white px-4 py-4 flex w-full flex-col items-center rounded-lg shadow">
                                    <span className="text-gray-700 font-light text-md whitespace-nowrap">Publis</span>
                                    <span className="text-gray-700 font-bold text-md whitespace-nowrap">{formatMilhares(reportData.publis)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white px-4 py-4 flex w-full flex-col justify-center gap-2 items-center rounded-lg border">

                            <svg className="w-[26px] h-[26px] text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z" clip-rule="evenodd" />
                            </svg>

                            <h2 className="text-gray-700 font-light text-md whitespace-nowrap">Impressões/Views Totais</h2>
                            <h2 className="text-gray-700 font-bold text-2xl whitespace-nowrap">{formatMilhares(reportData.impressoes_views)}</h2>

                        </div>

                        <div className="bg-white px-4 py-4 flex w-full flex-col justify-center gap-2 items-center rounded-lg border">
                            <svg className="w-[26px] h-[26px] text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M5 8a1 1 0 0 1 1 1v3a4.006 4.006 0 0 0 4 4h4a4.006 4.006 0 0 0 4-4V9a1 1 0 1 1 2 0v3.001A6.006 6.006 0 0 1 14.001 18H13v2h2a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h2v-2H9.999A6.006 6.006 0 0 1 4 12.001V9a1 1 0 0 1 1-1Z" clip-rule="evenodd" />
                                <path d="M7 6a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4V6Z" />
                            </svg>

                            <h2 className="text-gray-700 font-light text-md whitespace-nowrap">Maior Alcance das Entregas</h2>
                            <h2 className="text-gray-700 font-bold text-2xl whitespace-nowrap">{formatMilhares(reportData.alcance_total)}</h2>

                        </div>

                        <div className="bg-white px-4 py-4 flex w-full flex-col gap-2 justify-center items-center rounded-lg border">
                            <svg className="w-[26px] h-[26px] text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M14 7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7Zm2 9.387 4.684 1.562A1 1 0 0 0 22 17V7a1 1 0 0 0-1.316-.949L16 7.613v8.774Z" clip-rule="evenodd" />
                            </svg>

                            <h2 className="text-gray-700 font-light text-md whitespace-nowrap">% Alcance X Seguidores</h2>
                            <h2 className="text-gray-700 font-bold text-2xl whitespace-nowrap">{formatPorcentagem(reportData.alcance_seguidores)}</h2>
                        </div>
                    </div>
                    <div className="flex w-full gap-2">

                        <div className="bg-white px-2 gap-2 py-2 flex w-full flex-col items-center justify-center rounded-lg border">
                            <div className="bg-white flex w-full flex-col items-center rounded-lg shadow px-2 py-2">
                                <h2 className="text-gray-700 font-light text-md whitespace-nowrap">Engajamentos Totais</h2>
                                <h2 className="text-gray-700 font-bold text-2xl whitespace-nowrap">{formatMilhares(reportData.engajamento_total)}</h2>
                            </div>

                            <div className="bg-white flex w-full flex-col items-center rounded-lg shadow px-2 py-2">
                                <h2 className="text-gray-700 font-light text-md whitespace-nowrap">Taxa de Engajamentos</h2>
                                <h2 className="text-gray-700 font-bold text-2xl whitespace-nowrap">{formatPorcentagem(reportData.taxa_de_engajamento)}</h2>
                            </div>
                        </div>

                        <div className="bg-white px-4 py-4 flex w-full flex-col items-center justify-center gap-2 rounded-lg border">
                            <svg className="w-[26px] h-[26px] text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Zm4.996 2a1 1 0 0 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM11 8a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Zm-4.004 3a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM11 11a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Zm-4.004 3a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM11 14a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Z" clip-rule="evenodd" />
                            </svg>

                            <h2 className="text-gray-700 font-light text-md whitespace-nowrap">Comentários</h2>
                            <h2 className="text-gray-700 font-bold text-3xl whitespace-nowrap">{formatMilhares(reportData.comentarios_total)}</h2>
                        </div>
                    </div>

                    <div className="flex gap-4 w-full bg-white items-center px-4 py-4 rounded-lg border">
                        <CardItem text="Ver Todos" icon={IconPaths.todos} onClick={() => setGraphSelected('todos')} isSelected={graphSelected === 'todos'} />
                        <CardItem text="Vídeos Curtos" icon={IconPaths.video_curto} onClick={() => setGraphSelected('video_curto')} isSelected={graphSelected === 'video_curto'} />
                        <CardItem text="Stories" icon={IconPaths.stories} onClick={() => setGraphSelected('stories')} isSelected={graphSelected === 'stories'} />
                        <CardItem text="Vídeo Longo" icon={IconPaths.video_longo} onClick={() => setGraphSelected('video_longo')} isSelected={graphSelected === 'video_longo'} />
                        <CardItem text="Outras Plataformas" icon={IconPaths.outros} onClick={() => setGraphSelected('outras_plataformas')} isSelected={graphSelected === 'outras_plataformas'} />
                    </div>


                    {graphSelected === 'todos' ? (
                        <div className="w-full flex flex-col gap-12">
                            <div className="w-full flex flex-col gap-2">
                                <div className="w-full px-4 py-4 bg-gray-400">
                                    <h2 className="text-white text-lg">Vídeos Curtos</h2>
                                </div>
                                <div className="flex gap-2 flex-col">
                                    <h1 className="text-primary text-lg mt-4">{report.video_curto?.table_v1?.title}</h1>
                                    {report.video_curto?.table_v1?.data?.length > 0 ?
                                        <TablePlataform data={report.video_curto?.table_v1?.data} />
                                        :
                                        <span className="text-gray-500">Não existem dados.</span>
                                    }
                                </div>

                                <div className="flex gap-2 flex-col">
                                    <h1 className="text-primary text-lg mt-4">{report.video_curto?.table_v2?.title}</h1>
                                    {report.video_curto?.table_v2?.data?.length > 0 ?
                                        <TablePlataform data={report.video_curto?.table_v2?.data} />
                                        :
                                        <span className="text-gray-500">Não existem dados.</span>
                                    }
                                </div>
                            </div>


                            <div className="w-full flex flex-col gap-2">
                                <div className="w-full px-4 py-4 bg-gray-400">
                                    <h2 className="text-white text-lg">Stories</h2>
                                </div>
                                <div className="flex gap-2 flex-col">
                                    <h1 className="text-primary text-lg mt-4">{report.stories?.table_v1?.title}</h1>
                                    {report.stories?.table_v1?.data?.length > 0 ?
                                        <TablePlataform data={report.stories?.table_v1?.data} />
                                        :
                                        <span className="text-gray-500">Não existem dados.</span>
                                    }
                                </div>

                                <div className="flex gap-2 flex-col">
                                    <h1 className="text-primary text-lg mt-4">{report.stories?.table_v2?.title}</h1>
                                    {report.stories?.table_v2?.data?.length > 0 ?
                                        <TablePlataform data={report.stories?.table_v2?.data} />
                                        :
                                        <span className="text-gray-500">Não existem dados.</span>
                                    }
                                </div>
                            </div>

                            <div className="w-full flex flex-col gap-2">

                                <div className="w-full px-4 py-4 bg-gray-400">
                                    <h2 className="text-white text-lg">Vídeo Longo</h2>
                                </div>
                                <div className="flex gap-2 flex-col">
                                    <h1 className="text-primary text-lg mt-4">{report.video_longo?.table_v1?.title}</h1>
                                    {report.video_longo?.table_v1?.data?.length > 0 ?
                                        <TablePlataform data={report.video_longo?.table_v1?.data} />
                                        :
                                        <span className="text-gray-500">Não existem dados.</span>
                                    }
                                </div>

                                <div className="flex gap-2 flex-col">
                                    <h1 className="text-primary text-lg mt-4">{report.video_longo?.table_v2?.title}</h1>
                                    {report.video_longo?.table_v2?.data?.length > 0 ?
                                        <TablePlataform data={report.video_longo?.table_v2?.data} />
                                        :
                                        <span className="text-gray-500">Não existem dados.</span>
                                    }
                                </div>
                            </div>

                            <div className="w-full flex flex-col gap-2">

                                <div className="w-full px-4 py-4 bg-gray-400">
                                    <h2 className="text-white text-lg">Outras Plataformas</h2>
                                </div>
                                <div className="flex gap-2 flex-col">
                                    <h1 className="text-primary text-lg mt-4">{report.outras_plataformas?.table_v1?.title}</h1>
                                    {report.outras_plataformas?.table_v1?.data?.length > 0 ?
                                        <TablePlataform data={report.outras_plataformas?.table_v1?.data} />
                                        :
                                        <span className="text-gray-500">Não existem dados.</span>
                                    }
                                </div>

                                <div className="flex gap-2 flex-col">
                                    <h1 className="text-primary text-lg mt-4">{report.outras_plataformas?.table_v2?.title}</h1>
                                    {report.outras_plataformas?.table_v2?.data?.length > 0 ?
                                        <TablePlataform data={report.outras_plataformas?.table_v2?.data} />
                                        :
                                        <span className="text-gray-500">Não existem dados.</span>
                                    }
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>

                            <div className="flex gap-2 flex-col">
                                <h1 className="text-primary text-lg mt-4">{report[graphSelected]?.table_v1?.title}</h1>
                                {report[graphSelected]?.table_v1?.data?.length > 0 ?
                                    <TablePlataform data={report[graphSelected]?.table_v1?.data} />
                                    :
                                    <span className="text-gray-500">Não existem dados.</span>
                                }
                            </div>

                            <div className="flex gap-2 flex-col">
                                <h1 className="text-primary text-lg mt-4">{report[graphSelected]?.table_v2?.title}</h1>
                                {report[graphSelected]?.table_v2?.data?.length > 0 ?
                                    <TablePlataform data={report[graphSelected]?.table_v2?.data} />
                                    :
                                    <span className="text-gray-500">Não existem dados.</span>
                                }
                            </div>
                        </div >
                    )}
            </div >
        </div >
    )

}

export default Dashboard