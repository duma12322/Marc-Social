import { toast } from "react-toastify";
import TextHeader from "../common/text-header";
import PostInput from "../post-input/post-input";

interface CommunityPostInputProps {
  communityId: string;
}

const CommunityPostInput = ({ communityId }: CommunityPostInputProps) => {
  const addPostCallback = () => {
    toast("Your post was added successfully", {
      type: "success"
    });
  };

  return (
    <div className="bg-primary-0 dark:bg-primary-dark-200 px-5 py-3 rounded-lg mb-5">
      <TextHeader className="pb-3">Publica algo</TextHeader>
      <hr className="mb-3 dark:border-primary-700" />
      <PostInput communityId={communityId} submitCallback={addPostCallback} />
    </div>
  );
};

export default CommunityPostInput;
