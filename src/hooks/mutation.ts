import { trpc } from "../utils/trpc";
import { inferMutationInput } from "src/utils/trpc";
import { Tag } from "@prisma/client";
import { reloadSession } from "src/utils/auth";

const invalidateAll = (utils: any) => {
  utils.invalidateQueries(["post.getInfiniteFeed"]); //personalizowany feed
  utils.invalidateQueries(["post.getAll"]); //infinity query, tagi i na profilu
  utils.invalidateQueries(["post.getById"]); //podstrona z danym postem
  utils.invalidateQueries(["bookmarks.getAll"]); //bookmarki
};

export const useProfileMutation = () => {
  const utils = trpc.useContext();
  const mutation = trpc.useMutation(["user.update"], {
    onSuccess() {
      invalidateAll(utils);
      utils.invalidateQueries(["user.getById"]);
      reloadSession();
    },
  });

  return mutation.mutate;
};

export const useAddCommentMutation = (postId: string) => {
  const utils = trpc.useContext();
  const mutation = trpc.useMutation(["comment.add"], {
    onSuccess() {
      utils.invalidateQueries(["comment.getAllByPostId", { postId }]);
      utils.invalidateQueries(["post.getById", { postId }]);
      invalidateAll(utils);
    },
  });

  return (args: Omit<inferMutationInput<"comment.add">, "postId">) => {
    mutation.mutate({ postId, ...args });
  };
};

export const useAddPostMutation = (onSuccessCb: () => void) => {
  const utils = trpc.useContext();
  const mutation = trpc.useMutation("post.addPost", {
    onSuccess() {
      onSuccessCb();
      invalidateAll(utils);
      // utils.invalidateQueries("post.getAll");
    },
  });

  return (
    postContent: string,
    imageUrls: string[],
    tags: Tag[],
    shareParentId?: string
  ) =>
    mutation.mutate({
      tags: tags,
      content: postContent,
      images: imageUrls.length
        ? imageUrls.map((url) => ({ imageAlt: "alt", imageUrl: url }))
        : null,
      shareParentId: shareParentId,
    });
};

export const useToggleCommentLikeMutation = (postId: string) => {
  const utils = trpc.useContext();
  const mutation = trpc.useMutation(["comment.toggleLike"], {
    onSuccess() {
      utils.invalidateQueries(["comment.getAllByPostId", { postId }]);
    },
  });
  return mutation.mutate;
};

export const useDeleteCommentMutation = (postId: string) => {
  const utils = trpc.useContext();
  const mutation = trpc.useMutation(["comment.delete"], {
    onSuccess() {
      utils.invalidateQueries(["comment.getAllByPostId", { postId }]);
      // utils.invalidateQueries(["comment.getAllByPostId"]);
      utils.invalidateQueries(["post.getById", { postId }]);
      // invalidateAll(utils);
    },
  });
  return mutation.mutate;
};

export const useUpdateCommentMutation = (postId: string) => {
  const utils = trpc.useContext();
  const mutation = trpc.useMutation(["comment.update"], {
    onSuccess() {
      utils.invalidateQueries(["comment.getAllByPostId", { postId }]);
    },
  });
  return mutation.mutate;
};

export const useToggleFollowUserMutation = (userId: string, myId: string) => {
  const utils = trpc.useContext();
  const mutation = trpc.useMutation("user.followUser", {
    onSuccess() {
      utils.invalidateQueries(["user.getById", { userId }]);
      utils.invalidateQueries(["user.getById", { userId: myId }]);
      utils.invalidateQueries(["post.getInfiniteFeed"]);
    },
  });
  return () => mutation.mutate({ userId });
};

export const useToggleBookmarkMutation = () => {
  const utils = trpc.useContext();

  const mutation = trpc.useMutation("bookmarks.add", {
    onSuccess() {
      invalidateAll(utils);
    },
  });

  return mutation.mutate;
};

export const useTogglePostLikeMutation = () => {
  const utils = trpc.useContext();

  const mutation = trpc.useMutation("post.toggleLike", {
    onSuccess() {
      invalidateAll(utils);
    },
  });

  return mutation.mutate;
};

export const useRemovePostMutation = () => {
  const utils = trpc.useContext();
  const mutation = trpc.useMutation("post.remove", {
    onSuccess() {
      invalidateAll(utils);
    },
  });

  return mutation.mutate;
};