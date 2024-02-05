import { Maybe } from "@/models/types";
import { SelectOption } from "@/helpers/form";

export interface FilterUserFormValues {
  email: Maybe<string>;
  status: SelectOption;
}
