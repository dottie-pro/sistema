import React from 'react';
import { useDropzone } from 'react-dropzone';

interface DropzoneProps {
  onFileUpload: (file: File[]) => void;
}

const DropzoneData: React.FC<DropzoneProps> = ({ onFileUpload }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'application/pdf': ['.pdf'],
    },
    onDrop: (acceptedFiles) => {
      onFileUpload(acceptedFiles); // Passa os arquivos aceitos para o componente pai
    },
    multiple: true, // Permite upload de múltiplos arquivos
  });

  return (
    <div {...getRootProps()} className="flex items-center justify-center cursor-pointer">
      {/* O input precisa estar dentro da área clicável */}
      <input {...getInputProps()} className="hidden" />
      <div className="flex flex-col items-center px-2 py-2 justify-center h-64 border-2 border-gray-300 border-dashed rounded-full bg-gray-50">
        <div className="flex flex-col items-center justify-center px-2 py-2 max-w-60 gap-2">
          <img
            src="./icons/upload-icon.png"
            className="h-24 h-24"
            alt="upload-logo"
          />
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">
            <span className="font-semibold">Arrastar e soltar arquivos ou clicar para procurar</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
      </div>
    </div>
  );
};

export default DropzoneData;
