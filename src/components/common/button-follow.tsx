import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useToggleFollowUserMutation } from "src/hooks/mutation";
import Button from "./button";

interface ButtonFollowProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  userId: string;
  userName: string;
  isSmall?: boolean;
  followedByMe: boolean;
}

const ButtonFollow = ({
  followedByMe,
  userId,
  userName,
  isSmall = false,
  ...buttonProps
}: ButtonFollowProps) => {
  const { data: session } = useSession();

  const myId = session?.user?.id!;

  const onSuccessCb = () => {
    if (followedByMe) {
      toast(`Dejaste de seguir ${userName}`, {
        type: "success"
      });
    } else {
      toast(`Empezaste a seguir ${userName}`, {
        type: "success"
      });
    }
  };

  const followUser = useToggleFollowUserMutation(userId, onSuccessCb);

  if (myId === userId) return null;

  return (
    <Button onClick={followUser} {...buttonProps} isSmall={isSmall}>
      {followedByMe ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default ButtonFollow;
