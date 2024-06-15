import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Update = () => {
  const params = useParams();

  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setBook((prev) => {
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/books/${params.id}`);
        setBook(res.data?.[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllBooks();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8080/books/${params.id}`,
        book
      );
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form">
      <Link to="/">Home</Link>
      <h1>Update the Book</h1>
      <input
        type="text"
        placeholder="title"
        name="title"
        value={book.title}
        id=""
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="desc"
        name="desc"
        value={book.desc}
        id=""
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="price"
        value={book.price || 0}
        name="price"
        id=""
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="cover"
        value={book.cover}
        name="cover"
        id=""
        onChange={handleChange}
      />
      <button onClick={handleSubmit} className="formButton">
        Update
      </button>
    </div>
  );
};

export default Update;
