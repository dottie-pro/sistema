import { generateRandomId } from "@/helpers";
import { api } from "@/helpers/api";
import {
  extractInfoFromText,
  processExtractedText,
} from "@/helpers/platform_identifier";
import { useState } from "react";

export type PostFiles = {
  id: string;
  file: File;
  preview: string;
};

export type Story = {
  id: string;
  files: PostFiles[];
};

export type PostType = "post" | "story";

export type Post = {
  id: string;
  influencer: string;
  platform: string;
  format: string;
  published_at: Date | null;
  type: string;
  campaign: string;
  marca_cliente: string;
  followers_number: number;
  groupKey: string;
  postType: PostType;
} & (
  | { postType: "post"; files: PostFiles[] }
  | { postType: "story"; stories: Story[] }
);

export const useUploadFiles = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const uploadAndCheckFiles = async (files: File[]) => {
    const filesTextPromises = files.map(async (file) => {
      const formData = new FormData();
      formData?.append("file", file, file?.name);
      const processTextFile = await api.post(
        `/file/upload-and-process-text`,
        formData
      );

      if (processTextFile.data.success) {
        const extractedInfo = await processExtractedText(
          processTextFile.data.extractedFormattedText
        );
        return extractedInfo;
      }
      return null;
    });
    const filesText = await Promise.all(filesTextPromises);
    return filesText;
  };

  const handleAddPost = () => {
    setPosts((posts) => {
      const postsWithAdded: Post[] = [
        ...posts,
        {
          id: generateRandomId(),
          influencer: "",
          platform: "",
          format: "",
          published_at: null,
          type: "",
          campaign: "",
          marca_cliente: "",
          followers_number: 0,
          groupKey: "",
          postType: "story",
          // files: [],
          stories: [],
        },
      ];
      return postsWithAdded;
    });
  };

  const handleAddStories = (postId: string) => {
    setPosts((posts) => {
      const postIndex = posts.findIndex((p) => p.id === postId);
      if (postIndex === -1) return posts;
      const post = posts[postIndex];
      if (post.postType !== "story") return posts;
      const updatedPost = {
        ...post,
        stories: [...post.stories, { id: generateRandomId(), files: [] }],
      };
      const updatedPosts = [...posts];
      updatedPosts[postIndex] = updatedPost;
      return updatedPosts;
    });
  };

  const handleRemoveStories = (postId: string, storyId: string) => {
    setPosts((posts) => {
      const postIndex = posts.findIndex((p) => p.id === postId);
      if (postIndex === -1) return posts;
      const post = posts[postIndex];
      if (post.postType !== "story") return posts;

      const updatedPost = {
        ...post,
        stories: post.stories.filter((s) => s.id !== storyId),
      };
      const updatedPosts = [...posts];
      updatedPosts[postIndex] = updatedPost;
      return updatedPosts;
    });
  };

  const handleEditPost = (
    postId: string,
    field: string,
    value: string | Date | null
  ) => {
    setPosts((posts) => {
      const postIndex = posts.findIndex((p) => p.id === postId);
      if (postIndex === -1) return posts;
      const post = posts[postIndex];
      const updatedPost = {
        ...post,
        [field]: value,
      };
      const updatedPosts = [...posts];
      updatedPosts[postIndex] = updatedPost;
      return updatedPosts;
    });
  };

  const handleAddFiles = async (postId: string, files: File[]) => {
    const post = posts.find((p) => p.id === postId);

    if (post?.postType === "post") {
      if (post?.files.length === 0) {
        const filesText = await uploadAndCheckFiles(files);
      }
    }

    setPosts((posts) => {
      const postIndex = posts.findIndex((p) => p.id === postId);

      if (postIndex === -1) return posts;
      const post = posts[postIndex];
      if (post.postType === "post") {
        const updatedPost = {
          ...post,
          files: [
            ...post.files,
            ...files.map((f) => ({
              id: generateRandomId(),
              file: f,
              preview: URL.createObjectURL(f),
            })),
          ],
        };
        const updatedPosts = [...posts];
        updatedPosts[postIndex] = updatedPost;
        return updatedPosts;
      }
      return posts;
    });
  };

  const handleAddStoriesFiles = (
    postId: string,
    storyId: string,
    files: File[]
  ) => {
    setPosts((posts) => {
      const postIndex = posts.findIndex((p) => p.id === postId);
      if (postIndex === -1) return posts;

      const post = posts[postIndex];
      if (post.postType !== "story") return posts;

      const storyIndex = post.stories.findIndex((s) => s.id === storyId);
      if (storyIndex === -1) return posts;

      const updatedPost = {
        ...post,
        stories: post.stories.map((s) =>
          s.id === storyId
            ? {
                ...s,
                files: [
                  ...s.files,
                  ...files.map((f) => ({
                    id: generateRandomId(),
                    file: f,
                    preview: URL.createObjectURL(f),
                  })),
                ],
              }
            : s
        ),
      };

      const updatedPosts = [...posts];
      updatedPosts[postIndex] = updatedPost;

      return updatedPosts;
    });
  };

  const handleRemovePost = (postId: string) => {
    setPosts((posts) => posts.filter((p) => p.id !== postId));
  };

  const handleRemoveFileFromPost = (postId: string, fileId: string) => {
    setPosts((posts) => {
      const postIndex = posts.findIndex((p) => p.id === postId);
      if (postIndex === -1) return posts;

      const post = posts[postIndex];
      if (post.postType === "post") {
        const updatedPost = {
          ...post,
          files: post.files.filter((f) => f.id !== fileId),
        };
        const updatedPosts = [...posts];
        updatedPosts[postIndex] = updatedPost;
        return updatedPosts;
      }

      return posts;
    });
  };

  const handleRemoveFileFromStory = (
    postId: string,
    storyId: string,
    fileId: string
  ) => {
    setPosts((posts) => {
      const postIndex = posts.findIndex((p) => p.id === postId);
      if (postIndex === -1) return posts;

      const post = posts[postIndex];
      if (post.postType !== "story") return posts;

      const storyIndex = post.stories.findIndex((s) => s.id === storyId);
      if (storyIndex === -1) return posts;

      const updatedPost = {
        ...post,
        stories: post.stories.map((s) =>
          s.id === storyId
            ? { ...s, files: s.files.filter((f) => f.id !== fileId) }
            : s
        ),
      };
      const updatedPosts = [...posts];
      updatedPosts[postIndex] = updatedPost;
      return updatedPosts;
    });
  };

  return {
    posts,
    handleAddPost,
    handleAddStories,
    handleRemoveStories,
    handleRemovePost,
    handleRemoveFileFromPost,
    handleRemoveFileFromStory,
    handleAddFiles,
    handleAddStoriesFiles,
    handleEditPost,
  };
};
