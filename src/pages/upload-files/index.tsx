import Dropzone from "@/components/dropzone/Dropzone";
import React, { useCallback, useEffect, useRef, useState } from "react";
import FormDetailsFile from "./components/FormDetailsFile";
import { useAppContext } from "@/context/AppContext";
import Tesseract from "tesseract.js";
import { generateRandomId } from "@/helpers";
import Footer from "./components/footer/Footer";
import axios, { AxiosProgressEvent, AxiosResponse } from "axios";
import { api } from "@/helpers/api";
import { Modal } from "@/components";

export interface FileWithPreview {
  file: File;
  preview: string;
  fileId: string;
  selected: boolean;
  extractedText?: string;
  plataform: string;
  format: string;
  data_publicacao: Date | null;
  type: string;
  influencer: string;
  campaign: string;
  followersNumber: string;
  marca_cliente: string;
  groupKey: string;
  groupKeyColor: string;
  print_cortado: boolean;
}

interface ApiResponse {
  success: boolean;
}

interface UploadProgress {
  [key: string]: number;
}

interface ProgressUpload {
  message: string;
  progress: number;
}

const UploadFiles: React.FC = () => {
  const { setLoading, userData, setAlertData } = useAppContext();
  const [newFiles, setNewFiles] = useState<FileWithPreview[]>([]);
  const [showFormFiles, setShowFormFiles] = useState<boolean>(false);
  const [fileSelected, setFileSelected] = useState<string>("");
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [showNewFiles, setShowNewFiles] = useState<boolean>(false);
  const [showGroupFiles, setShowGroupFiles] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showCheckboxFile, setShowCheckboxFile] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});
  const [messageProgress, setMessageProgress] = useState<ProgressUpload>({
    message: "Carregando...",
    progress: 0,
  });
  const filesDrop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      if (
        filesDrop.current &&
        !filesDrop.current.contains(event.target as Node)
      ) {
        setShowNewFiles(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutSide);

    return () => {
      document.addEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  useEffect(() => {
    if (!showCheckboxFile) {
      const updatedFiles = newFiles.map((file) => {
        if (file.selected) {
          return { ...file, selected: false };
        }
        return file;
      });
      setNewFiles(updatedFiles);
    } else {
      setFileSelected("");
    }
  }, [showCheckboxFile]);

  useEffect(() => {
    if (!showGroupFiles) {
      const updatedFiles = newFiles.map((file) => {
        if (file.selected) {
          return { ...file, selected: false };
        }
        return file;
      });
      setNewFiles(updatedFiles);
    } else {
      setFileSelected("");
    }
  }, [showGroupFiles]);

  const handleProcessFiles = async (fileWithPreview: FileWithPreview[]) => {
    let isHavePrintCortado = false;

    const processedFiles = await Promise.all(
      fileWithPreview.map(async (fileData: any) => {
        try {
          const file = fileData.file;
          const fileName = encodeURIComponent(file?.name);
          const formData = new FormData();
          formData?.append("file", file, fileName);
          const processTextFile = await api.post(
            `/file/upload-and-process-text`,
            formData
          );
          const { success, extractedFormattedText } = processTextFile.data;
          if (success) {
            const extractedText = extractedFormattedText; // Ajuste de acordo com a resposta da API do Textract
            fileData.extractedText = extractedText;

            // Após extrair o texto, processar para extrair as informações
            const extractedInfo = await processExtractedText(extractedText);

            // Atualizar os dados do arquivo com as informações extraídas
            fileData.plataform = extractedInfo.Plataforma || fileData.plataform;
            fileData.format = extractedInfo.Formato || fileData.format;
            fileData.print_cortado =
              extractedInfo.print_cortado || fileData.print_cortado;

            if (fileData.print_cortado) {
              isHavePrintCortado = true;
            }

            return fileData; // Retorna o arquivo processado
          } else {
            return fileData;
          }
        } catch (error) {
          console.error("Erro ao processar a imagem:", error);
          return fileData; // Retorna o arquivo sem alterações em caso de erro
        }
      })
    );

    return { processedFiles, isHavePrintCortado };
  };

  const processExtractedText = async (text: string) => {
    // Transformar o texto em um array de palavras, similar ao código Python
    const result = text
      .toLowerCase()
      .split(/\s+/)
      .map((word) => removeAccents(word));
    // Implementar a lógica de extração de dados
    const extractedInfo = await extractInfoFromText(result);

    return extractedInfo;
  };

  // Função para remover acentos de uma string
  const removeAccents = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  // Função principal para extrair informações do texto
  const extractInfoFromText = async (result: string[]) => {
    const extractedInfo: any = {
      Plataforma: null,
      Formato: null,
      print_cortado: false,
    };

    // Const específica para prints de stories cortados ao meio, para defini-los por posição e identifica-los como story.
    // const positionStories = result.indexOf("visualizacoes");
    // const positionAlcanceStories = result.indexOf("alcance");

    // const storyPartsEspecificsVisualization = result[positionStories + 2].includes('interacoes')
    // const storyPartsEspecificsAlcance = result[positionAlcanceStories + 3].includes('contas') && result[positionAlcanceStories + 4].includes('alcancadas')
    const positionStories =
      result.indexOf("visualizacoes") >= 0
        ? result.indexOf("visualizacoes")
        : result.indexOf("views");
    const positionAlcanceStories =
      result.indexOf("alcance") >= 0
        ? result.indexOf("alcance")
        : result.indexOf("reach");

    const storyPartsEspecificsVisualization =
      result[positionStories + 2]?.includes("interacoes") ||
      result[positionStories + 2]?.includes("interactions");
    const storyPartsEspecificsAlcance =
      (result[positionAlcanceStories + 3]?.includes("contas") ||
        result[positionAlcanceStories + 3]?.includes("accounts")) &&
      (result[positionAlcanceStories + 4]?.includes("alcancadas") ||
        result[positionAlcanceStories + 4]?.includes("reached"));

    // Validação dos dados de acordo com texto extraído
    if (
      (result.includes("insights") &&
        result.includes("do") &&
        result.includes("reel")) ||
      (result.includes("interacoes") &&
        result.includes("do") &&
        result.includes("reel"))
    ) {
      extractedInfo.Plataforma = "Instagram";
      extractedInfo.Formato = "Reels";

      if (
        !result.includes("comentarios") ||
        (!result.includes("visao") && !result.includes("geral")) ||
        !result.includes("curtidas")
      ) {
        extractedInfo.print_cortado = true;
      }
      // Extrair outros dados específicos do Reels
    } else if (
      storyPartsEspecificsVisualization ||
      storyPartsEspecificsAlcance ||
      result.includes("story") ||
      result.includes("stories") ||
      ((result.includes("interacoes") || result.includes("interactions")) &&
        (result.includes("com") || result.includes("with")) &&
        result.includes("stories")) ||
      ((result.includes("proximo") || result.includes("next")) &&
        result.includes("story")) ||
      ((result.includes("toques") || result.includes("taps")) &&
        (result.includes("em") || result.includes("on")) &&
        (result.includes("figurinhas") || result.includes("stickers")))
    ) {
      extractedInfo.Plataforma = "Instagram";
      extractedInfo.Formato = "Story";

      // if (!result.includes('avanco') ||
      //     (!result.includes('atividade') && !result.includes('do') && !result.includes('perfil')) ||
      //     (!result.includes('visao') && !result.includes('geral')) ||
      //     !result.includes('respostas')) {
      //     extractedInfo.print_cortado = true
      // }

      // Verificação de print cortado
      if (
        (!result.includes("avanco") && !result.includes("advance")) ||
        (!result.includes("atividade") &&
          !result.includes("activity") &&
          !result.includes("do") &&
          !result.includes("of") &&
          !result.includes("perfil") &&
          !result.includes("profile")) ||
        (!result.includes("visao") &&
          !result.includes("overview") &&
          !result.includes("geral") &&
          !result.includes("general")) ||
        (!result.includes("respostas") && !result.includes("replies"))
      ) {
        extractedInfo.print_cortado = true;
      }
      // Extrair outros dados específicos do Story
    } else if (
      result.includes("insights") &&
      ((result.includes("da") && result.includes("publicacao")) ||
        result.includes("dapublicao") ||
        result.includes("publicao")) &&
      !result.includes("reacoes")
    ) {
      extractedInfo.Plataforma = "Instagram";
      extractedInfo.Formato = "Feed";

      if (
        (!result.includes("contas") &&
          !result.includes("com") &&
          !result.includes("engajamento")) ||
        !result.includes("impressoes") ||
        (!result.includes("interacoes") &&
          !result.includes("com") &&
          !result.includes("publicacoes")) ||
        (!result.includes("visitas") &&
          !result.includes("ao") &&
          !result.includes("perfil")) ||
        !result.includes("anuncio")
      ) {
        extractedInfo.print_cortado = true;
      }

      // Extrair outros dados específicos do Feed
    } else if (
      result.includes("atividade") &&
      (result.includes("do") || result.includes("da")) &&
      (result.includes("tweet") || result.includes("post"))
    ) {
      extractedInfo.Plataforma = "Twitter";
      extractedInfo.Formato = "Tweet";
      // Extrair outros dados específicos do Twitter
    } else if (
      result.includes("insights") &&
      result.includes("da") &&
      result.includes("publicacao") &&
      result.includes("reacoes")
    ) {
      extractedInfo.Plataforma = "Facebook";
      extractedInfo.Formato = "Post";
    }
    // Extrair outros dados específicos do TikTok
    else if (
      ((result.includes("analise") || result.includes("anlise")) &&
        result.includes("de") &&
        (result.includes("video") || result.includes("vdeo"))) ||
      (result.includes("total") &&
        result.includes("de") &&
        result.includes("espectadores"))
    ) {
      extractedInfo.Plataforma = "TikTok";
      extractedInfo.Formato = "Tiktok";

      if (
        (!result.includes("visualizacoes") &&
          !result.includes("de") &&
          !result.includes("video")) ||
        (!result.includes("localizacoes") && !result.includes("i")) ||
        (!result.includes("principais") && !result.includes("palavras")) ||
        !result.includes("genero")
      ) {
        extractedInfo.print_cortado = true;
      }
    } else if (
      (result.includes("conteudo") &&
        result.includes("do") &&
        result.includes("canal")) ||
      (result.includes("painel") &&
        result.includes("do") &&
        result.includes("canal")) ||
      result.includes("studio") ||
      result.includes("ganhos") ||
      result.includes("youtube")
    ) {
      extractedInfo.Plataforma = "Youtube";
      extractedInfo.Formato = "Vídeo";

      if (
        !result.includes("visualizacoes") ||
        (!result.includes("duracao") &&
          !result.includes("media") &&
          !result.includes("da") &&
          !result.includes("visualizacao")) ||
        (!result.includes("expectadores") && !result.includes("unicos"))
      ) {
        extractedInfo.print_cortado = true;
      }
    }

    return extractedInfo;
  };

  const handleSendPlanilhaEmail = async (textDataIds: any) => {
    try {
      const response: AxiosResponse<any> = await api.post(
        `/filesData/send-planilha-email`,
        { textDataIds },
        {
          onUploadProgress: (event: AxiosProgressEvent) => {
            if (event.total) {
              let progress: number = Math.round(
                (event.loaded * 100) / event.total
              );

              setMessageProgress({
                message: `Enviando Planilha por e-mail ${progress}% ... `,
                progress,
              });

              console.log(`está ${progress}% carregada... `);

              console.log(`event.loaded `, event.loaded);
              console.log(`event.total `, event.total);
            } else {
              console.log(event);
            }
          },
        }
      );

      const { data } = response;
      if (!data?.success) {
        return false;
      }

      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const handleAddFile = async (files: File[]) => {
    setLoading(true);
    try {
      const fileWithPreview = files.map((file) => ({
        file,
        fileId: generateRandomId(),
        preview: URL.createObjectURL(file),
        selected: false,
        influencer: "",
        campaign: "",
        followersNumber: "",
        plataform: "",
        format: "",
        type: "",
        marca_cliente: "",
        groupKey: "",
        groupKeyColor: "",
        print_cortado: false,
        data_publicacao: null,
      }));

      const { processedFiles, isHavePrintCortado } = await handleProcessFiles(
        fileWithPreview
      );

      if (isHavePrintCortado) {
        setAlertData({
          active: true,
          title: "Atenção!",
          message:
            'Alguns arquivos selecionados, não possuem a imagem completa, e possívelmente são prints "cortados". Por favor, ultilize o agrupamento de arquivos, para juntar os arquivos em uma mesma linha de excel.',
          type: "info",
        });
      }

      // Atualizar o estado de newFiles com os arquivos processados
      setNewFiles((prevFiles) => [...prevFiles, ...processedFiles]);
      setShowNewFiles(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const checkGroupValidation = () => {
    let success = true;
    for (let file of newFiles) {
      if (file.print_cortado && !file.groupKey) {
        success = false;
        break;
      }
    }

    return success;
  };

  const checkValidation = () => {
    let success = true;
    for (let file of newFiles) {
      const fileData = file.file;

      if (!file.format) {
        setAlertData({
          active: true,
          title: "Você tem arquivos sem formato preenchido!",
          message: `Por favor, analíse o arquivo: (${fileData.name}). Está sem formato preenchido.`,
          type: "info",
        });

        setFileSelected(file.fileId);
        setShowFormFiles(true);
        success = false;
        break;
      }

      if (!file.plataform) {
        setAlertData({
          active: true,
          title: "Você tem arquivos sem plataforma preenchida!",
          message: `Por favor, analíse o arquivo: (${file.file.name}). Está sem plataforma preenchida.`,
          type: "info",
        });

        setFileSelected(file.fileId);
        setShowFormFiles(true);
        success = false;
        break;
      }

      if (!file.influencer || file.influencer == "") {
        setAlertData({
          active: true,
          title: "Você tem arquivos sem influêncer preenchido!",
          message: `Por favor, analíse o arquivo: (${file.file.name}). Está sem influêncer preenchido.`,
          type: "info",
        });

        setFileSelected(file.fileId);
        setShowFormFiles(true);
        success = false;
        break;
      }

      if (!file.followersNumber) {
        setAlertData({
          active: true,
          title: "Você tem arquivos sem preenchimento!",
          message: `Por favor, analíse o arquivo: (${file.file.name}). Está sem número de seguidores preenchidos.`,
          type: "info",
        });

        setFileSelected(file.fileId);
        setShowFormFiles(true);
        success = false;
        break;
      }
    }

    return success;
  };

  const handleFileUpload = async () => {
    if (checkValidation()) {
      setLoadingData(true);
      setUploadProgress({});

      let textDataIds: string[] = [];

      try {
        let ok = true;
        if (newFiles.length > 0) {
          for (let file of newFiles) {
            let query = `?userId=${userData._id}`;
            if (file.campaign) query += `&campaign=${file.campaign}`;
            if (file.followersNumber)
              query += `&followersNumber=${file.followersNumber}`;
            if (file.format) query += `&format=${file.format}`;
            if (file.influencer) query += `&influencer=${file.influencer}`;
            if (file.plataform) query += `&plataform=${file.plataform}`;
            if (file.type) query += `&type=${file.type}`;
            if (file.groupKey) query += `&groupKey=${file.groupKey}`;
            if (file.marca_cliente)
              query += `&marca_cliente=${file.marca_cliente}`;
            if (file.data_publicacao)
              query += `&data_publicacao=${file.data_publicacao}`;

            const fileData = file.file;
            const fileName = fileData?.name;
            const formData = new FormData();
            formData?.append("file", fileData, fileName);

            const response: AxiosResponse<any> = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/file/upload${query}`,
              formData,
              {
                onUploadProgress: (event: AxiosProgressEvent) => {
                  if (event.total) {
                    let progress: number = Math.round(
                      (event.loaded * 100) / event.total
                    );

                    setMessageProgress({
                      message: `Carregando arquivo ${fileName} ${progress}% ... `,
                      progress,
                    });

                    console.log(
                      `A imagem ${fileName} está ${progress}% carregada... `
                    );
                  } else {
                    console.log(event);
                  }
                },
              }
            );
            const { data } = response;
            if (!data?.success) ok = false;

            if (data?.textDataId) {
              const textId = data?.textDataId;
              if (!textDataIds.includes(textId)) {
                textDataIds.push(textId);
              }
            }
          }

          if (!ok) {
            setAlertData({
              active: true,
              title: "Ocorreu um erro ao enviar arquivos.",
              message:
                "Tente novamente ou entre em contato conosco para obter suporte.",
              type: "error",
            });
            return false;
          }

          const sendEmail = await handleSendPlanilhaEmail(textDataIds);

          if (sendEmail) {
            setAlertData({
              active: true,
              title: "Arquivos enviados e processados!",
              message:
                "Os arquivos foram enviados, e estão sendo processados. Assim que for finalizado, você será avisado por e-mail.",
              type: "success",
            });

            setNewFiles([]);
            return true;
          } else {
            setAlertData({
              active: true,
              title: "Ocorreu um erro ao enviar arquivos.",
              message:
                "Tente novamente ou entre em contato conosco para obter suporte.",
              type: "error",
            });
            return false;
          }
        } else {
          return false;
        }
      } catch (error) {
        console.error("Erro no upload:", error);
        return false;
      } finally {
        setLoadingData(false);
      }
    } else {
      return false;
    }
  };

  const handleCheckboxChange = useCallback((index: number, active: boolean) => {
    setNewFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles[index].selected = active;
      return updatedFiles;
    });
  }, []);

  const getRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .toUpperCase();
    return `#${randomColor.padStart(6, "0")}`; // Garante que a cor tenha sempre 6 caracteres
  };

  const handleAllSelected = () => {
    const filesLenght = newFiles?.length;
    const filesSelectedLenght = newFiles?.filter(
      (file) => file.selected
    )?.length;

    const updatedFiles = newFiles.map((file) => {
      const selected = filesLenght !== filesSelectedLenght;
      return { ...file, selected };
    });

    setNewFiles(updatedFiles);
  };

  const handleGroupFiles = () => {
    try {
      setLoading(true);

      const selectedFiles = newFiles.filter((file) => file.selected);
      if (selectedFiles.length > 1) {
        const groupKey = generateRandomId();
        const groupKeyColor = getRandomColor();

        const updatedFiles = newFiles.map((file) => {
          if (file.selected) {
            return { ...file, groupKey, groupKeyColor, selected: false };
          }
          return file;
        });
        setNewFiles(updatedFiles);
        // setShowGroupFiles(false)

        setAlertData({
          active: true,
          title: "Agrupamento Salvo!",
          message:
            "Os arquivos foram agrupados na mesma linha. \n (O grupo se diferencia por cor)",
          type: "success",
        });
      } else {
        setAlertData({
          active: true,
          title: "Atenção!",
          message: "Selecione pelo menos dois arquivos para agrupar.",
          type: "alert",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromGroup = (fileId: string) => {
    setNewFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.fileId === fileId
          ? { ...file, groupKey: "", groupKeyColor: "" }
          : file
      )
    );
  };

  return (
    <div className={`relative`}>
      {loadingData &&
        messageProgress && ( // Mostra apenas se estiver carregando e se houver um arquivo atual
          <div className="absolute w-full flex flex-col items-center justify-center h-screen">
            {/* <!-- Texto de carregamento --> */}
            <div className="text-lg font-semibold text-gray-700 mb-4 justify-center text-center">
              Carregando...
              <div className="text-sm text-gray-700 mb-1 justify-center text-center">
                {messageProgress.message}
              </div>
            </div>

            {/* <!-- Animação de barra de progresso --> */}
            <div className="relative w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                style={{ width: `${messageProgress.progress || 0}%` }} // Atualiza a largura da barra.
              ></div>
            </div>

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
        )}

      <div>
        {newFiles.length === 0 ? (
          <div className="flex w-full h-full flex-col gap-6">
            <div className="flex w-full justify-center">
              <h1 className="text-gray-700 font-light text-2xl text-center max-w-3xl">
                Agilize o processo e evite erros.
                <h1>
                  Faça uploads dos prints de resultados dos influenciadores.
                </h1>
              </h1>
            </div>

            <Dropzone onFileUpload={(files) => handleAddFile(files)} />
          </div>
        ) : (
          <>
            {newFiles?.filter((item) => item?.print_cortado)?.length && (
              <div className="pl-6 flex w-full pb-8">
                <div className="px-2 py-1 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-xs text-white">
                    Você possúi arquivos que podem ser prints cortados. Não
                    esqueça de agrupa-los.
                  </span>
                </div>
              </div>
            )}
            <div
              className={`pb-12 grid grid-cols-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 pl-6 max-w-[72%] ${
                (loadingData || showNewFiles) && "opacity-25"
              }`}
            >
              {newFiles.map((fileData, index) => {
                const showedDetails = fileData.fileId === fileSelected;
                return (
                  <div
                    key={index}
                    className={`border-b relative flex px-2 py-2 flex-col items-center gap-2 ${
                      showedDetails && "border-2 border-[#FFE5B5]"
                    } cursor-pointer`}
                    style={{
                      backgroundColor: fileData.selected
                        ? "#FFE5B5"
                        : fileData.groupKeyColor
                        ? fileData.groupKeyColor + "55"
                        : "#fff",
                    }}
                    onClick={(e) => {
                      if (!showGroupFiles && !showCheckboxFile) {
                        if (fileData.fileId !== fileSelected) {
                          setFileSelected(fileData.fileId);
                          setShowFormFiles(true);
                        } else {
                          setFileSelected("");
                          setShowFormFiles(false);
                        }
                      }
                    }}
                  >
                    <div className="absolute top-2 right-2 flex items-center gap-2">
                      {fileData.groupKey && (
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFromGroup(fileData.fileId);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-4 w-4 mr-1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          Remover do grupo
                        </button>
                      )}

                      {!showGroupFiles && !showCheckboxFile && (
                        <button
                          className="flex items-center"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowFormFiles(false);
                            setNewFiles((prevFiles) =>
                              prevFiles.filter((_, i) => i !== index)
                            );
                            URL.revokeObjectURL(fileData.preview);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 bg-red-600 text-white rounded-full px-1 py-1 hover:bg-red-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      )}
                    </div>

                    {showedDetails && (
                      <div className="absolute top-[-30px] left-[-5px] px-2 py-2 bg-primary rounded-md flex items-center justify-center">
                        <span className="text-xs text-white">Selecionado</span>
                      </div>
                    )}

                    <div className="cursor-pointer w-full flex justify-between gap-2 align-center pb-4 px-2 py-2">
                      {(showCheckboxFile || showGroupFiles) && (
                        <div className="flex items-center h-5">
                          <input
                            id={`file-checkbox-${index}`}
                            type="checkbox"
                            checked={fileData.selected}
                            onChange={(e) => {
                              handleCheckboxChange(index, e.target.checked);
                            }}
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                          />
                        </div>
                      )}

                      <span className="text-gray-600 text-sm max-w-36 truncate whitespace-nowrap">
                        {fileData?.file?.name}
                      </span>
                    </div>

                    {fileData?.print_cortado && (
                      <div className="flex w-full">
                        <div className="px-2 py-1 border border-primary rounded-md flex items-center justify-center">
                          <span className="text-xs text-primary">
                            Possível print cortado
                          </span>
                        </div>
                      </div>
                    )}

                    <img
                      src={fileData.preview}
                      className="w-40 md:w-56  max-h-64 object-cover"
                      alt={`Preview ${index}`}
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {newFiles.length > 0 &&
      showFormFiles &&
      !loadingData &&
      (fileSelected ||
        showCheckboxFile ||
        newFiles.filter((item) => item.selected).length > 0) ? (
        <FormDetailsFile
          showCheckboxFile={showCheckboxFile}
          handleCancel={() => {
            setFileSelected("");
            setShowFormFiles(false);
            setShowCheckboxFile(false);
          }}
          fileSelected={
            newFiles.filter((item) => item.fileId === fileSelected)[0] ||
            newFiles.filter((item) => item.selected)[0]
          }
          handleChange={(name, value) => {
            const filesSelected =
              newFiles.filter((item) => item.selected).length > 0;

            if (showCheckboxFile && filesSelected) {
              setNewFiles((prevFiles) => {
                return prevFiles.map((file) =>
                  file.selected ? { ...file, [name]: value } : file
                );
              });
            } else {
              setNewFiles((prevFiles) => {
                return prevFiles.map((file) =>
                  file.fileId === fileSelected
                    ? { ...file, [name]: value }
                    : file
                );
              });
            }
          }}
        />
      ) : (
        newFiles.length == 0 && (
          <div
            className={`flex flex-col gap-2 px-7 py-8 rounder-pill bg-white shadow rounded-lg absolute right-0 top-20 max-w-96 ${
              (loadingData || showNewFiles) && "opacity-25"
            }`}
          >
            <span className="fw-bold text-gray-800 text-lg pb-4">
              Passo a Passo
            </span>
            <li className="text-slate-600">
              Salve os prints das publicações em seu computador
            </li>
            <li className="text-slate-600">Suba os prints para a ferramenta</li>
            <li className="text-slate-600">
              A ferramenta aceita prints estendidos (quando pegamos todas as
              informações através de print scroll) ou prints "quebrados" quando
              os resultados da mesma publicação está em mais de um print
            </li>
            <li className="text-slate-600">
              Junte prints "quebrados" das mesma publicações pelo agrupamento
            </li>
            <li className="text-slate-600">
              Adicione o influenciador e número de seguidores nos prints
            </li>
            <li className="text-slate-600">
              Você pode adicionar vários de uma vez pelo botão "Selecionar
              Múltiplos"
            </li>
            <li className="text-slate-600">Depois disso é só enviar!</li>
          </div>
        )
      )}

      {newFiles.length > 0 && !loadingData && (
        <div className="flex w-full justify-center items-center">
          <Footer
            setShowCheckboxFile={setShowCheckboxFile}
            showFormFiles={showFormFiles}
            showCheckboxFile={showCheckboxFile}
            handleUpload={async () => {
              if (checkGroupValidation()) {
                await handleFileUpload();
              } else {
                setIsModalOpen(true);
              }
            }}
            handleCancel={() => {
              setNewFiles([]);
              setShowFormFiles(false);
            }}
            setShowNewFiles={setShowNewFiles}
            setShowGroupFiles={setShowGroupFiles}
            setShowFormFiles={setShowFormFiles}
            showGroupFiles={showGroupFiles}
            handleGroupFiles={handleGroupFiles}
            handleAllSelected={handleAllSelected}
          />
        </div>
      )}

      {showNewFiles && (
        <div className="flex w-full absolute justify-center item-center top-20">
          <div
            className="flex w-full flex-col gap-6 justify-center item-center"
            ref={filesDrop}
          >
            <div className="flex w-full justify-center item-center">
              <h1 className="text-gray-700 font-light text-2xl text-center max-w-3xl">
                Agilize o processo e evite erros.
                <h1>
                  Faça uploads dos prints de resultados dos influenciadores.
                </h1>
              </h1>
            </div>

            <Dropzone onFileUpload={(files) => handleAddFile(files)} />
          </div>
        </div>
      )}

      <Modal
        text={`Você possui prints "possívelmente" cortados e sem "agrupamento". Tem certeza que deseja prosseguir?`}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => handleFileUpload()}
      />
    </div>
  );
};

export default UploadFiles;
