import React, { useState } from "react";
import { bookDatabase } from "@/components/admin/Table/AdminBookTable";

interface Props {
  show: boolean;
  setSelectedBook?: any;
  selectedBook?: string | null;
  setStep?: any;
}

const defaultProps: Props = {
  show: true,
};
const UserSelectBookModal: React.FC<Props> = ({
  show,
  setSelectedBook,
  selectedBook,
  setStep,
}) => {
  return (
    <>
      <input
        type="checkbox"
        id="user-select-book-modal"
        className="modal-toggle"
        checked={show}
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box sm:w-12/12 sm:max-w-5xl">
          <h3 className="font-bold text-2xl">
            Welcome back{" "}
            <span className={"text-primary-focus decoration-secondary-focus"}>
              Austin
            </span>
          </h3>
          <h3 className="text-xl">
            Please select one of the following books to continue
          </h3>

          <div className={"grid sm:grid-cols-2 md:grid-cols-3 mt-5"}>
            {bookDatabase.map((book) => (
              <label
                key={book.name}
                className={`card-body bg-base-100 shadow-lg m-3 rounded-lg ${
                  selectedBook === book.name ? "border-solid" : "border-dashed"
                } border-2 border-sky-500 hover:border-solid shrink-0 cursor-pointer select-none`}
              >
                <div>{book.name}</div>
                <input
                  type="radio"
                  name="select-book"
                  className="hidden"
                  value={book.name}
                  onChange={() => setSelectedBook(book.name)}
                />
              </label>
            ))}
          </div>
          <div className="modal-action">
            <label
              htmlFor="user-select-book-modal"
              className={`btn ${!selectedBook ? "btn-disabled" : ""}`}
              onClick={() => setStep(1)}
            >
              Next
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

UserSelectBookModal.defaultProps = defaultProps;
export default UserSelectBookModal;
