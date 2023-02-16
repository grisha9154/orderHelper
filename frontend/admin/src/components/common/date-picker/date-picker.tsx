import { FC } from "react";
import {
  DesktopDatePicker as MuiDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import { TextInput } from "../inputs";
import moment, { Moment } from "moment";

interface DatePickerProps {
  handleChange: (date: Date | null) => void;
  value: Date | null;
}

export const DatePicker: FC<DatePickerProps> = ({ handleChange, value }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <MuiDatePicker
        onChange={(date: Moment | null) => {
          handleChange(date ? date.toDate() : null);
        }}
        value={moment(value)}
        inputFormat="MM/DD/YYYY"
        renderInput={(params) => <TextInput {...params} />}
      />
    </LocalizationProvider>
  );
};
