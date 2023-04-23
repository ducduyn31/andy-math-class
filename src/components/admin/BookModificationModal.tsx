import { Book, bookDatabase } from "@/components/admin/Table/AdminBookTable";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const BookModificationModal = ({ book }: { book: Book }) => {
  const { name, chapter, color } = book;
  const [localChapter, setLocalChapter] = useState(chapter);
  const addChapterInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalChapter(book.chapter);
  }, [book]);

  const removeChapter = (chapterName: string) => {
    setLocalChapter((prevChapter) => {
      return prevChapter.filter((chapter) => chapter != chapterName);
    });
  };

  const addChapter = () => {
    const newChapter = addChapterInput.current!.value;
    setLocalChapter((prevChapter) => {
      return [...prevChapter, newChapter];
    });
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
              defaultValue={name}
            />
            <label className="label">
              <span className="label-text">Chapter</span>
            </label>
            <div>
              {localChapter.map((item) => (
                <div
                  key={item}
                  className={`badge badge-lg gap-2 mr-1 mt-1 ${color}`}
                >
                  {item}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-4 h-4 stroke-current cursor-pointer"
                    onClick={() => removeChapter(item)}
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
                ref={addChapterInput}
              />

              <button
                className={"btn ml-2 btn-info flex-1"}
                onClick={addChapter}
              >
                Add
              </button>
            </div>

            <div className="modal-action mt-5">
              <label htmlFor="book-modification-modal" className="btn">
                Close
              </label>

              <label
                htmlFor="book-modification-modal"
                className="btn btn-success"
                onClick={() => toast.success("Saved successfully")}
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
