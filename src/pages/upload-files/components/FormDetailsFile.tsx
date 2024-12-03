import { Dropdown } from "@/components";
import { Button } from "@/components/button/Button";
import { useAppContext } from "@/context/AppContext";
import React from "react";
import { FileWithPreview } from "..";



interface FormsProps {
    handleCancel: () => void
    fileSelected: FileWithPreview
    handleChange: (name: string, value: string) => void
    showCheckboxFile: boolean
}


const FormDetailsFile: React.FC<FormsProps> = ({
    handleCancel,
    fileSelected,
    handleChange,
    showCheckboxFile
}) => {
    const { loading } = useAppContext()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e.target.name, e.target.value)
    }

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

    const type = [
        { label: "Alimentação", value: "alimentação" },
        { label: "Ofertas", value: "Ofertas" },
        { label: "Divulgação de produtos", value: "Divulgação de produtos" },
    ];


    return (
        <div className="flex flex-col gap-2 rounded-pill bg-white shadow rounded-lg fixed right-0 top-32 w-96">

            <div className="bg-gray-200 flex px-2 w-full gap-2 items-center">
                <img
                    src={fileSelected?.preview}
                    className="w-24 max-h-24 object-cover"
                    alt={`Preview ${fileSelected?.fileId}`}
                />
                <span className="text-xs text-gray-700">{fileSelected?.file.name}</span>
            </div>

            <div className="flex flex-col px-7 py-4 gap-2 overflow-y-auto max-h-[63vh] lg:max-h-[63vh]">

                <div className="mb-3">
                    <label htmlFor="influencerEmail" className="block mb-2 text-sm font-medium text-gray-900">
                        Influenciador*
                    </label>
                    <input
                        type="email"
                        name="influencer"
                        value={fileSelected?.influencer}
                        onChange={onChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="@criador-de-conteúdo"
                        required
                    />
                </div>

                <div className={`mb-3 flex gap-4 items-center ${showCheckboxFile && 'opacity-25'}`}>
                    <label htmlFor="platform" className="block text-sm font-medium text-gray-900">
                        Plataforma*
                    </label>
                    <Dropdown
                        disabled={showCheckboxFile}
                        title="Selecione uma opção"
                        options={plataform}
                        onSelect={(value) => handleChange('plataform', value)}
                        value={fileSelected?.plataform}
                    />
                </div>

                <div className={`mb-3 flex gap-4 items-center ${showCheckboxFile && 'opacity-25'}`}>
                    <label htmlFor="format" className="block mb-2 text-sm font-medium text-gray-900">
                        Formato*
                    </label>
                    <Dropdown
                        title="Selecione uma opção"
                        disabled={showCheckboxFile}
                        options={format}
                        onSelect={(value) => handleChange('format', value)}
                        value={fileSelected?.format}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="campaign" className="block mb-2 text-sm font-medium text-gray-900">
                        Ação / campanha
                    </label>
                    <input
                        type="text"
                        name="campaign"
                        value={fileSelected?.campaign}
                        onChange={onChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="ação / campanha"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="campaign" className="block mb-2 text-sm font-medium text-gray-900">
                        Marca / Cliente
                    </label>
                    <input
                        type="text"
                        name="marca_cliente"
                        value={fileSelected?.marca_cliente}
                        onChange={onChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Marca / Cliente"
                        required
                    />
                </div>

                <div className="mb-3 items-center">
                    <label htmlFor="foodFormat" className="block mb-2 text-sm font-medium text-gray-900">
                        Categoria
                    </label>
                    <Dropdown
                        title="Selecione uma opção"
                        options={type}
                        onSelect={(value) => handleChange('type', value)}
                        value={fileSelected?.type}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="followersCount" className="block mb-2 text-sm font-medium text-gray-900">
                        Número de seguidores*
                    </label>
                    <input
                        name="followersNumber"
                        value={fileSelected?.followersNumber}
                        onChange={onChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="eX: 250.00"
                        required
                    />
                </div>

                <div className="sticky bottom-[-20px] flex w-full justify-end py-2 gap-2 bg-white">
                    {showCheckboxFile && <Button text="Salvar" isLoading={loading} onClick={handleCancel} />}
                    <Button secondary text="Fechar" isLoading={loading} onClick={handleCancel} />
                </div>

            </div>
        </div>
    );
};

export default FormDetailsFile;
