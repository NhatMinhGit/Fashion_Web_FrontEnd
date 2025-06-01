import React, { useState, useEffect, useRef } from "react";

const ProductCard = ({ product, productVariantImages, currencyFormatter }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const slideshowInterval = useRef(null);

  // Lấy mảng ảnh của variant đầu tiên (index 0)
  // Nếu product.variants là mảng, lấy variant đầu tiên
  const firstVariant = product.variants?.[0];
  const images = firstVariant
    ? productVariantImages?.[product.id]?.[firstVariant.id] || []
    : [];

  const startSlideshow = () => {
    if (images.length > 1) {
      slideshowInterval.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 2000); // 2 giây chuyển ảnh
    }
  };

  const stopSlideshow = () => {
    clearInterval(slideshowInterval.current);
    setCurrentImageIndex(0);
  };

  // Cleanup khi component unmount
  useEffect(() => {
    return () => clearInterval(slideshowInterval.current);
  }, []);

  return (
    <div
      className="product-images"
      onMouseEnter={startSlideshow}
      onMouseLeave={stopSlideshow}
      style={{ cursor: "pointer" }}
    >
      <a href={`/user/product-detail/${product.id}`}>
        <div className="image-slider">
          {images.length > 0 && (
            <img
              src={images[currentImageIndex]}
              alt={firstVariant?.color || "product image"}
              className="product-image"
            />
          )}
        </div>
      </a>

      <h5 className="product-title">{product.name}</h5>

      <p className="product-price">
        {product.effectivePrice != null &&
        product.effectivePrice < product.price ? (
          <>
            <span className="discounted-price text-danger fw-bold ms-2">
              {currencyFormatter.formatVND(product.effectivePrice)}
            </span>
            <del className="ms-2">{currencyFormatter.formatVND(product.price)}</del>
            <span className="discount-percentage badge bg-danger fw-bold ms-2">
              - {product.productDiscount}%
            </span>
          </>
        ) : (
          <span>{currencyFormatter.formatVND(product.price)}</span>
        )}
      </p>

      <p className="product-description">{product.description}</p>
    </div>
  );
};

export default ProductCard;
