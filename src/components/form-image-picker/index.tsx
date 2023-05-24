import React, { InputHTMLAttributes, useCallback, useRef } from "react";
import { ImagePlaceHolder } from "@/components/form-image-picker/components/image-place-holder";
import { Control, useFieldArray, useWatch } from "react-hook-form";
import { FormImageList } from "@/components/form-image-picker/components/image-list";
import {
  FileStateCategory,
  getNextOrder,
} from "@/helpers/admin/questions/file-action";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  filesInputName: string;
  control?: Control;
  label: string;
  errorMessage?: string;
}

/**
 * @description Form image picker component that allows you to upload and delete images. Requires a FormProvider or control props to work.
 */
export const RHFormImagePicker: React.FC<Props> = ({
  control,
  filesInputName,
  label,
  errorMessage,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { [filesInputName]: fileStates } = useWatch({ control });
  const { append } = useFieldArray({ control, name: filesInputName });

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      append({
        state: FileStateCategory.NEW,
        value: file,
        order: getNextOrder(fileStates),
      });
    },
    [fileStates, append]
  );

  return (
    <div>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <div className="grid gap-5 grid-cols-3">
        <FormImageList
          fileStates={fileStates}
          inputName={filesInputName}
          control={control}
        />
        <ImagePlaceHolder
          onClick={() => {
            inputRef.current?.showPicker();
          }}
        />
      </div>
      {errorMessage && (
        <label className="text-xs text-error mt-1">{errorMessage}</label>
      )}
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileSelect}
        hidden
        {...rest}
      />
    </div>
  );
};
