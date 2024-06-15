import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState();

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8080/books");
        setBooks(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8080/books/${id}`);
      console.log({ res });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ height: "100%" }}>
      <div className="book-title">
        <h1>ST BOOK STORE</h1>
        <button>
          <Link to={"/add"}>Add book</Link>
        </button>
      </div>

      <div className="books">
        {books?.map((eachBook) => {
          return (
            <div key={eachBook.id} className="book">
              {eachBook.cover && <img src={"/image.png"} alt="" />}
              <h2>{eachBook.title}</h2>
              <p>{eachBook.desc}</p>
              <span>Price:- {eachBook.price}</span>
              <button
                className="delete"
                onClick={() => handleDelete(eachBook.id)}
              >
                Delete
              </button>
              <button className="update">
                <Link to={`/update/${eachBook.id}`}>Update</Link>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Books;
