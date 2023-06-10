import { memo, useState } from "react";
import BookItem from "./BookItem/BookItem";

function DisplayBooks(props) {
  const [moreBook, setMoreBook] = useState(false);
  const listBooks = moreBook ? props.books : props.books.slice(0, 10);

  return (
    <div className="max-w-7xl mx-auto w-full my-[100px] md:my-auto">
      <div className="flex justify-between h-[50px] bg-[#F2F2F2] items-center my-10">
        <div className="font-bold text-white bg-[#16A34A] h-full flex items-center relative">
          <div className="px-4 text-lg font-time">{props.title}</div>
          <div className="absolute arrow-right left-full"></div>
        </div>
        <div
          onClick={() => {
            setMoreBook(!moreBook);
          }}
          className="mr-4 text-lg cursor-pointer hover:text-green-600"
        >
          Xem tất cả
        </div>
      </div>
      <div className="w-full max-w-6xl mx-auto">
        {listBooks ? (
          <div className="grid grid-cols-2 mx-2 gap-x-6 md:mx-auto md:grid-cols-3 lg:grid-cols-4 md:gap-x-20 gap-y-24">
            {listBooks?.map((book, index) => {
              return (
                <BookItem
                  key={index}
                  bookUrlImg={book.image}
                  name={book.name}
                  author={book.author}
                  price={book.price}
                  to={book._id}
                  deleteBook={() => {
                    props.deleteBook(book._id);
                  }}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center">Không có sản phẩm nào</div>
        )}
      </div>
    </div>
  );
}
export default memo(DisplayBooks);
