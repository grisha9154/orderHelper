import React, { useRef, useState } from "react";

import { connectField } from "../../connectField";
import { FileUploader, FileUploaderProps } from "components/common";
import { useFormContext } from "react-hook-form";

interface FileData {
  name?: string;
  image?: string;
}

interface FileControlProps
  extends Omit<
    FileUploaderProps,
    "name" | "handleChange" | "error" | "value" | "helperText" | "fileData"
  > {
  maxSize?: number;
  showFileData?: boolean;
}

export const FileControl = connectField<string | undefined, FileControlProps>(
  ({
    fieldProps,
    isDisabled,
    maxSize = Infinity,
    showFileData = true,
    ...props
  }) => {
    const { field } = fieldProps;
    const { resetField } = useFormContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [fileData, setFileData] = useState<FileData>({});
    const inputFileRef = useRef<HTMLInputElement | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsLoading(true);
      setFileData({});

      if (event.currentTarget.files && event.currentTarget.files.length > 0) {
        const file = event.currentTarget.files[0];

        const BYTE_IN_KBYTE = 1000;

        if (file.size / BYTE_IN_KBYTE < maxSize) {
          const reader = new FileReader();

          reader.onload = () => {
            if (reader.result) {
              const value = reader.result.toString();
              field.onChange(value.substring(value.indexOf(",") + 1));
              setFileData({
                image: showFileData ? value : "",
                name: file.name,
              });
            } else {
              // setFieldError(t("common:theFileIncorrectUploadCorrect"));
            }
            setIsLoading(false);
          };

          reader.readAsDataURL(file);
        } else {
          // setFieldError(t("common:maximumFileSizeExceeded"));
          setIsLoading(false);
        }
      }
    };

    const handleClear = () => {
      field.onChange(undefined);
      setFileData({});
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }
    };

    return (
      <FileUploader
        fileData={fileData}
        handleChange={handleChange}
        handleClear={handleClear}
        name={field.name}
        isDisabled={isLoading || isDisabled}
        inputRef={inputFileRef}
        {...props}
      />
    );
  }
);
