import { DatePicker } from "components/common";
import { connectField } from "components/form/connect-field";

export const DatePickerControl = connectField<Date | null, {}>(
  ({ fieldProps }) => {
    const { field } = fieldProps;

    return <DatePicker handleChange={field.onChange} value={field.value} />;
  }
);
