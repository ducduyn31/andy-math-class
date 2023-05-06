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
}
interface FileChangeEvent {
  event: React.ChangeEvent<HTMLInputElement>;
  files: File[];
}

export const FormImagePicker = forwardRef<HTMLInputElement, Props>(
  function ImagePicker(
    { label, errorMessage, existingImages, onChange, ...rest },
    ref
  ) {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);

    const filesState = useList<File>();
    const [files, { push }] = filesState;
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
      push(...selectedFiles);
    }, [event, onChange, push]);

    return (
      <div>
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <div className="grid gap-5 grid-cols-3">
          {existingImages?.map((path) => (
            <ImageItem path={path} key={path} />
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
