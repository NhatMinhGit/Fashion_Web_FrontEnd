import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const MeasureGuideModal = () => {
  const [weight, setWeight] = useState(65);
  const [height, setHeight] = useState(170);
  const [gender, setGender] = useState("Nam");
  const [age, setAge] = useState(25);
  const [bodyType, setBodyType] = useState("Bình thường");
  const [fitPreference, setFitPreference] = useState("Mặc vừa");
  const [sizeRecommendation, setSizeRecommendation] = useState("");

  const calculateAndDisplaySize = () => {
    // Placeholder logic for size calculation (replace with real algorithm)
    let size = "M";
    if (weight < 50 || height < 160) size = "S";
    else if (weight > 75 || height > 180) size = "L";
    if (fitPreference === "Mặc rộng") size += " (loose fit)";
    if (fitPreference === "Mặc ôm") size += " (tight fit)";
    setSizeRecommendation(`Gợi ý Size của bạn là: ${size}`);
  };

  return (
    <div
      className="modal fade"
      id="measureGuideModal"
      tabIndex="-1"
      aria-labelledby="measureGuideModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header" style={{ backgroundColor: "#0e2433" }}>
            <div className="d-flex">
              <button
                type="button"
                className="btn btn-light"
                data-bs-toggle="modal"
                data-bs-target="#sizeGuideModal"
              >
                Hướng dẫn chọn size
              </button>
              <button
                type="button"
                className="btn btn-light ms-2"
                data-bs-toggle="modal"
                data-bs-target="#measureGuideModal"
              >
                Số đo sản phẩm
              </button>
            </div>
            <button
              type="button"
              className="btn-close text-white"
              data-bs-dismiss="modal"
              aria-label="Đóng"
            ></button>
          </div>
          <div className="modal-body">
            <div className="container mt-4">
              <h2>Tính Size</h2>
              <div className="mb-3">
                <label className="form-label">Cân nặng (kg):</label>
                <input
                  type="number"
                  className="form-control"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Chiều cao (cm):</label>
                <input
                  type="number"
                  className="form-control"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Giới tính:</label>
                <select
                  className="form-select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Độ tuổi:</label>
                <input
                  type="number"
                  className="form-control"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Dáng người của bạn:</label>
                <div className="d-flex">
                  {["Thon gon", "Bình thường", "Đầy đặn"].map((type) => (
                    <div className="form-check me-3" key={type}>
                      <input
                        type="radio"
                        className="form-check-input"
                        name="bodyType"
                        value={type}
                        checked={bodyType === type}
                        onChange={() => setBodyType(type)}
                      />
                      <label className="form-check-label">{type}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3">
                <label className="form-label">Nhu cầu mặc:</label>
                <div className="d-flex">
                  {["Mặc ôm", "Mặc vừa", "Mặc rộng"].map((fit) => (
                    <div className="form-check me-3" key={fit}>
                      <input
                        type="radio"
                        className="form-check-input"
                        name="fitPreference"
                        value={fit}
                        checked={fitPreference === fit}
                        onChange={() => setFitPreference(fit)}
                      />
                      <label className="form-check-label">{fit}</label>
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={calculateAndDisplaySize}
              >
                Tìm Size
              </button>
              <div id="sizeRecommendation" className="mt-3">
                {sizeRecommendation && (
                  <div className="alert alert-success">{sizeRecommendation}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasureGuideModal;
