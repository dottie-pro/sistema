import { Body, Dropdown, SectionHeader } from "@/components";
import { useAppContext } from "@/context/AppContext";
import { api } from "@/helpers/api";
import {
  AnalyticsObjectData,
  CustomerDataObject,
  FilesAnalyticsObjectData,
} from "@/helpers/types";
import { formatDate } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface FileWithPreview {
  file: File;
  preview: string;
}

const AnalyticsEdit: React.FC = () => {
  const [customerName, setCustomerName] = useState<string>("");
  const [customers, setCustomers] = useState<CustomerDataObject[]>([]);
  const [newFiles, setNewFiles] = useState<FileWithPreview[]>([]);
  const [analyticsData, setAnalyticsData] = useState<FilesAnalyticsObjectData>({
    _id: "",
    createdAt: "",
    updatedAt: "",
    keyFile: "",
    influencer: "",
    plataform: "",
    format: "",
    campaign: "",
    type: "",
    followersNumber: 0,
    impressoes: 0,
    visualizacoes: 0,
    alcance: 0,
    seguidores_alcancados: 0,
    nao_seguidores_integram: 0,
    visualizacoes_completas: 0,
    taxa_retencao: 0,
    tempo_medio_visualizacao: 0,
    taxa_for_you: 0,
    cliques_link: 0,
    clique_arroba: 0,
    clique_hashtag: 0,
    avancar: 0,
    voltar: 0,
    sair: 0,
    proximo_story: 0,
    visitas_perfil: 0,
    comecaram_seguir: 0,
    tempo_stories: 0,
    curtidas: 0,
    salvamentos: 0,
    compartilhamentos: 0,
    comentarios: 0,
    data_publicacao: "",
    userId: "",
    files: [],
  });
  const router = useRouter();
  const { id } = router.query;
  const newAnalytics = id === "new";
  const { setAlertData, userData, loading, setLoading } = useAppContext();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnalyticsData((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const getAnalytics = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/filesData/${id}`);

      const { success, filesData } = response?.data;

      if (!success) {
        setAlertData({
          active: true,
          title: "Ocorreu um erro ao buscar Análise.",
          message: "Erro ao buscar pelo Análise",
          type: "error",
        });
        return;
      }

      setAnalyticsData(filesData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!newAnalytics && id) {
      getAnalytics();
    }
  }, [id]);

  const plataform = [
    { label: "Youtube", value: "Youtube" },
    { label: "Instagram", value: "Instagram" },
    { label: "Tiktok", value: "Tiktok" },
    { label: "Twitter", value: "Twitter" },
    { label: "Facebook", value: "Facebook" },
  ];

  const format = [
    { label: "Feed", value: "Feed" },
    { label: "Story", value: "Story" },
    { label: "Reels", value: "Reels" },
    { label: "Tiktok", value: "Tiktok" },
    { label: "Vídeo", value: "Vídeo" },
    { label: "Tweet", value: "Tweet" },
    { label: "Short", value: "Short" },
    { label: "Post", value: "Post" },
  ];

  const verifyLogoPlataform = (plataform: string): string => {
    if (plataform === "youtube") return "/icons/youtube_icon.png";
    if (plataform === "instagram") return "/icons/instagram_icon.png";
    if (plataform === "tiktok") return "/icons/tiktok_icon.png";
    if (plataform === "twitter") return "/icons/twitter.png";
    if (plataform === "facebook") return "/icons/facebook.png";

    return "";
  };

  return (
    <Body>
      <SectionHeader title="Minha Análise" />

      <div className="bg-white rounded py-5 px-6">
        <h1 className="text-gray-900 text-2xl font-bold pb-8">Resumo</h1>

        <div className="flex w-full pb-5 gap-6 flex-wrap">
          <div className="flex gap-2 py-3 px-3 items-center">
            <span className="fw-bold text-gray-900 text-2xl">
              {analyticsData.format}
            </span>
            <img
              src={verifyLogoPlataform(analyticsData.plataform.toLowerCase())}
              className="w-auto h-8"
            />
          </div>
        </div>
        <div className="flex w-full pb-10 gap-6 flex-wrap">
          <div className="flex gap-2 rounded-md bg-gray-200 py-3 px-3">
            <span className="text-gray-700">Impressões:</span>
            <span className="text-gray-700 font-bold">
              {analyticsData.impressoes || 0}
            </span>
          </div>

          <div className="flex gap-2 rounded-md bg-gray-200 py-3 px-3">
            <span className="text-gray-700">Visualizações:</span>
            <span className="text-gray-700 font-bold">
              {analyticsData.visualizacoes || 0}
            </span>
          </div>

          <div className="flex gap-2 rounded-md bg-gray-200 py-3 px-3">
            <span className="text-gray-700">Alcance:</span>
            <span className="text-gray-700 font-bold">
              {analyticsData.alcance || 0}
            </span>
          </div>
          <div className="flex gap-2 rounded-md bg-gray-200 py-3 px-3">
            <span className="text-gray-700">Seguidores Alcançados:</span>
            <span className="text-gray-700 font-bold">
              {analyticsData.seguidores_alcancados || 0}
            </span>
          </div>
          <div className="flex gap-2 rounded-md bg-gray-200 py-3 px-3">
            <span className="text-gray-700">Não Seguidores:</span>
            <span className="text-gray-700 font-bold">
              {analyticsData.nao_seguidores_integram || 0}
            </span>
          </div>
          <div className="flex gap-2 rounded-md bg-gray-200 py-3 px-3">
            <span className="text-gray-700">Taxa de Retenção:</span>
            <span className="text-gray-700 font-bold">
              {analyticsData.taxa_retencao || 0}
            </span>
          </div>
          <div className="flex gap-2 rounded-md bg-gray-200 py-3 px-3">
            <span className="text-gray-700">
              tempo médio de viualização (s):
            </span>
            <span className="text-gray-700 font-bold">
              {analyticsData.tempo_medio_visualizacao || 0}
            </span>
          </div>
          <div className="flex gap-2 rounded-md bg-gray-200 py-3 px-3">
            <span className="text-gray-700">Taxa for you:</span>
            <span className="text-gray-700 font-bold">
              {analyticsData.taxa_for_you || 0}
            </span>
          </div>
          <div className="flex gap-2 rounded-md bg-gray-200 py-3 px-3">
            <span className="text-gray-700">Cliques no Link:</span>
            <span className="text-gray-700 font-bold">
              {analyticsData.cliques_link || 0}
            </span>
          </div>
          <div className="flex gap-2 rounded-md bg-gray-200 py-3 px-3">
            <span className="text-gray-700">Cliques no @:</span>
            <span className="text-gray-700 font-bold">
              {analyticsData.clique_arroba || 0}
            </span>
          </div>
          <div className="flex gap-2 rounded-md bg-gray-200 py-3 px-3">
            <span className="text-gray-700">Cliques no hashtag:</span>
            <span className="text-gray-700 font-bold">
              {analyticsData.clique_hashtag || 0}
            </span>
          </div>
          <div className="flex gap-2 rounded-md bg-gray-200 py-3 px-3">
            <span className="text-gray-700">Avançar:</span>
            <span className="text-gray-700 font-bold">
              {analyticsData.avancar || 0}
            </span>
          </div>
          <div className="flex gap-2 rounded-md bg-gray-200 py-3 px-3">
            <span className="text-gray-700">Voltar:</span>
            <span className="text-gray-700 font-bold">
              {analyticsData.voltar || 0}
            </span>
          </div>
          <div className="flex gap-2 rounded-md bg-gray-200 py-3 px-3">
            <span className="text-gray-700">Sair:</span>
            <span className="text-gray-700 font-bold">
              {analyticsData.sair || 0}
            </span>
          </div>
          <div className="flex gap-2 rounded-md bg-gray-200 py-3 px-3">
            <span className="text-gray-700">Próximo Story:</span>
            <span className="text-gray-700 font-bold">
              {analyticsData.proximo_story || 0}
            </span>
          </div>
          <div className="flex gap-2 rounded-md bg-gray-200 py-3 px-3">
            <span className="text-gray-700">Visitas ao Perfil:</span>
            <span className="text-gray-700 font-bold">
              {analyticsData.visitas_perfil || 0}
            </span>
          </div>
          <div className="flex gap-2 rounded-md bg-gray-200 py-3 px-3">
            <span className="text-gray-700">Começaram a seguir:</span>
            <span className="text-gray-700 font-bold">
              {analyticsData.comecaram_seguir || 0}
            </span>
          </div>
          <div className="flex gap-2 rounded-md bg-gray-200 py-3 px-3">
            <span className="text-gray-700">Tempo de Stories:</span>
            <span className="text-gray-700 font-bold">
              {analyticsData.tempo_stories || 0}
            </span>
          </div>
          <div className="flex gap-2 rounded-md bg-gray-200 py-3 px-3">
            <span className="text-gray-700">Curtidas:</span>
            <span className="text-gray-700 font-bold">
              {analyticsData.curtidas || 0}
            </span>
          </div>
          <div className="flex gap-2 rounded-md bg-gray-200 py-3 px-3">
            <span className="text-gray-700">Salvamentos:</span>
            <span className="text-gray-700 font-bold">
              {analyticsData.salvamentos || 0}
            </span>
          </div>
          <div className="flex gap-2 rounded-md bg-gray-200 py-3 px-3">
            <span className="text-gray-700">Compartilhamentos:</span>
            <span className="text-gray-700 font-bold">
              {analyticsData.compartilhamentos || 0}
            </span>
          </div>
          <div className="flex gap-2 rounded-md bg-gray-200 py-3 px-3">
            <span className="text-gray-700">Comentários:</span>
            <span className="text-gray-700 font-bold">
              {analyticsData.comentarios || 0}
            </span>
          </div>

          <div className="flex gap-2 rounded-md bg-gray-200 py-3 px-3">
            <span className="text-gray-700">Data de Publicação:</span>
            <span className="text-gray-700 font-bold">
              {analyticsData.data_publicacao
                ? formatDate(analyticsData.data_publicacao, "dd/MM/yyyy")
                : "--/--/----"}
            </span>
          </div>
        </div>

        <div className="flex gap-2 pt-5 w-full justify-end">
          {!newAnalytics && (
            <button className="flex items-center px-4 py-2 bg-[#FF6700] text-white rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.94 6.34a1 1 0 011.3.33L10 11.58l5.76-4.9a1 1 0 011.62.78v6.76a2 2 0 01-2 2H4a2 2 0 01-2-2V7.45a1 1 0 01.94-1.11z" />
              </svg>
              Enviar por email
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded py-5 px-6">
        <h1 className="text-gray-900 text-2xl font-bold pb-8">
          Dados da Ação/Campanha
        </h1>
        <div className="grid gap-3">
          {/* <div className="w-full mb-2 relative">
                        <label className="mb-2 text-sm font-medium text-gray-900 sr-only ">Buscar</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" onChange={(e) => setCustomerName(e.target.value)} value={customerName} className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Buscar pelo Cliente" />
                            <button onClick={() => handleCustomers()} className="text-white absolute end-1 bottom-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5">Buscar</button>
                        </div>
                        {customers.length > 0 && <div className="d-flex flex-column w-full py-2 bg-white shadow-lg absolute">
                            {customers.map((item, index) => (
                                <div key={index} className="w-full d-flex hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-200 cursor-pointer px-2 py-1"
                                    onClick={() => {
                                        setCustomerSelected(item)
                                        setCustomers([])
                                        setCustomerName('')
                                        setAnalyticsData({ ...analyticsData, customerId: item._id })
                                    }}>
                                    <span className="text-gray-600">{item.name}</span>
                                </div>
                            ))}
                        </div>}
                    </div> */}

          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Influêncer
            </label>
            <input
              type="text"
              value={analyticsData?.influencer || ""}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Busque pelo cliente no campo acima..."
            />
          </div>

          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Plataforma
            </label>
            <Dropdown
              title="Selecione uma opção"
              options={plataform}
              value={analyticsData.plataform}
            />
          </div>

          <div>
            <label
              htmlFor="format"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Formato
            </label>
            <Dropdown
              title="Selecione uma opção"
              options={format}
              value={analyticsData.format}
            />
          </div>

          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Campanha
            </label>
            <input
              type="text"
              name="name"
              value={analyticsData.campaign || ""}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="ex: nome do Projeto"
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-2 w-full">
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Data de envio:
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </div>
                <input
                  type="date"
                  name="createdAt"
                  value={analyticsData.createdAt || ""}
                  className="px-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                  placeholder="Select date start"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Data da última atualização:
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </div>
                <input
                  type="date"
                  name="endDate"
                  value={analyticsData.updatedAt || ""}
                  className="px-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                  placeholder="Select date start"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded py-5 px-6">
        <h1 className="text-gray-900 text-2xl font-bold pb-8">Arquivos</h1>

        <div className="d-flex flex-column gap-2">
          <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 pl-6 max-w-[72%]">
            {analyticsData.files.map((fileData, index) => (
              <Link key={index} href={fileData.url || ""} target="_blank">
                <div
                  className={`border rounded-md flex px-2 py-2 flex-col bg-white items-center gap-4`}
                >
                  <div className="w-full flex justify-between gap-2 align-center pb-4 px-2 py-2">
                    <span className="text-gray-600 text-sm max-w-80 truncate whitespace-nowrap">
                      {fileData?.name}
                    </span>
                  </div>

                  <img
                    src={fileData.url}
                    className="w-40 md:w-56  max-h-64 object-contain"
                    alt={`Preview ${index}`}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Body>
  );
};

export default AnalyticsEdit;
