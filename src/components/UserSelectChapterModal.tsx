import React, { useEffect, useState } from "react";
import { Book, bookDatabase } from "@/components/admin/Table/AdminBookTable";
import { faker } from "@faker-js/faker";
import { questionDatabase } from "@/components/admin/Table/AdminQuestionTable";
import toast from "react-hot-toast";

interface Props {
  show: boolean;
  selectedBook?: string | null;
  selectedChapter: string[];
  setSelectedChapter?: any;
  selectedQuestions?: any;
  setSelectedQuestions?: any;
  setStep?: any;
  setFinished?: any;
  setCurrentQuestion?: any;
}

const defaultProps: Props = {
  show: true,
  selectedChapter: [],
};
const UserSelectChapterModal: React.FC<Props> = ({
  show,
  selectedBook,
  selectedChapter,
  setSelectedChapter,
  selectedQuestions,
  setSelectedQuestions,
  setStep,
  setFinished,
  setCurrentQuestion,
}) => {
  const [currentBook, setCurrentBook] = useState<Book>();
  const [includeCompleted, setIncludeCompleted] = useState(false);

  useEffect(() => {
    setCurrentBook(bookDatabase.filter((book) => book.name == selectedBook)[0]);
    setSelectedQuestions(0);
    setSelectedChapter([]);
    setIncludeCompleted(false);
  }, [selectedBook]);

  useEffect(() => {
    const totalQuestions = questionDatabase.filter(
      (question) =>
        question.book == currentBook &&
        selectedChapter.includes(question.chapter as string)
    );
    const completedQuestions = totalQuestions.reduce(
      (totalNumber, question) => {
        return question.completed ? totalNumber + 1 : totalNumber;
      },
      0
    );

    if (!includeCompleted) {
      setSelectedQuestions(totalQuestions.length - completedQuestions);
    } else {
      setSelectedQuestions(totalQuestions.length);
    }
  }, [includeCompleted]);
  const handleSelectChapter = (
    event: React.MouseEvent,
    chapter: string,
    numberOfQuestion: number
  ) => {
    let sign = 1;
    setSelectedChapter((prevState: Props["selectedChapter"]) => {
      const exist = prevState.includes(chapter);

      if (exist) {
        sign = -1;
        return prevState?.filter((each) => each != chapter);
      }

      return [...prevState, chapter];
    });
    setSelectedQuestions(
      (prevCount: number) => prevCount + numberOfQuestion * sign
    );
  };
  return (
    <>
      <input
        type="checkbox"
        id="user-select-chapter-modal"
        className="modal-toggle"
        checked={show}
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box sm:w-12/12 sm:max-w-5xl">
          <h3 className="font-bold text-2xl">
            You have selected{" "}
            <span className={"text-success decoration-secondary-focus"}>
              {currentBook?.name}
            </span>
          </h3>
          <h3 className="text-xl">
            Please select one or more chapters to continue. You have selected{" "}
            <span className={"font-semibold"}>{selectedQuestions}</span>{" "}
            questions.
          </h3>

          {currentBook && currentBook.chapter.length == 0 && (
            <div className={"text-lg mt-5"}>
              <i>
                This book has no chapters at the moment. Please select a
                different book
              </i>
            </div>
          )}
          <div className={"grid md:grid-cols-2 lg:grid-cols-3  mt-5"}>
            {currentBook?.chapter.map((chapter) => {
              let totalQuestion = questionDatabase.filter(
                (question) =>
                  question.book == currentBook && question.chapter == chapter
              );
              let completed = totalQuestion.reduce(
                (totalCompleted, question) =>
                  question.completed ? totalCompleted + 1 : totalCompleted,
                0
              );
              return (
                <div
                  key={chapter}
                  className={`card-body bg-base-100 shadow-lg m-3 rounded-lg ${
                    selectedChapter?.includes(chapter)
                      ? "border-solid"
                      : "border-dashed"
                  } border-2 border-sky-500 hover:border-solid shrink-0 cursor-pointer select-none`}
                  onClick={(event) => {
                    handleSelectChapter(
                      event,
                      chapter,
                      includeCompleted
                        ? totalQuestion.length
                        : totalQuestion.length - completed
                    );
                  }}
                >
                  <div>{chapter}</div>
                  <progress
                    className="progress progress-success w-56"
                    value={completed}
                    max={totalQuestion.length}
                  ></progress>
                  <span className={"text-sm select-none"}>
                    Completed {completed} / {totalQuestion.length} questions
                  </span>
                </div>
              );
            })}
          </div>

          <label
            className="cursor-pointer flex mt-5 justify-end select-none"
            onChange={() => setIncludeCompleted((prevState) => !prevState)}
          >
            <div>Include completed questions</div>
            <input
              type="checkbox"
              className="checkbox checkbox-success ml-2"
              checked={includeCompleted}
            />
          </label>
          <div className="modal-action">
            <label
              htmlFor="user-select-book-modal"
              className={`btn`}
              onClick={() => setStep(0)}
            >
              Previous
            </label>
            <label
              htmlFor="user-select-chapter-modal"
              className={`btn ${selectedQuestions == 0 ? "btn-disabled" : ""}`}
              onClick={() => {
                toast.success(
                  `Successfully loaded ${selectedQuestions} questions`
                );
                setCurrentQuestion(1);
                setFinished(false);
                setStep(3);
              }}
            >
              Next
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

UserSelectChapterModal.defaultProps = defaultProps;
export default UserSelectChapterModal;
