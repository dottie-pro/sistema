import { Dropdown } from "@/components/select/Select";
import { Modal } from "@/components/ui/modal";
import { useMemo, useState } from "react";
import { Post, PostType } from "../../hooks/useUploadFiles";
import { Button } from "@/components/button/Button";

type AddPostModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addPost: (type: PostType, platform: string, format: string) => void;
};

export const AddPostModal = ({
  isOpen,
  setIsOpen,
  addPost,
}: AddPostModalProps) => {
  const [platform, setPlatform] = useState<string | null>(null);
  const [format, setFormat] = useState<string | null>(null);

  const platformOptions = [
    { label: "Youtube", value: "Youtube" },
    { label: "Instagram", value: "Instagram" },
    { label: "Tiktok", value: "Tiktok" },
    { label: "Twitter", value: "Twitter" },
    { label: "Facebook", value: "Facebook" },
  ];

  const formatOptions = useMemo(() => {
    if (platform === "Instagram") {
      return [
        { label: "Feed", value: "Feed" },
        { label: "Story", value: "Story" },
        { label: "Reels", value: "Reels" },
      ];
    } else if (platform === "Youtube") {
      return [
        { label: "Video", value: "Video" },
        { label: "Short", value: "Short" },
      ];
    } else if (platform === "Tiktok") {
      return [{ label: "Reels", value: "Reels" }];
    } else if (platform === "Twitter") {
      return [{ label: "Tweet", value: "Tweet" }];
    } else if (platform === "Facebook") {
      return [{ label: "Post", value: "Post" }];
    }
    return [];
  }, [platform]);
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Adicionar publicação"
      className="w-full max-w-md"
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="platform"
          className="block text-sm font-medium text-gray-900 mt-2"
        >
          Plataforma*
        </label>
        <Dropdown
          title="Selecione uma opção"
          options={platformOptions}
          onSelect={(value) => {
            setPlatform(value);
            setFormat(null);
          }}
          value={platform}
        />

        <label
          htmlFor="format"
          className="block text-sm font-medium text-gray-900"
        >
          Formato*
        </label>
        <Dropdown
          title="Selecione uma opção"
          disabled={!platform}
          options={formatOptions}
          onSelect={(value) => setFormat(value)}
          value={format}
        />
        <div className="flex flex-row justify-end gap-2 mt-2">
          <Button text="Cancelar" onClick={() => setIsOpen(false)} />
          <Button
            disabled={!platform || !format}
            text="Adicionar"
            onClick={() => {
              if (!platform || !format) return;
              addPost(format === "Story" ? "story" : "post", platform, format);
              setPlatform(null);
              setFormat(null);
              setIsOpen(false);
            }}
          />
        </div>
      </div>
    </Modal>
  );
};
