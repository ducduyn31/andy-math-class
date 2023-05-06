import React, { useMemo } from "react";
import { ListActions } from "react-use/lib/useList";

interface UploadedImageProps {
  file: File;
  filesState: [File[], ListActions<File>];
}

interface DownloadedImageProps {
  path: string;
}

const UploadImageItem: React.FC<UploadedImageProps> = ({
  file,
  filesState: [files, { removeAt }],
}) => {
  const imageBlob = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  if (!file || !imageBlob) return null;

  const removeItem = () => {
    removeAt(files.indexOf(file));
  };

  return (
    <div className="rounded-lg w-32 h-32 relative">
      <img src={imageBlob} alt={file.name} className="object-cover" />
      <button
        type="button"
        className="absolute top-0 right-0 bg-base-300 btn-circle opacity-0 hover:opacity-100 m-2"
        onClick={removeItem}
      >
        X
      </button>
    </div>
  );
};

const DownloadedImageItem: React.FC<DownloadedImageProps> = ({ path }) => {
  const imageUrl = (id: string) =>
    `https://ezlpvujpzcqeaiizqnbi.supabase.co/storage/v1/object/public/class-questions/${id}`;
  return (
    <div className="rounded-lg w-32 h-32 relative">
      <img src={imageUrl(path)} alt="Preview" className="object-cover" />
    </div>
  );
};

export const ImageItem: React.FC<UploadedImageProps | DownloadedImageProps> = (
  props
) => {
  if ("file" in props) {
    return <UploadImageItem {...props} />;
  }

  return <DownloadedImageItem {...props} />;
};
