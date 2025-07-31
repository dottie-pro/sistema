import { useAppContext } from "@/context/AppContext";
import { PayingNotPermission } from "@/components/payingNotPermissions";
import { Button } from "@/components/button/Button";
import { useState } from "react";
import { AddPostModal } from "./components/AddPostModal/AddPostModal";
import { useUploadFiles } from "./hooks/useUploadFiles";
import { PostCard } from "./components/PostCard/PostCard";

const UploadFilesNew = () => {
  const { userData } = useAppContext();
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);
  const {
    posts,
    handleAddPost,
    handleAddStories,
    handleRemovePost,
    handleRemoveFileFromPost,
    handleAddFiles,
    handleAddStoriesFiles,
    handleRemoveFileFromStory,
    handleRemoveStories,
    handleEditPost,
  } = useUploadFiles();

  return (
    <>
      <AddPostModal
        isOpen={isAddPostModalOpen}
        setIsOpen={setIsAddPostModalOpen}
        addPost={handleAddPost}
      />
      <div className={`relative`}>
        <PayingNotPermission
          isPayingPermission={
            userData?.paying || userData?.remaining_credits > 0
          }
          userId={userData?._id}
        />

        <div className="flex w-full flex-col gap-6">
          <div className="flex w-full justify-center">
            <h1 className="text-gray-700 font-light text-2xl text-center">
              <h1>Upload de arquivos</h1>
            </h1>
          </div>
        </div>

        <div className="flex flex-col bg-white rounded-lg mt-4 p-4 mx-8">
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                handleAddFiles={handleAddFiles}
                handleAddStoriesFiles={handleAddStoriesFiles}
                handleRemoveFileFromPost={handleRemoveFileFromPost}
                handleRemovePost={handleRemovePost}
                handleRemoveFileFromStory={handleRemoveFileFromStory}
                handleAddStories={handleAddStories}
                handleRemoveStories={handleRemoveStories}
                handleEditPost={handleEditPost}
              />
            ))}
          </div>
          <Button text="Adicionar publicação" onClick={() => handleAddPost()} />
        </div>
      </div>
    </>
  );
};

export default UploadFilesNew;
