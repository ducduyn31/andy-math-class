import React from "react";

interface Props {
  columns?: string[];
}

export const EmptyTable: React.FC<Props> = ({ columns }) => {
  return (
    <div className="card bg-base-100 drop-shadow-xl mt-5 md:mt-0 h-[650px]">
      <table className="table w-full h-full">
        <thead className="sticky top-0 bg-primary z-50 text-primary-content">
          <tr>
            {columns?.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody className="h-full text-gray-400">
          <tr className="h-full">
            <td className="h-full" colSpan={columns?.length}>
              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold">No data</div>
                  <div className="text-lg text-center">
                    There is no data to display
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
