import React from "react";
import { Button } from "../button/Button";

interface ModalProps {
    text: string;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const Modal: React.FC<ModalProps> = ({ text, isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="flex w-full h-full items-center justify-center fixed inset-0 z-40">
            {/* Fundo opaco */}
            <div className="absolute inset-0 bg-gray-800 opacity-50" onClick={onClose}></div>

            <div className="relative z-50 p-4 w-full max-w-md">
                <div className="bg-white rounded-lg shadow">
                    {/* Botão de fechar */}
                    <button
                        type="button"
                        className="absolute top-5 right-5 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                        onClick={onClose}
                    >
                        <svg className="w-3 h-3" aria-hidden="true" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13" />
                        </svg>
                        <span className="sr-only">Fechar modal</span>
                    </button>
                    
                    {/* Conteúdo do modal */}
                    <div className="p-4 md:p-5 text-center">
                        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{text}</h3>
                        
                        {/* Botões */}
                        <div className="flex gap-2 items-center justify-center">
                            <Button
                                text="Sim, Tenho certeza"
                                arrowIcon
                                onClick={() => {
                                    onConfirm(); // Executa a função de confirmação
                                    onClose();   // Fecha o modal
                                }}
                            />
                            <button
                                type="button"
                                className="py-3 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary"
                                onClick={onClose}
                            >
                                Não, cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
