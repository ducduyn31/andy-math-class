import toast from "react-hot-toast";
import { Book, bookDatabase } from "@/components/admin/Table/AdminBookTable";
import { Question } from "@/components/admin/Table/AdminQuestionTable";
import React, { useState } from "react";

interface Props {
  question: Question;
}
const QuestionModificationModal: React.FC<Props> = ({ question }) => {
  const [questionName, setQuestionName] = useState(question.name);
  const [currentBook, setCurrentBook] = useState(question.book?.name);

  const resetInputs = () => {
    setQuestionName("");
  };

  return (
    <>
      <input
        type="checkbox"
        id="question-modification-modal"
        className="modal-toggle"
      />
      <label className="modal modal-bottom sm:modal-middle">
        <label className="modal-box" htmlFor={""}>
          <h3 className="font-bold text-lg">Question modification</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Question name</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered"
              value={questionName}
              defaultValue={question.name}
              onChange={(event) => setQuestionName(event.target.value)}
            />
            <label className="label">
              <span className="label-text">Assigned book</span>
            </label>
            <select
              className="select select-bordered"
              onChange={(event) => setCurrentBook(event.target.value)}
            >
              {bookDatabase.map((book) => (
                <option key={book.name} selected={book == question.book}>
                  {book.name}
                </option>
              ))}
            </select>

            <label className="label">
              <span className="label-text">Assigned chapter</span>
            </label>
            <select className="select select-bordered">
              {bookDatabase
                .filter((book) => book.name == currentBook)
                .map((book) => {
                  if (book.chapter.length == 0)
                    return (
                      <option disabled selected>
                        Book has no chapter
                      </option>
                    );
                  return book.chapter.map((chapter, i) => (
                    <option key={i} selected={chapter == question.chapter}>
                      {chapter}
                    </option>
                  ));
                })}
            </select>

            <label className="label">
              <span className="label-text">Question image</span>
            </label>
            <img
              src={"https://placehold.co/600x400?text=Question+Image"}
              className={"rounded-3xl"}
            />
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full mt-3"
            />

            <label className="label">
              <span className="label-text">Answer image</span>
            </label>

            <img
              src={"https://placehold.co/600x400?text=Answer+Image"}
              className={"rounded-3xl"}
            />

            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full mt-3"
            />
          </div>
          <div className="modal-action mt-5">
            <label
              htmlFor="question-modification-modal"
              className="btn"
              onClick={resetInputs}
            >
              Close
            </label>

            <label
              htmlFor="question-modification-modal"
              className="btn btn-success"
              onClick={() => {
                resetInputs();
                toast.success("Saved successfully");
              }}
            >
              Save
            </label>
          </div>
        </label>
      </label>
    </>
  );
};

export default QuestionModificationModal;
