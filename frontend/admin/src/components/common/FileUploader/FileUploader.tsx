import { ChangeEvent, FC, RefObject } from "react";
import { Button, FormControl, Grid, Typography } from "@mui/material";

interface FileData {
  name?: string;
  image?: string;
}

export interface FileUploaderProps {
  fileData: FileData;
  isDisabled?: boolean;
  accept?: string;
  name?: string;
  handleChange: (even: ChangeEvent<HTMLInputElement>) => void;
  handleClear?: () => void;
  inputRef?: RefObject<HTMLInputElement>;
}

export const FileUploader: FC<FileUploaderProps> = ({
  accept,
  isDisabled,
  handleClear,
  name,
  handleChange,
  fileData,
  inputRef,
}) => {
  return (
    <FormControl
      fullWidth
      variant="outlined"
      size="small"
      disabled={isDisabled}
    >
      <input
        ref={inputRef}
        id={name}
        name={name}
        disabled={isDisabled}
        type="file"
        onChange={handleChange}
        accept={accept}
        style={{ display: "none" }}
      />
      <Grid container spacing={1}>
        <Grid item>
          <label htmlFor={name}>
            <Button
              component="span"
              variant="outlined"
              color="primary"
              disabled={isDisabled}
            >
              Загрузить
            </Button>
          </label>
        </Grid>
        {handleClear && (fileData.image || fileData.name) && (
          <Grid item>
            <Button
              onClick={handleClear}
              component="span"
              variant="outlined"
              color="secondary"
              data-testid={"button-clear"}
            >
              Очистить
            </Button>
          </Grid>
        )}
      </Grid>
      {fileData.name && <Typography>{fileData.name}</Typography>}
      {fileData.image && <img src={fileData.image} />}
    </FormControl>
  );
};
