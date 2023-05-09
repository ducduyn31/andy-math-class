import React, {
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ImagePlaceHolder } from "@/components/form-image-picker/components/image-place-holder";
import { useList } from "react-use";
import { ImageItem } from "@/components/form-image-picker/components/image-item";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
  existingImages?: string[];
  onDeleteSelect?: (path: string[]) => void;
}
interface FileChangeEvent {
  event: React.ChangeEvent<HTMLInputElement>;
  files: File[];
}

export const FormImagePicker = forwardRef<HTMLInputElement, Props>(
  function ImagePicker(
    { label, errorMessage, existingImages, onChange, onDeleteSelect, ...rest },
    ref
  ) {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);

    const filesState = useList<File>();
    const deleteFilesState = useList<string>();
    const [files, { push: addFileToForm }] = filesState;
    const [deleteFiles] = deleteFilesState;
    const [event, dispatchCurrentEvent] = useState<FileChangeEvent>();

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatchCurrentEvent({ event: e, files });
    };

    useEffect(() => {
      if (!event) return;
      const shouldNotIncludeCurrentFiles = (file: File) =>
        !event.files.some((f) => f.name === file.name);

      const selectedFiles = Array.from(event.event.target.files ?? []).filter(
        shouldNotIncludeCurrentFiles
      );
      const dataTransfer = new DataTransfer();
      [...event.files, ...selectedFiles].forEach((file) =>
        dataTransfer.items.add(file)
      );
      inputRef.current!.files = dataTransfer.files;
      event.event.target.files = dataTransfer.files;
      onChange?.(event.event);
      addFileToForm(...selectedFiles);
    }, [event, onChange, addFileToForm]);

    useEffect(() => {
      if (!onDeleteSelect) return;
      onDeleteSelect(deleteFiles);
    }, [deleteFiles, onDeleteSelect]);

    return (
      <div>
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <div className="grid gap-5 grid-cols-3">
          {existingImages
            ?.filter((path) => !deleteFiles.includes(path))
            .map((path) => (
              <ImageItem
                path={path}
                key={path}
                deleteFilesState={deleteFilesState}
              />
            ))}
          {files.map((file) => (
            <ImageItem file={file} key={file.name} filesState={filesState} />
          ))}
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
          {...rest}
          hidden
        />
      </div>
    );
  }
);
