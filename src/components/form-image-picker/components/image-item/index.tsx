import React, { useCallback, useMemo } from "react";
import { ListActions } from "react-use/lib/useList";

interface UploadedImageProps {
  file: File;
  filesState: [File[], ListActions<File>];
}

interface DownloadedImageProps {
  path: string;
  deleteFilesState: [string[], ListActions<string>];
}

const UploadImageItem: React.FC<UploadedImageProps> = ({ file }) => {
  const imageBlob = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  if (!file || !imageBlob) return null;

  return (
    <div className="rounded-lg w-32 h-32 relative">
      <img src={imageBlob} alt={file.name} className="object-cover" />
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
  const imageComponent =
    "file" in props ? (
      <UploadImageItem {...props} />
    ) : (
      <DownloadedImageItem {...props} />
    );

  const callback = useCallback(() => {
    if ("file" in props) {
      const [files, { removeAt }] = props.filesState;
      removeAt(files.indexOf(props.file));
      return;
    }
    const [, { push }] = props.deleteFilesState;
    push(props.path);
  }, [props]);

  return (
    <div className="relative">
      {imageComponent}
      <button
        type="button"
        className="badge hover:badge-primary rounded-badge absolute top-[-0.5rem] right-0 px-1 py-4"
        onClick={callback}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};
