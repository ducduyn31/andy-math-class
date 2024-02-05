import React from "react";

interface Props {}

export const LoadingPage: React.FC<Props> = ({}) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loading loading-spinner loading-lg" />
    </div>
  );
};
