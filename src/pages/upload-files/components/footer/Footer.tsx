import { Tooltip } from "@/components";
import { Button } from "@/components/button/Button";
import { useAppContext } from "@/context/AppContext";
import React, { SetStateAction } from "react";



interface FormsProps {
    handleUpload: () => void
    handleCancel: () => void
    showFormFiles: boolean;
    setShowNewFiles: React.Dispatch<SetStateAction<boolean>>
    setShowGroupFiles: React.Dispatch<SetStateAction<boolean>>
    setShowCheckboxFile: React.Dispatch<SetStateAction<boolean>>
    setShowFormFiles: React.Dispatch<SetStateAction<boolean>>
    showCheckboxFile: boolean
    showGroupFiles: boolean
    handleGroupFiles: () => void
    handleAllSelected: () => void
}


const Footer: React.FC<FormsProps> = ({
    handleUpload,
    showFormFiles,
    handleCancel,
    setShowNewFiles,
    setShowGroupFiles,
    setShowCheckboxFile,
    setShowFormFiles,
    showCheckboxFile,
    showGroupFiles,
    handleGroupFiles,
    handleAllSelected
}) => {
    const { loading } = useAppContext()

    return (
        <div className={`flex transition-all gap-2 justify-center items-center px-12 py-2 rounded-pill bg-gray-700 shadow rounded-lg fixed ${showFormFiles && 'left-20'}  bottom-4`}>

            {(!showCheckboxFile && !showGroupFiles) && <div className="flex items-center justify-center gap-3 border py-2.5 px-5 rounded-lg cursor-pointer" onClick={() => setShowNewFiles(true)}>
                {!showFormFiles && <span className="text-white">Carregar mais arquivos</span>}
                <img
                    src="./icons/upload-icon.png"
                    className="h-6 h-6"
                    alt="upload-logo"
                />
            </div>}



            {!showGroupFiles &&
                <Tooltip title="Selecione mais de uma arquivo do mesmo influenciador para poder inserir as mesmas informações em massa">
                    <div className="flex items-center justify-center gap-3 border py-2.5 px-5 rounded-lg cursor-pointer"
                        onClick={() => {
                            setShowCheckboxFile(!showCheckboxFile)
                            setShowFormFiles(!showCheckboxFile)
                        }}>
                        {!showFormFiles && <span className="text-white">{showCheckboxFile ? 'Cancelar Multiplos' : 'Selecionar Multiplos'}</span>}
                        {!showCheckboxFile ?
                            <img
                                src="./icons/checkbox.png"
                                className="h-6 h-6"
                                alt="upload-logo"
                            />
                            :
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
                        }
                    </div>
                </Tooltip>
            }

            {showCheckboxFile && <div className="flex items-center justify-center gap-3 border py-2.5 px-5 rounded-lg cursor-pointer"
                onClick={() => handleAllSelected()}>
                <span className="text-white">Selecionar Todos</span>
                <img
                    src="./icons/checkbox.png"
                    className="h-6 h-6"
                    alt="upload-logo"
                />
            </div>}
            {!showCheckboxFile &&
                <Tooltip title={!showGroupFiles ?
                    `Quando o print for quebrado, agrupe os arquivos para unir as informações em uma mesma linha de excel.` : ''}>

                    <div className="flex items-center justify-center gap-3 border py-2.5 px-5 rounded-lg cursor-pointer" onClick={() => setShowGroupFiles(!showGroupFiles)}>
                        {!showFormFiles && <span className="text-white">{showGroupFiles ? 'Finalizar Agrupamento' : 'Agrupar Arquivos'}</span>}
                        {showGroupFiles ?
                            (
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
                            ) : (
                                <img
                                    src="./icons/stack.png"
                                    className="h-6 h-6"
                                    alt="upload-logo"
                                />
                            )}
                    </div>
                </Tooltip>}

            {showGroupFiles && <div className="flex items-center justify-center gap-3 border py-2.5 px-5 rounded-lg cursor-pointer"
                onClick={() => handleAllSelected()}>
                <span className="text-white">Selecionar Todos</span>
                <img
                    src="./icons/checkbox.png"
                    className="h-6 h-6"
                    alt="upload-logo"
                />
            </div>}

            {(!showCheckboxFile && showGroupFiles) && <Button text="Agrupar" isLoading={loading} arrowIcon onClick={handleGroupFiles} />}
            {(!showGroupFiles && !showCheckboxFile) && <Button deleteButton text="Cancelar" isLoading={loading} onClick={handleCancel} />}
            {(!showGroupFiles && !showCheckboxFile) && <Button text="Enviar Arquivos" isLoading={loading} arrowIcon onClick={handleUpload} />}
        </div>
    );
};

export default Footer;
