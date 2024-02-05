import React, { HTMLAttributes } from "react";

export interface LoadingTableButtonProps
  extends HTMLAttributes<HTMLTableRowElement> {
  onClick?: () => void;
  colSpan?: number;
  loading?: boolean;
}

export const LoadingTableButton: React.FC<LoadingTableButtonProps> = ({
  onClick,
  colSpan = 4,
  loading = true,
  ...rest
}) => {
  return (
    <tr {...rest}>
      <td colSpan={colSpan}>
        <div className="flex justify-center items-center">
          <button
            className="btn btn-primary"
            onClick={onClick}
            disabled={loading}
          >
            {loading ? (
              <p className="flex items-center">
                {" "}
                Loading <b className="loading loading-dots" />
              </p>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      </td>
    </tr>
  );
};
