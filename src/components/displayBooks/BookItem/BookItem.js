import { Link } from "react-router-dom";
import { handleNumber } from "../../../util/handleNumber";
import { useSelector } from "react-redux";

function BookItem(props) {
  const { currentUser } = useSelector((state) => state.AuthReducer);
  return (
    <div className="relative flex flex-col justify-between max-w-sm overflow-hidden bg-white border border-gray-200 rounded-lg shadow item dark:bg-gray-800 dark:border-gray-700">
      <div>
        <img className="rounded-t-lg" src={props.bookUrlImg} alt="" />
      </div>
      <div className="p-5">
        <div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 truncate dark:text-white">
            {props.name}
          </h5>
        </div>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {props.author}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {handleNumber(props.price)}
        </p>
      </div>
      {currentUser && (
        <div className="absolute bottom-0 left-0 grid w-full grid-cols-2 bg-gray-700 outline-none boder-none item-transformY item-opacity">
          <Link
            to={`/update/${props.to}`}
            className="py-2 text-white bg-blue-500"
          >
            Update
          </Link>
          <button
            className="py-2 text-white bg-red-600"
            onClick={props.deleteBook}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
export default BookItem;
