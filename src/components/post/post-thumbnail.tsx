import { PostDetailsType, SharedPostType } from "@/types/index";
import clsx from "clsx";
import Image from "next/image";
import router from "next/router";
import React from "react";
import { usePostQuery } from "src/hooks/query";

interface PostThumbnailProps {
  sharedPost: SharedPostType;
  disableLink?: boolean;
  isSmall?: boolean;
}

const PostThumbnail = ({
  sharedPost,
  disableLink,
  isSmall,
}: PostThumbnailProps) => {
  const goToSharedPost = (e: React.MouseEvent<HTMLElement>) => {
    if (disableLink) return;
    e.stopPropagation();
    router.push(`/post/${sharedPost.id}`);
  };

  if (sharedPost.isDeleted) {
    return (
      <div className="bg-neutral-100 p-1 text-sm text-neutral-700 ring-2 ring-inset ring-blue-400/30 rounded-lg mb-5">
        post removed
      </div>
    );
  }

  const firstImage = sharedPost.images[0]?.url;

  return (
    <div
      className="ring-2 ring-inset ring-blue-400/30 rounded-lg mb-5 overflow-hidden"
      onClick={goToSharedPost}
    >
      <div className="flex items-center p-2">
        <Image
          src={sharedPost.user.image || "/images/fallback.svg"}
          alt=""
          width="20"
          height="20"
          className="rounded-full"
        />

        <div className="flex items-baseline">
          <p className="ml-2 ">{sharedPost.user.name}</p>
          <p className="ml-2 font-medium text-xs text-gray-400">
            {sharedPost.createdAt.toDateString()}
          </p>
        </div>
      </div>
      <p className="mx-2 mb-2">{sharedPost.content}</p>

      {firstImage && (
        <div
          className={clsx([
            "w-full h-96 relative overflow-hidden",
            isSmall && "!h-",
          ])}
        >
          <Image src={firstImage} alt="" layout="fill" objectFit="cover" />
        </div>
      )}
    </div>
  );
};

export default PostThumbnail;