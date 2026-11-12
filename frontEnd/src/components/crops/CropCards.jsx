import { useSelector } from "react-redux";
import wheatImg from "../../assets/crops/wheat.jpg";
import riceImg from "../../assets/crops/rice.jpg";
import cornImg from "../../assets/crops/corn.jpg";
import sugarcaneImg from "../../assets/crops/sugarcane.jpg";
import cottonImg from "../../assets/crops/cotton.jpg";
import potatoImg from "../../assets/crops/potato.jpg";

const cropData = {
  wheat: { img: wheatImg, desc: "Golden harvest." }, rice: { img: riceImg, desc: "Premium paddy." },
  corn: { img: cornImg, desc: "Sweet corn." }, sugarcane: { img: sugarcaneImg, desc: "Sugar source." },
  cotton: { img: cottonImg, desc: "White gold." }, potato: { img: potatoImg, desc: "Fresh potatoes." },
};
const defaultImg = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=500&q=80";

export default function CropCards() {
  const crops = useSelector((state) => state.crops.crops); // ✅

  return (
    <div className="mb-5 animate-fade-up">
      <h5 className="fw-bold mb-4">Featured Crops</h5>
      <div className="row g-4">
        {crops.map((crop) => {
          const data = cropData[crop.name.toLowerCase()] || { img: defaultImg, desc: "High quality crop." };
          return (
            <div className="col-md-6 col-xl-4" key={crop.id}>
              <div className="glass-card h-100 overflow-hidden" style={{ cursor: "pointer", transition: "all 0.4s ease" }}>
                <div className="position-relative" style={{ height: "180px" }}>
                  <img src={data.img} alt={crop.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.7))" }}></div>
                  <h4 className="position-absolute bottom-0 start-0 text-white fw-bold m-3">{crop.name}</h4>
                </div>
                <div className="p-4">
                  <p className="text-muted small mb-3">{data.desc}</p>
                  <div className="d-flex justify-content-between">
                    <span className="badge" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>{crop.field}</span>
                    <span className="fw-bold" style={{ color: crop.healthScore >= 80 ? "#2e7d32" : "#f59e0b" }}>{crop.healthScore}% Health</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}