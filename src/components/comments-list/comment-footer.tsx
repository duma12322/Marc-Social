import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

import {
  useDeleteCommentMutation,
  useToggleCommentLikeMutation,
} from 'src/hooks/mutation';
import { CommentDetailsType } from '@/types/db';

interface CommentFooterProps {
  comment: CommentDetailsType;
  toggleIsEditing: () => void;
  toggleIsReplying: () => void;
}
const CommentFooter = ({
  comment,
  toggleIsEditing,
  toggleIsReplying,
}: CommentFooterProps) => {
  const { data: session } = useSession();
  const me = session?.user!;

  const toggleLike = useToggleCommentLikeMutation(comment.postId);

  const handleToggleLike = () => {
    toggleLike({ commentId: comment.id });
  };

  const deleteComment = useDeleteCommentMutation(comment.postId);
  const handleDeleteComment = () => {
    deleteComment({ commentId: comment.id });
  };

  return (
    <div className="flex">
      <button
        type="button"
        className={clsx([
          'flex items-center cursor-pointer w-fit',
          comment.likedByMe && 'text-red-500',
        ])}
        onClick={handleToggleLike}
      >
        <Image
          src="/icons/hart.png"
          width="20"
          height="20"
          layout="fixed"
          alt=""
        />
        <p className="ml-2">{comment.likeCount}</p>
      </button>
      <div className={clsx(['flex items-center w-fit ml-5'])}>
        <Image
          src="/icons/replay.png"
          width="20"
          height="20"
          layout="fixed"
          alt=""
        />
        <p className="ml-2">{comment.repliesCount}</p>
      </div>
      <button
        type="button"
        onClick={toggleIsReplying}
        className="ml-auto font-medium text-xs text-gray-400 hover:text-neutral-800 transition-colors"
      >
        Reply
      </button>
      {comment.userId === me.id && (
        <>
          <button
            type="button"
            onClick={toggleIsEditing}
            className="ml-3 font-medium text-xs text-gray-400 hover:text-neutral-800 transition-colors"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={handleDeleteComment}
            className="ml-3 font-medium text-xs text-red-400 hover:text-red-500 transition-colors"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default CommentFooter;
