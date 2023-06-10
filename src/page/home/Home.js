import { useEffect, useState } from "react";

import Layout from "../../components/Layout/Layout";
import Slide from "../../components/Slide/Slide";
import DisplayBooks from "../../components/displayBooks/displayBook";
import * as api from "../../config/apiBackEnd";
import { TOKEN_USER } from "../../constant";

function Home(props) {
  const [bookItems, setBookItems] = useState([]);

  const getListBook = async () => {
    try {
      const res = await fetch(`${api.pathProducts}/getallproducts`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Get list book is failure");
        })
        .then((data) => data);
      if (res.data) {
        setBookItems([...res.data]);
      }
    } catch (error) {
      alert("Có lỗi trong quá trình tải trang");
    }
  };

  const deleteBook = (idBook) => {
    fetch(`${api.pathProducts}/delete/${idBook}`, {
      method: "delete",
      headers: {
        authorization: `Bearer ${localStorage.getItem(TOKEN_USER)}`,
      },
    })
      .then((data) => {
        if (data.ok) {
          return getListBook();
        }
        throw new Error("Delete book is falure");
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    getListBook();
  }, []);

  return (
    <Layout>
      <Slide></Slide>
      <DisplayBooks
        books={bookItems}
        title={"Sách Mới"}
        deleteBook={deleteBook}
      />
    </Layout>
  );
}
export default Home;
