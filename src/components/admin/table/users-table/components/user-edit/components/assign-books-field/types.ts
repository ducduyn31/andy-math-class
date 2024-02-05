import { SelectOption } from "@/helpers/form";

export interface DispatchEventArgs {
  selectedOption: SelectOption;
  type: "select" | "deselect";
}
