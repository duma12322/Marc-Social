import clsx from 'clsx';
import { Control, UseFormSetValue, useWatch } from 'react-hook-form';
import PhotoIcon from '../common/icons/photo';
import UploadImageThumbnail from '../common/upload-image-thumbnail';
import {
  getImageHeightRatio,
  getImageWidthRatio,
} from '../post-card/images-grid';
import { PostInputFormType } from './types';

interface PostFileInputProps {
  control: Control<PostInputFormType>;
  setValue: UseFormSetValue<PostInputFormType>;
  openFilePicker: () => void;
}

const PostFileInput = ({
  control,
  setValue,
  openFilePicker,
}: PostFileInputProps) => {
  const selectedImages = useWatch({
    control,
    name: 'images',
    defaultValue: [],
  });

  const removeImage = (imageName: string) => {
    setValue('images', [
      ...selectedImages.filter((image) => image.name !== imageName),
    ]);
  };

  return (
    <>
      <button
        className="cursor-pointer self-start h-6 w-6 mr-auto mb-2"
        onClick={openFilePicker}
        type="button"
      >
        <PhotoIcon />
      </button>

      <div className="grid gap-2 grid-cols-fill">
        {selectedImages.length > 0 &&
          selectedImages.map((image, index) => {
            const widthRatio = getImageWidthRatio(selectedImages.length, index);
            const heightRatio = getImageHeightRatio(
              selectedImages.length,
              index
            );
            return (
              <UploadImageThumbnail
                className={clsx(
                  'relative',
                  selectedImages.length === 3 && index === 0 && 'row-span-2',
                  selectedImages.length === 3 && index === 2 && 'self-end'
                )}
                key={image.name}
                image={image}
                removeFile={removeImage}
                imageWidthRatio={widthRatio}
                imageHeightRatio={heightRatio}
              />
            );
          })}
      </div>
    </>
  );
};

export default PostFileInput;
