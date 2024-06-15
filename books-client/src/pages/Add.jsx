import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Add = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/books", book);
      console.log({ res });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  console.log(book, "book");

  return (
    <div className="form">
      <Link to="/">Home</Link>
      <h1>Add New Book</h1>
      <input
        type="text"
        placeholder="title"
        name="title"
        id=""
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="desc"
        name="desc"
        id=""
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="price"
        name="price"
        id=""
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="cover"
        name="cover"
        id=""
        onChange={handleChange}
      />
      <button onClick={handleSubmit} className="formButton">
        Add
      </button>
    </div>
  );
};

export default Add;
