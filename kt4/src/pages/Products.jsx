import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarRating from "../components/StarRating";

export default function Products() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(null); // id раскрытого товара

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  if (loading) return <div className="container">Загрузка товаров...</div>;
  if (error) return <div className="container">Ошибка: {error}</div>;

  return (
    <div className="container">
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#00bcd4",
        }}
      >
        Мега крутой магазинчик
      </h1>
      <div className="grid">
        {items.map((item) => (
          <div
            className="card"
            key={item.id}
            style={{
              transition: "all 0.3s ease",
              transform: expanded === item.id ? "scale(1.03)" : "scale(1)",
              background: expanded === item.id ? "#222" : "#1a1a1a",
              border: "1px solid #333",
              color: "#f2f2f2",
              boxShadow:
                expanded === item.id
                  ? "0 0 12px rgba(0, 188, 212, 0.5)"
                  : "0 0 6px rgba(0, 0, 0, 0.6)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            onClick={() => toggleExpand(item.id)}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "contain",
                background: "#fff",
                borderRadius: "6px",
                marginBottom: "10px",
              }}
            />
            <div
              className="title"
              style={{ fontWeight: "bold", marginBottom: 6 }}
            >
              {item.title}
            </div>
            <div
              className="price"
              style={{ color: "#00e676", marginBottom: 4 }}
            >
              ${item.price}
            </div>
            <StarRating value={item.rating?.rate ?? 0} />
            {expanded === item.id && (
              <div
                style={{
                  marginTop: 10,
                  fontSize: 13,
                  color: "#ddd",
                  borderTop: "1px solid #444",
                  paddingTop: 10,
                  lineHeight: 1.4,
                }}
              >
                {item.description.length > 150
                  ? item.description.slice(0, 150) + "..."
                  : item.description}
                <div style={{ marginTop: 10 }}>
                  <Link to={`/product/${item.id}`}>
                    <button
                      className="btn"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        background: "#00bcd4",
                        color: "#fff",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Подробнее
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
