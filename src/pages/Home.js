import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await axios.get(
          "http://localhost:8080/api/user/data",
          {
            withCredentials: true,
          }
        );
        setData(responseData.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load user data");
        setLoading(false);
        if (err.response?.status === 401) {
          navigate("/login");
        }
      }
    };
    fetchData();
  }, [navigate]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error)
    return <div className="alert alert-danger text-center mt-5">{error}</div>;

  const {
    currentUser,
    products,
    discountPercents,
    productVariantImages,
    deepDiscountProducts,
  } = data;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Welcome, {currentUser?.email || "User"}!</h1>

      <h2 className="text-center mb-3">Sản phẩm giảm giá sâu</h2>
      <div className="row">
        {deepDiscountProducts?.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={
                  productVariantImages?.[product.id]?.[
                    Object.keys(productVariantImages[product.id])[0]
                  ]?.[0] || "/placeholder.jpg"
                }
                alt={product.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Giá gốc: {product.price} VND</p>
                <p className="card-text text-primary">
                  Giá rẻ hơn: {product.effectivePrice} VND
                </p>
                {discountPercents?.[product.id] > 0 && (
                  <p className="card-text text-danger">
                    Giảm giá: {discountPercents[product.id]}%
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-center mb-3">Tất cả sản phẩm</h2>
      <div className="row">
        {products?.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={
                  productVariantImages?.[product.id]?.[
                    Object.keys(productVariantImages[product.id])[0]
                  ]?.[0] || "/placeholder.jpg"
                }
                alt={product.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Giá gốc: {product.price} VND</p>
                <p className="card-text text-primary">
                  Giá rẻ hơn: {product.effectivePrice} VND
                </p>
                {discountPercents?.[product.id] > 0 && (
                  <p className="card-text text-danger">
                    Giảm giá: {discountPercents[product.id]}%
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() =>
          axios
            .post(
              "http://localhost:8080/api/logout",
              {},
              { withCredentials: true }
            )
            .then(() => navigate("/login?logout=true"))
        }
        className="btn btn-danger mt-3"
      >
        Đăng xuất
      </button>
    </div>
  );
};

export default Home;
