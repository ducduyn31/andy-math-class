import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Book, createFullChapter } from "@/models";

const BookModificationModal = ({ book }: { book: Book }) => {
  const { name, chapters, color } = book;
  const [bookNameInput, setBookNameInput] = useState(name);
  const [chapterInput, setChapterInput] = useState("");
  const [localChapter, setLocalChapter] = useState(chapters);

  useEffect(() => {
    setLocalChapter(book.chapters);
  }, [book]);

  const removeChapter = (chapterName: string) => {
    setLocalChapter((prevChapter) => {
      return prevChapter.filter((chapter) => chapter.name != chapterName);
    });
  };

  const addChapter = () => {
    const newChapter = chapterInput;
    setLocalChapter((prevChapter) => {
      return [...prevChapter, createFullChapter({ name: newChapter })];
    });
  };

  const resetInput = () => {
    setBookNameInput("");
    setChapterInput("");
  };

  return (
    <>
      <input
        type="checkbox"
        id="book-modification-modal"
        className="modal-toggle"
      />
      <label className="modal modal-bottom sm:modal-middle">
        <label className="modal-box" htmlFor={""}>
          <h3 className="font-bold text-lg">Book modification</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Book name</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered"
              value={bookNameInput}
              onChange={(event) => setBookNameInput(event.target.value)}
            />
            <label className="label">
              <span className="label-text">Chapter</span>
            </label>
            <div>
              {localChapter.map((item) => (
                <div
                  key={item.id}
                  className={`badge badge-lg gap-2 mr-1 mt-1 ${color}`}
                >
                  {item.name}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-4 h-4 stroke-current cursor-pointer"
                    onClick={() => removeChapter(item.name)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </div>
              ))}
            </div>

            <div className={"flex w-full items-center mt-3"}>
              <input
                type="text"
                placeholder="Add chapter"
                className="input input-bordered"
                onChange={(event) => setChapterInput(event.target.value)}
                value={chapterInput}
              />

              <button
                className={"btn ml-2 btn-info flex-1"}
                onClick={addChapter}
              >
                Add
              </button>
            </div>

            <div className="modal-action mt-5">
              <label
                htmlFor="book-modification-modal"
                className="btn"
                onClick={() => resetInput()}
              >
                Close
              </label>

              <label
                htmlFor="book-modification-modal"
                className="btn btn-success"
                onClick={() => {
                  resetInput();
                  toast.success("Saved successfully");
                }}
              >
                Save
              </label>
            </div>
          </div>
        </label>
      </label>
    </>
  );
};

export default BookModificationModal;
