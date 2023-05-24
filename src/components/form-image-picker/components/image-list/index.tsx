import React from "react";
import { ImageItem } from "@/components/form-image-picker/components/image-item";
import { FileState } from "@/helpers/admin/questions/file-action";
import { Control } from "react-hook-form";

interface Props {
  fileStates: FileState[];
  inputName: string;
  control?: Control;
}

export const FormImageList: React.FC<Props> = ({
  fileStates,
  inputName,
  control,
}) => {
  return (
    <>
      {fileStates.map((file) => (
        <ImageItem
          fileState={file}
          inputName={inputName}
          control={control}
          key={`${file.state}-${
            typeof file.value === "string" ? file.value : file.value.name
          }`}
        />
      ))}
    </>
  );
};
