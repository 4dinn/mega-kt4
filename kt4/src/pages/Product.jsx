import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StarRating from "../components/StarRating";

export default function Product() {
  const { id } = useParams(); // получаем id из URL
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Товар не найден");
        return res.json();
      })
      .then((data) => setItem(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container">Загрузка товара...</div>;
  if (error) return <div className="container">Ошибка: {error}</div>;

  return (
    <div className="container" style={{ color: "#fff" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          background: "#00bcd4",
          color: "#fff",
          border: "none",
          padding: "6px 12px",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Назад
      </button>

      <div
        className="card"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "#1a1a1a",
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #333",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <img
          src={item.image}
          alt={item.title}
          style={{
            width: "100%",
            maxWidth: "300px",
            height: "300px",
            objectFit: "contain",
            background: "#fff",
            borderRadius: "6px",
            marginBottom: "20px",
          }}
        />
        <h2 style={{ marginBottom: "10px", textAlign: "center" }}>
          {item.title}
        </h2>
        <div
          style={{ color: "#00e676", marginBottom: "10px", fontSize: "20px" }}
        >
          ${item.price}
        </div>
        <StarRating value={item.rating?.rate ?? 0} />
        <p style={{ marginTop: "15px", lineHeight: 1.5, textAlign: "center" }}>
          {item.description}
        </p>
      </div>
    </div>
  );
}
