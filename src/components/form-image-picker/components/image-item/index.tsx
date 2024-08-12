import React, { useCallback, useMemo } from "react";
import Image from "next/image";
import {
  ExistingFileState,
  FileState,
  FileStateCategory,
  findStateIndex,
  NewFileState,
} from "@/helpers/admin/questions/file-action";
import { Control, useFieldArray } from "react-hook-form";
import { switchCaseReturn } from "@/helpers/array";

interface UploadedImageProps {
  file: NewFileState;
}

interface DownloadedImageProps {
  file: ExistingFileState;
}

interface Props {
  fileState: FileState;
  inputName: string;
  control?: Control;
}

const UploadImageItem: React.FC<UploadedImageProps> = ({
  file: { value: fileData },
}) => {
  const imageBlob = useMemo(() => {
    if (!fileData) return null;
    return URL.createObjectURL(fileData);
  }, [fileData]);

  if (!fileData || !imageBlob) return null;

  return (
    <div className="rounded-lg w-32 h-32 relative">
      <Image
        unoptimized
        src={imageBlob}
        alt={fileData.name}
        className="object-cover"
        width={500}
        height={500}
      />
    </div>
  );
};

const DownloadedImageItem: React.FC<DownloadedImageProps> = ({
  file: { state, value: path },
}) => {
  if (state === FileStateCategory.REMOVE) return null;
  const imageUrl = (id: string) =>
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/class-questions/${id}`;
  return (
    <div className="rounded-lg w-32 h-32 relative">
      <Image
        unoptimized
        src={imageUrl(path)}
        alt="Preview"
        className="object-cover"
        width={500}
        height={500}
      />
    </div>
  );
};

export const ImageItem: React.FC<Props> = ({
  fileState,
  inputName,
  control,
}) => {
  const {
    fields: fileStates,
    remove: removeFromForm,
    update,
  } = useFieldArray({
    name: inputName,
    control,
  });

  const imageComponent = switchCaseReturn(
    fileState.state,
    {
      case: FileStateCategory.NEW,
      return: <UploadImageItem file={fileState as NewFileState} />,
    },
    {
      case: null,
      return: <DownloadedImageItem file={fileState as ExistingFileState} />,
    }
  );

  const remove = useCallback(() => {
    // @ts-ignore
    const currentIndex = findStateIndex(fileStates, fileState);
    if (fileState.state === FileStateCategory.NEW) {
      removeFromForm(currentIndex);
      return;
    }
    update(currentIndex, { ...fileState, state: FileStateCategory.REMOVE });
  }, [fileState, fileStates, removeFromForm, update]);

  if (fileState.state === FileStateCategory.REMOVE) return null;

  return (
    <div className="relative">
      {imageComponent}
      <button
        type="button"
        className="badge hover:badge-primary rounded-badge absolute top-[-0.5rem] right-0 px-1 py-4"
        onClick={remove}
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
