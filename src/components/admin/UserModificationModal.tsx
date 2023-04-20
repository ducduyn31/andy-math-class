import { bookDatabase } from "@/components/admin/Table/AdminBookTable";
import { AdminUserRowProps } from "@/components/admin/Table/AdminUserRow";
import { useEffect } from "react";

const UserModificationModal: React.FC<AdminUserRowProps> = ({
  firstName,
  lastName,
  email,
  assignedBooks,
  enabled,
}) => {
  useEffect(() => {
    console.log("did mount", firstName, lastName, email);
  }, []);
  return (
    <>
      <input
        type="checkbox"
        id="user-modification-modal"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">User modification</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">First name</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered"
              defaultValue={firstName}
            />

            <label className="label">
              <span className="label-text">Last name</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered"
              defaultValue={lastName}
            />

            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered"
              defaultValue={email}
            />

            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Modify to change their password"
              className="input input-bordered"
            />

            <label className="label">
              <span className="label-text">Books</span>
            </label>
            {bookDatabase.map((book, i) => (
              <label key={i} className="label cursor-pointer relative">
                <span className={"btn w-full"}> {book.name} </span>
                <input
                  type="checkbox"
                  defaultChecked={assignedBooks.includes(book)}
                  className="checkbox checkbox-accent absolute right-5 border-2"
                />
              </label>
            ))}
            <div className="modal-action mt-2">
              <label htmlFor="user-modification-modal" className="btn">
                Close
              </label>

              <label
                htmlFor="user-modification-modal"
                className="btn btn-success"
              >
                Save
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserModificationModal;
