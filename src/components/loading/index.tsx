import React from "react";
import { LoadingPage } from "@/components/loading/components/page-load";
import {
  LoadingTableButton,
  LoadingTableButtonProps,
} from "@/components/loading/components/table-button";

interface Props extends Partial<LoadingTableButtonProps> {
  type: "page" | "table-button";
}

export const Loading: React.FC<Props> = ({ type, ...rest }) => {
  switch (type) {
    case "page":
      return <LoadingPage {...rest} />;
    case "table-button":
      return <LoadingTableButton {...rest} />;
    default:
      return null;
  }
};
