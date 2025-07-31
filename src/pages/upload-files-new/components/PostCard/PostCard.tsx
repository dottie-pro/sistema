import { Button } from "@/components/button/Button";
import { Post } from "../../hooks/useUploadFiles";
import { useRef } from "react";
import { IoAddCircleOutline, IoClose, IoCloseCircle } from "react-icons/io5";
import { BiMinusCircle } from "react-icons/bi";
import { DatePicker } from "@/components/DatePicker/DatePicker";
import { Dropdown } from "@/components";

export type PostCardProps = {
  post: Post;
  handleAddFiles: (postId: string, files: File[]) => void;
  handleAddStories: (postId: string) => void;
  handleAddStoriesFiles: (
    postId: string,
    storyId: string,
    files: File[]
  ) => void;
  handleRemoveFileFromPost: (postId: string, fileId: string) => void;
  handleRemoveFileFromStory: (
    postId: string,
    storyId: string,
    fileId: string
  ) => void;
  handleRemovePost: (postId: string) => void;
  handleRemoveStories: (postId: string, storyId: string) => void;
  handleEditPost: (
    postId: string,
    field: string,
    value: string | Date | null
  ) => void;
};

export const PostCard = ({
  post,
  handleAddFiles,
  handleAddStories,
  handleAddStoriesFiles,
  handleRemoveStories,
  handleRemoveFileFromPost,
  handleRemoveFileFromStory,
  handleRemovePost,
  handleEditPost,
}: PostCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const storyFileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>(
    {}
  );

  return (
    <div className="flex flex-col p-4 bg-gray-100 rounded-lg gap-4">
      <div className="flex flex-row justify-between">
        {/* <span className="text-sm font-bold text-neutral-700">
          {post.platform} - {post.format}
        </span> */}
        <IoClose
          size={20}
          className="cursor-pointer"
          onClick={() => handleRemovePost(post.id)}
          color="black"
        />
      </div>

      {/* Post */}
      {post.postType === "post" && (
        <div className="flex flex-row gap-4">
          {post.files.map((file) => (
            <div key={file.id} className="flex justify-end">
              <div className="absolute h-0 cursor-pointer mt-[-10px] mr-[-10px]">
                <IoCloseCircle
                  color="red"
                  size={20}
                  onClick={() => handleRemoveFileFromPost(post.id, file.id)}
                />
              </div>
              <img
                src={file.preview}
                alt={file.file.name}
                className="w-32 max-h-32 object-cover"
              />
            </div>
          ))}
          <div>
            <input
              ref={fileInputRef}
              className="hidden"
              type="file"
              multiple
              accept=".jpeg,.jpg,.png,.pdf"
              onChange={(e) => {
                if (e.target.files) {
                  handleAddFiles(post.id, Array.from(e.target.files));
                }
              }}
            />
            <div
              className="flex flex-col gap-2 justify-center items-center w-32 h-32 bg-neutral-300 rounded-lg"
              onClick={() => {
                fileInputRef.current?.click();
              }}
            >
              <IoAddCircleOutline className="text-white text-sm" size={48} />
              <span className="text-white text-sm">Adicionar prints</span>
            </div>
          </div>
        </div>
      )}

      {/* Story */}
      {post.postType === "story" && (
        <>
          <div className="flex flex-col gap-4">
            {post.stories.map((story, index) => (
              <div
                key={story.id}
                className="flex flex-row gap-4 border-b border-neutral-300 pb-4"
              >
                {/* Remove story combo button */}
                {index > 0 && (
                  <div
                    className="flex flex-row justify-end gap-2 items-center w-full text-black absolute cursor-pointer h-0 ml-[-130px]"
                    onClick={() => handleRemoveStories(post.id, story.id)}
                  >
                    <BiMinusCircle
                      size={20}
                      className="cursor-pointer"
                      color="black"
                    />
                    Remover combo
                  </div>
                )}

                {/* Story files */}
                {story.files.map((file) => (
                  <div key={file.id} className="flex justify-end">
                    <div className="absolute h-0 cursor-pointer mt-[-10px] mr-[-10px]">
                      <IoCloseCircle
                        color="red"
                        size={20}
                        onClick={() =>
                          handleRemoveFileFromStory(post.id, story.id, file.id)
                        }
                      />
                    </div>
                    <img
                      src={file.preview}
                      alt={file.file.name}
                      className="w-32 max-h-32 object-cover"
                    />
                  </div>
                ))}
                <div>
                  <input
                    ref={(el) => {
                      storyFileInputRefs.current[story.id] = el;
                    }}
                    className="hidden"
                    type="file"
                    multiple
                    accept=".jpeg,.jpg,.png,.pdf"
                    onChange={(e) => {
                      if (e.target.files) {
                        handleAddStoriesFiles(
                          post.id,
                          story.id,
                          Array.from(e.target.files)
                        );
                      }
                    }}
                  />
                  <div
                    className="flex flex-col gap-2 justify-center items-center w-32 h-32 bg-neutral-300 rounded-lg"
                    onClick={() => {
                      storyFileInputRefs.current[story.id]?.click();
                    }}
                  >
                    <IoAddCircleOutline
                      className="text-white text-sm"
                      size={48}
                    />
                    <span className="text-white text-sm">Adicionar prints</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <Button
              text="Adicionar story"
              onClick={() => handleAddStories(post.id)}
            />
          </div>
        </>
      )}

      {/* Forms */}
      <div className="grid grid-cols-4 gap-4">
        <div className="mb-3">
          <label
            htmlFor="platform"
            className="block text-sm font-medium text-gray-900"
          >
            Plataforma*
          </label>
          <Dropdown
            disabled={
              post.postType === "story" ? post.stories.length > 0 : false
            }
            title="Selecione uma opção"
            options={plataform}
            onSelect={(value) => handleChange("plataform", value)}
            value={fileSelected?.plataform}
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="influencerEmail"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Influenciador*
          </label>
          <input
            type="email"
            name="influencer"
            value={post.influencer}
            onChange={(e) =>
              handleEditPost(post.id, "influencer", e.target.value)
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="@criador-de-conteúdo"
            required
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="campaign"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Ação / campanha
          </label>
          <input
            type="text"
            name="campaign"
            value={post.campaign}
            onChange={(e) =>
              handleEditPost(post.id, "campaign", e.target.value)
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="ação / campanha"
            required
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="campaign"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Marca / Cliente
          </label>
          <input
            type="text"
            name="marca_cliente"
            value={post.marca_cliente}
            onChange={(e) =>
              handleEditPost(post.id, "marca_cliente", e.target.value)
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Marca / Cliente"
            required
          />
        </div>

        <div className="mb-3 items-center">
          <label
            htmlFor="foodFormat"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Categoria
          </label>
          <input
            type="text"
            name="type"
            value={post.type}
            onChange={(e) => handleEditPost(post.id, "type", e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Categoria"
            required
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="data_publicacao"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Data de publicação
          </label>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={post.published_at}
            onChange={(date) => handleEditPost(post.id, "published_at", date)}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="followersCount"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Número de seguidores*
          </label>
          <input
            name="followers_number"
            value={post.followers_number}
            onChange={(e) =>
              handleEditPost(post.id, "followers_number", e.target.value)
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="eX: 250.00"
            required
          />
        </div>
      </div>
    </div>
  );
};
