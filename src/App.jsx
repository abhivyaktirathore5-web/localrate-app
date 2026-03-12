import { useState, useEffect, useRef } from "react";
import Login from "./Login.jsx";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const INDIA_LOCATIONS = {
  states: ["Maharashtra", "Karnataka", "Tamil Nadu", "Delhi", "Gujarat", "Rajasthan", "West Bengal"],
  cities: {
    Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
    Karnataka: ["Bengaluru", "Mysuru", "Hubli", "Mangaluru"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
    Delhi: ["New Delhi", "Dwarka", "Rohini", "Saket"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
    Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol"],
  },
  areas: {
    Mumbai: ["Andheri", "Bandra", "Dadar", "Juhu", "Worli", "Colaba"],
    Pune: ["Koregaon Park", "Kothrud", "Hinjewadi", "Viman Nagar", "Aundh"],
    Bengaluru: ["Indiranagar", "Koramangala", "HSR Layout", "Whitefield", "Jayanagar"],
    Chennai: ["T. Nagar", "Anna Nagar", "Adyar", "Velachery", "Mylapore"],
    "New Delhi": ["Connaught Place", "Lajpat Nagar", "Karol Bagh", "Hauz Khas", "Sarojini Nagar"],
    Ahmedabad: ["Navrangpura", "Satellite", "Vastrapur", "Maninagar", "CG Road"],
    Jaipur: ["Malviya Nagar", "Vaishali Nagar", "C-Scheme", "Mansarovar", "Jagatpura"],
    Kolkata: ["Park Street", "Salt Lake", "Behala", "Ballygunge", "Dumdum"],
    Nagpur: ["Dharampeth", "Sitabuldi", "Civil Lines", "Sadar", "Pratap Nagar"],
    Mysuru: ["Vijayanagar", "Kuvempunagar", "Saraswathipuram", "Jayalakshmipuram"],
    Hubli: ["Deshpande Nagar", "Vidyanagar", "Keshwapur"],
    Madurai: ["Anna Nagar", "KK Nagar", "Thirunagar"],
    Salem: ["Fairlands", "Suramangalam", "Alagapuram"],
    Dwarka: ["Sector 10", "Sector 12", "Sector 23"],
    Rohini: ["Sector 7", "Sector 9", "Sector 15"],
    Saket: ["Block A", "Block D", "Press Enclave"],
    Surat: ["Adajan", "Vesu", "Athwa", "Rander"],
    Vadodara: ["Alkapuri", "Fatehgunj", "Sayajigunj"],
    Rajkot: ["Kalawad Road", "Gondal Road", "Aajidam"],
    Jodhpur: ["Ratanada", "Shastri Nagar", "Pal"],
    Udaipur: ["Fatehpura", "Hiran Magri", "Pratap Nagar"],
    Kota: ["Talwandi", "Vigyan Nagar", "Mahaveer Nagar"],
    Howrah: ["Shibpur", "Liluah", "Bally"],
    Durgapur: ["City Centre", "Bidhannagar", "Benachity"],
    Asansol: ["Burnpur", "Kulti", "Raniganj"],
    Coimbatore: ["RS Puram", "Gandhipuram", "Peelamedu"],
    Nashik: ["Gangapur Road", "Cidco", "Satpur"],
    Mangaluru: ["Hampankatta", "Kadri", "Bejai"],
    Jayanagar: ["4th Block", "9th Block", "11th Main"],
    Whitefield: ["Varthur Road", "ITPL Road", "Marathahalli"],
    "HSR Layout": ["Sector 1", "Sector 2", "Sector 7"],
    Koramangala: ["1st Block", "5th Block", "8th Block"],
    Indiranagar: ["100 Feet Road", "12th Main", "CMH Road"],
    Velachery: ["VGP Layout", "Vijayanagar", "100 Feet Road"],
    Adyar: ["Gandhi Nagar", "Kasturba Nagar", "Besant Nagar"],
    "Anna Nagar": ["2nd Avenue", "4th Main Road", "Tower Park"],
    "T. Nagar": ["Pondy Bazaar", "Usman Road", "G.N. Chetty Road"],
    Mylapore: ["Luz", "R.K. Mutt Road", "Kutchery Road"],
  }
};

const CATEGORIES = ["All", "Restaurant", "Grocery", "Salon", "Medical", "Electronics", "Clothing", "Bakery", "Pharmacy", "Hardware"];

const SHOP_PHOTOS = {
  restaurant: ["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80", "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80", "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80"],
  grocery: ["https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80", "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=400&q=80", "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&q=80"],
  salon: ["https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80", "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&q=80", "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80"],
  medical: ["https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&q=80", "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80"],
  electronics: ["https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=400&q=80", "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80"],
  bakery: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80"],
  clothing: ["https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&q=80", "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80"],
  default: ["https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&q=80", "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=400&q=80"],
};

const getPhotos = (cat) => SHOP_PHOTOS[cat.toLowerCase()] || SHOP_PHOTOS.default;

const INITIAL_SHOPS = [
  { id: 1, name: "Sharma's Kitchen", owner: "Ramesh Sharma", category: "Restaurant", state: "Maharashtra", city: "Pune", area: "Koregaon Park", address: "12, Lane 5, Koregaon Park", phone: "9876543210", ratings: [{user:"Priya M", stars:5, review:"Amazing food and quick service!", date:"2024-12-01"},{user:"Arjun K", stars:4, review:"Tasty but a bit pricey.", date:"2024-12-05"},{user:"Sneha R", stars:5, review:"Best dal makhani in Pune!", date:"2024-12-10"}], photos: getPhotos("restaurant"), avgRating: 4.7, totalRatings: 3 },
  { id: 2, name: "Fresh Mart", owner: "Sunil Patil", category: "Grocery", state: "Maharashtra", city: "Pune", area: "Koregaon Park", address: "Shop 3, DP Road", phone: "9765432109", ratings: [{user:"Meera S", stars:4, review:"Good variety, fresh vegetables.", date:"2024-12-02"},{user:"Rahul P", stars:3, review:"Average quality but convenient location.", date:"2024-12-08"}], photos: getPhotos("grocery"), avgRating: 3.5, totalRatings: 2 },
  { id: 3, name: "Glamour Studio", owner: "Kavita Joshi", category: "Salon", state: "Maharashtra", city: "Pune", area: "Viman Nagar", address: "14, Airport Road", phone: "9654321098", ratings: [{user:"Ananya T", stars:5, review:"Excellent haircut, very professional.", date:"2024-12-03"}], photos: getPhotos("salon"), avgRating: 5.0, totalRatings: 1 },
  { id: 4, name: "City Medical Store", owner: "Dr. Anil Gupta", category: "Pharmacy", state: "Karnataka", city: "Bengaluru", area: "Indiranagar", address: "100 Feet Road, No. 8", phone: "9543210987", ratings: [{user:"Vikram N", stars:4, review:"All medicines available, helpful staff.", date:"2024-12-04"},{user:"Lakshmi B", stars:5, review:"Open 24 hours, lifesaver!", date:"2024-12-09"},{user:"Rohan S", stars:4, review:"Quick service.", date:"2024-12-11"}], photos: getPhotos("medical"), avgRating: 4.3, totalRatings: 3 },
  { id: 5, name: "TechZone Electronics", owner: "Manoj Verma", category: "Electronics", state: "Karnataka", city: "Bengaluru", area: "Koramangala", address: "5th Block, 12th Main", phone: "9432109876", ratings: [{user:"Kiran D", stars:3, review:"Good products but overpriced.", date:"2024-12-06"}], photos: getPhotos("electronics"), avgRating: 3.0, totalRatings: 1 },
  { id: 6, name: "Delhi Sweets & Bakery", owner: "Harish Lal", category: "Bakery", state: "Delhi", city: "New Delhi", area: "Connaught Place", address: "Block B, CP Inner Circle", phone: "9321098765", ratings: [{user:"Pooja A", stars:5, review:"Best samosa in Delhi!", date:"2024-12-07"},{user:"Amit S", stars:5, review:"Fresh and delicious.", date:"2024-12-10"}], photos: getPhotos("bakery"), avgRating: 5.0, totalRatings: 2 },
  { id: 7, name: "Trendy Threads", owner: "Neha Kapoor", category: "Clothing", state: "Delhi", city: "New Delhi", area: "Lajpat Nagar", address: "Central Market, Lajpat Nagar II", phone: "9210987654", ratings: [{user:"Divya M", stars:4, review:"Nice collection at good prices.", date:"2024-12-08"},{user:"Sanjay K", stars:3, review:"Limited stock sometimes.", date:"2024-12-12"}], photos: getPhotos("clothing"), avgRating: 3.5, totalRatings: 2 },
  { id: 8, name: "Nair's Restaurant", owner: "Thomas Nair", category: "Restaurant", state: "Tamil Nadu", city: "Chennai", area: "T. Nagar", address: "Pondy Bazaar, Shop 22", phone: "9109876543", ratings: [{user:"Geetha R", stars:4, review:"Authentic Kerala food.", date:"2024-12-09"},{user:"Balaji V", stars:5, review:"Best fish curry ever!", date:"2024-12-13"}], photos: getPhotos("restaurant"), avgRating: 4.5, totalRatings: 2 },
];

// ─── UTILITIES ────────────────────────────────────────────────────────────────
const calcAvg = (ratings) => ratings.length ? (ratings.reduce((s, r) => s + r.stars, 0) / ratings.length) : 0;
const StarDisplay = ({ rating, size = 16, interactive = false, onRate }) => {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1,2,3,4,5].map(s => (
        <span key={s}
          onClick={() => interactive && onRate && onRate(s)}
          onMouseEnter={() => interactive && setHover(s)}
          onMouseLeave={() => interactive && setHover(0)}
          style={{ fontSize: size, cursor: interactive ? "pointer" : "default", color: s <= (hover || rating) ? "#FF6B2B" : "#e0d6cc", transition: "color 0.15s", lineHeight: 1 }}>★</span>
      ))}
    </div>
  );
};

const RatingBar = ({ label, count, total }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
    <span style={{ fontSize: 12, color: "#888", width: 16, textAlign: "right" }}>{label}</span>
    <span style={{ color: "#FF6B2B", fontSize: 11 }}>★</span>
    <div style={{ flex: 1, background: "#f0ebe4", borderRadius: 4, height: 8, overflow: "hidden" }}>
      <div style={{ width: total ? `${(count/total)*100}%` : "0%", height: "100%", background: "linear-gradient(90deg,#FF6B2B,#FFB347)", borderRadius: 4, transition: "width 0.5s" }} />
    </div>
    <span style={{ fontSize: 11, color: "#aaa", width: 18 }}>{count}</span>
  </div>
);

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function LocalRateApp() {
  const [page, setPage] = useState("home"); // home | browse | shop | admin | login
  const [shops, setShops] = useState(INITIAL_SHOPS);
    const [currentUser, setCurrentUser] = useState(null);

  if (!currentUser) {
    return <Login onLogin={(user) => setCurrentUser(user)} />;
  }
  const [filters, setFilters] = useState({ state: "", city: "", area: "", category: "All", search: "" });
  const [selectedShop, setSelectedShop] = useState(null);
  const [adminTab, setAdminTab] = useState("shops");
  const [toast, setToast] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [photoModal, setPhotoModal] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const filteredShops = shops.filter(s => {
    if (filters.state && s.state !== filters.state) return false;
    if (filters.city && s.city !== filters.city) return false;
    if (filters.area && s.area !== filters.area) return false;
    if (filters.category !== "All" && s.category !== filters.category) return false;
    if (filters.search && !s.name.toLowerCase().includes(filters.search.toLowerCase()) && !s.owner.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const openShop = (shop) => { setSelectedShop(shop); setPage("shop"); };

  return (
    <div style={{ fontFamily: "'Outfit', 'Segoe UI', sans-serif", background: "#FBF7F2", minHeight: "100vh", color: "#1a1206" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:wght@600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-thumb { background: #e0d0c0; border-radius: 3px; }
        .shop-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(255,107,43,0.15) !important; }
        .shop-card { transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1); }
        .btn-primary { background: linear-gradient(135deg,#FF6B2B,#e85a1a); color: #fff; border: none; border-radius: 10px; padding: 12px 24px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: inherit; }
        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(255,107,43,0.35); }
        .btn-ghost { background: transparent; border: 1.5px solid #e8ddd4; border-radius: 10px; padding: 10px 20px; font-size: 14px; font-weight: 500; cursor: pointer; color: #555; transition: all 0.2s; font-family: inherit; }
        .btn-ghost:hover { border-color: #FF6B2B; color: #FF6B2B; background: #fff8f4; }
        .input-field { width: 100%; background: #fff; border: 1.5px solid #e8ddd4; border-radius: 10px; padding: 11px 14px; font-size: 14px; outline: none; transition: border 0.2s; font-family: inherit; color: #1a1206; }
        .input-field:focus { border-color: #FF6B2B; box-shadow: 0 0 0 3px rgba(255,107,43,0.08); }
        select.input-field { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23999' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px; cursor: pointer; }
        .nav-link { color: #555; text-decoration: none; font-weight: 500; font-size: 14px; padding: 6px 12px; border-radius: 8px; transition: all 0.2s; cursor: pointer; }
        .nav-link:hover, .nav-link.active { color: #FF6B2B; background: #fff4ee; }
        .tab-btn { padding: 8px 20px; border-radius: 8px; border: none; font-family: inherit; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .tab-btn.active { background: #FF6B2B; color: #fff; }
        .tab-btn:not(.active) { background: #f0ebe4; color: #888; }
        .badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.3px; }
        .photo-thumb { width: 100%; aspect-ratio: 4/3; object-fit: cover; border-radius: 10px; cursor: pointer; transition: transform 0.2s; }
        .photo-thumb:hover { transform: scale(1.03); }
        @keyframes slideUp { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        .animate-in { animation: slideUp 0.4s ease forwards; }
        .toast { position: fixed; bottom: 24px; right: 24px; z-index: 9999; padding: 14px 22px; border-radius: 12px; font-weight: 600; font-size: 14px; animation: slideUp 0.3s ease; box-shadow: 0 8px 30px rgba(0,0,0,0.15); }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } .mobile-menu-btn { display: flex !important; } }
        @media (min-width: 769px) { .mobile-menu-btn { display: none !important; } .desktop-nav { display: flex !important; } }
        .star-big { font-size: 36px; cursor: pointer; transition: all 0.15s; color: #e0d6cc; line-height: 1; }
        .star-big:hover, .star-big.active { color: #FF6B2B; transform: scale(1.2); }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #f0e8e0", position: "sticky", top: 0, zIndex: 100, padding: "0 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setPage("home")}>
            <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#FF6B2B,#e85a1a)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⭐</div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 22, color: "#1a1206" }}>LocalRate</span>
            <span style={{ fontSize: 11, background: "#fff4ee", color: "#FF6B2B", border: "1px solid #ffd8c0", borderRadius: 6, padding: "2px 7px", fontWeight: 600 }}>INDIA</span>
          </div>
          <div className="desktop-nav" style={{ alignItems: "center", gap: 4 }}>
            <span className={`nav-link ${page==="home"?"active":""}`} onClick={() => setPage("home")}>Home</span>
            <span className={`nav-link ${page==="browse"?"active":""}`} onClick={() => setPage("browse")}>Browse Shops</span>
            <span className={`nav-link ${page==="admin"?"active":""}`} onClick={() => setPage("admin")}>Admin Panel</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ textAlign: "right", display: "flex", flexDirection: "column" }} className="desktop-nav">
              <span style={{ fontSize: 13, fontWeight: 600, color: "#1a1206" }}>{currentUser.name}</span>
              <span style={{ fontSize: 11, color: "#aaa" }}>📞 {currentUser.phone}</span>
            </div>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#FF6B2B,#FFB347)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 15 }}>{currentUser.name[0]}</div>
            <button className="mobile-menu-btn" onClick={() => setMobileMenu(!mobileMenu)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#555" }}>☰</button>
          </div>
        </div>
        {mobileMenu && (
          <div style={{ borderTop: "1px solid #f0e8e0", padding: "12px 0", display: "flex", flexDirection: "column", gap: 4 }}>
            {["home","browse","admin"].map(p => (
              <span key={p} className="nav-link" style={{ display: "block", padding: "10px 16px", textTransform: "capitalize" }} onClick={() => { setPage(p); setMobileMenu(false); }}>{p === "browse" ? "Browse Shops" : p === "admin" ? "Admin Panel" : "Home"}</span>
            ))}
          </div>
        )}
      </nav>

      {/* TOAST */}
      {toast && <div className="toast" style={{ background: toast.type === "success" ? "#22c55e" : "#ef4444", color: "#fff" }}>{toast.type === "success" ? "✓ " : "✗ "}{toast.msg}</div>}

      {/* PHOTO MODAL */}
      {photoModal && (
        <div onClick={() => setPhotoModal(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeIn 0.2s" }}>
          <img src={photoModal} alt="shop" style={{ maxWidth: "90vw", maxHeight: "88vh", borderRadius: 16, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }} onClick={e => e.stopPropagation()} />
          <button onClick={() => setPhotoModal(null)} style={{ position: "absolute", top: 24, right: 24, background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", width: 44, height: 44, borderRadius: "50%", fontSize: 20, cursor: "pointer" }}>×</button>
        </div>
      )}

      {/* PAGES */}
      {page === "home" && <HomePage shops={shops} setPage={setPage} setFilters={setFilters} openShop={openShop} />}
      {page === "browse" && <BrowsePage shops={filteredShops} allShops={shops} filters={filters} setFilters={setFilters} openShop={openShop} />}
      {page === "shop" && selectedShop && <ShopPage shop={shops.find(s=>s.id===selectedShop.id)||selectedShop} shops={shops} setShops={setShops} currentUser={currentUser} setPage={setPage} setFilters={setFilters} openShop={openShop} showToast={showToast} setPhotoModal={setPhotoModal} />}
      {page === "admin" && <AdminPage shops={shops} setShops={setShops} showToast={showToast} setPhotoModal={setPhotoModal} />}
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ shops, setPage, setFilters, openShop }) {
  const topShops = [...shops].sort((a,b) => b.avgRating - a.avgRating).slice(0,4);
  const [qs, setQs] = useState("");
  const totalRatings = shops.reduce((s,sh) => s + sh.totalRatings, 0);

  return (
    <div>
      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg,#1a0a00 0%,#3d1500 50%,#2a0d00 100%)", padding: "80px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,107,43,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,179,71,0.1) 0%, transparent 40%)" }} />
        <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }} className="animate-in">
          <div style={{ display: "inline-block", background: "rgba(255,107,43,0.15)", border: "1px solid rgba(255,107,43,0.3)", borderRadius: 30, padding: "6px 18px", marginBottom: 20 }}>
            <span style={{ color: "#FFB347", fontSize: 13, fontWeight: 600 }}>🇮🇳 Discover & Rate Local Shops Across India</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: 16 }}>
            Your <span style={{ color: "#FF6B2B" }}>Neighbourhood</span><br/>Deserves Better Ratings
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 17, marginBottom: 36, lineHeight: 1.7 }}>Find the best local shops, restaurants, salons & more — rated by real people in your area.</p>
          <div style={{ display: "flex", gap: 12, maxWidth: 500, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
            <input value={qs} onChange={e=>setQs(e.target.value)} placeholder="Search shops, restaurants, salons..." style={{ flex: 1, minWidth: 240, padding: "14px 18px", borderRadius: 12, border: "none", fontSize: 15, outline: "none", fontFamily: "inherit" }} onKeyDown={e => { if(e.key==="Enter"){ setFilters(f=>({...f,search:qs})); setPage("browse"); }}} />
            <button className="btn-primary" style={{ padding: "14px 28px" }} onClick={() => { setFilters(f=>({...f,search:qs})); setPage("browse"); }}>Search</button>
          </div>
          <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 48, flexWrap: "wrap" }}>
            {[["🏪", shops.length, "Shops Listed"],["⭐", totalRatings, "Reviews Given"],["📍", "7", "States Covered"]].map(([icon,val,label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28 }}>{icon}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", fontFamily: "'Playfair Display', serif" }}>{val}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CATEGORY QUICK FILTERS */}
      <div style={{ background: "#fff", padding: "24px", borderBottom: "1px solid #f0e8e0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 4 }}>
            {[["🍛","Restaurant"],["🛒","Grocery"],["💇","Salon"],["💊","Pharmacy"],["📱","Electronics"],["🎂","Bakery"],["👗","Clothing"],["🔧","Hardware"]].map(([icon,cat]) => (
              <button key={cat} onClick={() => { setFilters(f=>({...f,category:cat})); setPage("browse"); }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "14px 20px", background: "#FBF7F2", border: "1.5px solid #f0e8e0", borderRadius: 14, cursor: "pointer", minWidth: 80, transition: "all 0.2s", fontFamily: "inherit" }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="#FF6B2B";e.currentTarget.style.background="#fff8f4";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="#f0e8e0";e.currentTarget.style.background="#FBF7F2";}}>
                <span style={{ fontSize: 24 }}>{icon}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#555", whiteSpace: "nowrap" }}>{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TOP RATED */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 }}>
          <div>
            <p style={{ color: "#FF6B2B", fontWeight: 600, fontSize: 13, marginBottom: 6, letterSpacing: 0.5 }}>HANDPICKED FOR YOU</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700 }}>Top Rated Shops</h2>
          </div>
          <button className="btn-ghost" onClick={() => setPage("browse")}>View All →</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
          {topShops.map(shop => <ShopCard key={shop.id} shop={shop} onClick={() => openShop(shop)} />)}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ background: "#1a0a00", padding: "60px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#fff", marginBottom: 12 }}>How LocalRate Works</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 48 }}>Simple, honest, community-driven ratings</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
            {[["📍","Pick Your Area","Select state, city and area to discover shops near you"],["🏪","Browse Shops","See all local shops with photos, details & category filters"],["⭐","Rate & Review","Give stars and share your honest experience"],["🏆","Help Community","Your reviews help others find the best local businesses"]].map(([icon,title,desc],i) => (
              <div key={i} style={{ padding: 28, background: "rgba(255,255,255,0.04)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{icon}</div>
                <h3 style={{ color: "#fff", fontWeight: 700, marginBottom: 8, fontSize: 16 }}>{title}</h3>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── BROWSE PAGE ──────────────────────────────────────────────────────────────
function BrowsePage({ shops, allShops, filters, setFilters, openShop }) {
  const cities = filters.state ? (INDIA_LOCATIONS.cities[filters.state] || []) : [];
  const areas = filters.city ? (INDIA_LOCATIONS.areas[filters.city] || []) : [];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 3vw, 2rem)", marginBottom: 24 }}>Browse Shops</h1>

      {/* FILTERS */}
      <div style={{ background: "#fff", borderRadius: 16, padding: 20, marginBottom: 28, border: "1px solid #f0e8e0", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 12 }}>
          <select className="input-field" value={filters.state} onChange={e => setFilters(f=>({...f,state:e.target.value,city:"",area:""}))}>
            <option value="">All States</option>
            {INDIA_LOCATIONS.states.map(s => <option key={s}>{s}</option>)}
          </select>
          <select className="input-field" value={filters.city} onChange={e => setFilters(f=>({...f,city:e.target.value,area:""}))} disabled={!filters.state}>
            <option value="">All Cities</option>
            {cities.map(c => <option key={c}>{c}</option>)}
          </select>
          <select className="input-field" value={filters.area} onChange={e => setFilters(f=>({...f,area:e.target.value}))} disabled={!filters.city}>
            <option value="">All Areas</option>
            {areas.map(a => <option key={a}>{a}</option>)}
          </select>
          <select className="input-field" value={filters.category} onChange={e => setFilters(f=>({...f,category:e.target.value}))}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <input className="input-field" style={{ flex: 1, minWidth: 200 }} placeholder="🔍  Search by shop name or owner..." value={filters.search} onChange={e => setFilters(f=>({...f,search:e.target.value}))} />
          <button className="btn-ghost" onClick={() => setFilters({ state:"", city:"", area:"", category:"All", search:"" })}>Clear Filters</button>
        </div>
      </div>

      <div style={{ marginBottom: 20, color: "#888", fontSize: 14 }}>
        Showing <strong style={{ color: "#1a1206" }}>{shops.length}</strong> of {allShops.length} shops
        {(filters.area || filters.city || filters.state) && <span> in <strong style={{ color: "#FF6B2B" }}>{[filters.area, filters.city, filters.state].filter(Boolean).join(", ")}</strong></span>}
      </div>

      {shops.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 20px", background: "#fff", borderRadius: 16, border: "1px solid #f0e8e0" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🔍</div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", marginBottom: 8 }}>No shops found</h3>
          <p style={{ color: "#aaa" }}>Try adjusting your filters or search term</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 20 }}>
          {shops.map(shop => <ShopCard key={shop.id} shop={shop} onClick={() => openShop(shop)} />)}
        </div>
      )}
    </div>
  );
}

// ─── SHOP CARD ────────────────────────────────────────────────────────────────
function ShopCard({ shop, onClick }) {
  const catColors = { Restaurant:"#FF6B2B", Grocery:"#22c55e", Salon:"#a855f7", Pharmacy:"#3b82f6", Electronics:"#f59e0b", Bakery:"#ec4899", Clothing:"#14b8a6", Hardware:"#78716c", Medical:"#3b82f6" };
  const col = catColors[shop.category] || "#888";
  return (
    <div className="shop-card" onClick={onClick} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #f0e8e0", cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
      <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
        <img src={shop.photos[0]} alt={shop.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", top: 12, left: 12 }}>
          <span className="badge" style={{ background: col, color: "#fff" }}>{shop.category}</span>
        </div>
        <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", borderRadius: 8, padding: "4px 10px", display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ color: "#FFB347", fontSize: 13 }}>★</span>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>{shop.avgRating.toFixed(1)}</span>
        </div>
      </div>
      <div style={{ padding: "16px 18px" }}>
        <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 4, color: "#1a1206" }}>{shop.name}</h3>
        <p style={{ fontSize: 12, color: "#999", marginBottom: 10 }}>👤 {shop.owner}</p>
        <p style={{ fontSize: 12, color: "#aaa", marginBottom: 12 }}>📍 {shop.area}, {shop.city}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <StarDisplay rating={shop.avgRating} size={13} />
          <span style={{ fontSize: 12, color: "#aaa" }}>{shop.totalRatings} review{shop.totalRatings !== 1 ? "s" : ""}</span>
        </div>
      </div>
    </div>
  );
}

// ─── SHOP DETAIL PAGE ─────────────────────────────────────────────────────────
function ShopPage({ shop, shops, setShops, currentUser, setPage, setFilters, openShop, showToast, setPhotoModal }) {
  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);
  const alreadyRated = shop.ratings.some(r => r.user === currentUser.name);

  const ratingCounts = [5,4,3,2,1].map(s => ({ star: s, count: shop.ratings.filter(r=>r.stars===s).length }));

  const handleSubmitRating = () => {
    if (newRating === 0) { showToast("Please select a star rating", "error"); return; }
    setSubmitting(true);
    setTimeout(() => {
      const newRatingObj = { user: currentUser.name, stars: newRating, review: newReview || "No written review.", date: new Date().toISOString().split("T")[0] };
      setShops(prev => prev.map(s => {
        if (s.id !== shop.id) return s;
        const updated = [...s.ratings, newRatingObj];
        return { ...s, ratings: updated, avgRating: parseFloat(calcAvg(updated).toFixed(1)), totalRatings: updated.length };
      }));
      setNewRating(0); setNewReview(""); setSubmitting(false);
      showToast("Your rating has been submitted!");
    }, 800);
  };

  const nearbyShops = shops.filter(s => s.id !== shop.id && s.area === shop.area).slice(0,3);

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }}>
      <button onClick={() => setPage("browse")} style={{ background: "none", border: "none", cursor: "pointer", color: "#FF6B2B", fontWeight: 600, fontSize: 14, marginBottom: 20, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>← Back to Browse</button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        {/* LEFT */}
        <div>
          {/* PHOTO GALLERY */}
          <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 12, position: "relative", height: 280 }}>
            <img src={shop.photos[activePhoto]} alt={shop.name} style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "zoom-in" }} onClick={() => setPhotoModal(shop.photos[activePhoto])} />
            <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
              {shop.photos.map((_,i) => <div key={i} onClick={() => setActivePhoto(i)} style={{ width: i===activePhoto?20:8, height: 8, borderRadius: 4, background: i===activePhoto?"#FF6B2B":"rgba(255,255,255,0.7)", cursor: "pointer", transition: "all 0.2s" }} />)}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {shop.photos.map((p,i) => (
              <img key={i} src={p} alt="" style={{ flex: 1, height: 70, objectFit: "cover", borderRadius: 10, cursor: "pointer", border: i===activePhoto?"2px solid #FF6B2B":"2px solid transparent", transition: "border 0.2s" }} onClick={() => setActivePhoto(i)} />
            ))}
          </div>

          {/* SHOP INFO */}
          <div style={{ background: "#fff", borderRadius: 16, padding: 20, marginTop: 20, border: "1px solid #f0e8e0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, marginBottom: 4 }}>{shop.name}</h1>
                <p style={{ color: "#888", fontSize: 13 }}>👤 Owned by <strong>{shop.owner}</strong></p>
              </div>
              <span className="badge" style={{ background: "#fff4ee", color: "#FF6B2B", border: "1px solid #ffd8c0", fontSize: 12 }}>{shop.category}</span>
            </div>
            {[["📍", `${shop.address}, ${shop.area}`],["🌆", `${shop.city}, ${shop.state}`],["📞", shop.phone]].map(([icon,val]) => (
              <div key={icon} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                <span>{icon}</span><span style={{ fontSize: 13, color: "#555" }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div>
          {/* RATING SUMMARY */}
          <div style={{ background: "#fff", borderRadius: 16, padding: 24, marginBottom: 20, border: "1px solid #f0e8e0" }}>
            <h2 style={{ fontWeight: 700, marginBottom: 16, fontSize: 16 }}>Rating Summary</h2>
            <div style={{ display: "flex", gap: 24, alignItems: "center", marginBottom: 20 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, fontWeight: 700, color: "#FF6B2B", lineHeight: 1 }}>{shop.avgRating.toFixed(1)}</div>
                <StarDisplay rating={shop.avgRating} size={18} />
                <div style={{ color: "#aaa", fontSize: 12, marginTop: 4 }}>{shop.totalRatings} reviews</div>
              </div>
              <div style={{ flex: 1 }}>
                {ratingCounts.map(({star,count}) => <RatingBar key={star} label={star} count={count} total={shop.totalRatings} />)}
              </div>
            </div>
          </div>

          {/* RATE THIS SHOP */}
          <div style={{ background: "#fff", borderRadius: 16, padding: 24, marginBottom: 20, border: "1px solid #f0e8e0" }}>
            <h2 style={{ fontWeight: 700, marginBottom: 16, fontSize: 16 }}>Rate This Shop</h2>
            {alreadyRated ? (
              <div style={{ textAlign: "center", padding: "20px", background: "#f0fff4", borderRadius: 12, color: "#22c55e" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>✓</div>
                <p style={{ fontWeight: 600 }}>You've already rated this shop</p>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", gap: 4, marginBottom: 16, justifyContent: "center" }}>
                  {[1,2,3,4,5].map(s => (
                    <span key={s} className={`star-big ${s<=newRating?"active":""}`} onClick={() => setNewRating(s)}>★</span>
                  ))}
                </div>
                {newRating > 0 && <p style={{ textAlign: "center", fontSize: 13, color: "#FF6B2B", marginBottom: 12, fontWeight: 600 }}>{["","Terrible","Poor","Average","Good","Excellent!"][newRating]}</p>}
                <textarea className="input-field" rows={3} placeholder="Share your experience (optional)..." value={newReview} onChange={e=>setNewReview(e.target.value)} style={{ marginBottom: 12, resize: "none" }} />
                <button className="btn-primary" style={{ width: "100%" }} onClick={handleSubmitRating} disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Rating"}
                </button>
              </>
            )}
          </div>

          {/* REVIEWS */}
          <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f0e8e0", maxHeight: 320, overflowY: "auto" }}>
            <h2 style={{ fontWeight: 700, marginBottom: 16, fontSize: 16 }}>Customer Reviews</h2>
            {shop.ratings.length === 0 ? (
              <p style={{ color: "#aaa", textAlign: "center", padding: 20 }}>No reviews yet. Be the first!</p>
            ) : [...shop.ratings].reverse().map((r,i) => (
              <div key={i} style={{ borderBottom: i<shop.ratings.length-1?"1px solid #f5f0eb":"none", paddingBottom: 14, marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: `hsl(${r.user.charCodeAt(0)*7},50%,60%)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700 }}>{r.user[0]}</div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 13 }}>{r.user}</p>
                      <StarDisplay rating={r.stars} size={11} />
                    </div>
                  </div>
                  <span style={{ fontSize: 11, color: "#ccc" }}>{r.date}</span>
                </div>
                <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>{r.review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NEARBY SHOPS */}
      {nearbyShops.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", marginBottom: 20 }}>More Shops in {shop.area}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 16 }}>
            {nearbyShops.map(s => <ShopCard key={s.id} shop={s} onClick={() => openShop(s)} />)}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ADMIN PAGE ───────────────────────────────────────────────────────────────
function AdminPage({ shops, setShops, showToast, setPhotoModal }) {
  const [tab, setTab] = useState("shops");
  const [form, setForm] = useState({ name:"", owner:"", category:"Restaurant", state:"", city:"", area:"", address:"", phone:"" });
  const [editId, setEditId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [search, setSearch] = useState("");
  const fileRef = useRef();
  const [uploadShopId, setUploadShopId] = useState(null);

  const cities = form.state ? (INDIA_LOCATIONS.cities[form.state] || []) : [];
  const areas = form.city ? (INDIA_LOCATIONS.areas[form.city] || []) : [];

  const filteredShops = shops.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.owner.toLowerCase().includes(search.toLowerCase()));

  const handleSave = () => {
    if (!form.name || !form.owner || !form.state || !form.city) { showToast("Please fill all required fields", "error"); return; }
    if (editId) {
      setShops(prev => prev.map(s => s.id === editId ? { ...s, ...form } : s));
      showToast("Shop updated successfully!"); setEditId(null);
    } else {
      const cat = form.category.toLowerCase();
      const newShop = { ...form, id: Date.now(), ratings: [], photos: getPhotos(cat), avgRating: 0, totalRatings: 0 };
      setShops(prev => [...prev, newShop]);
      showToast("Shop added successfully!");
    }
    setForm({ name:"", owner:"", category:"Restaurant", state:"", city:"", area:"", address:"", phone:"" });
  };

  const handleEdit = (shop) => {
    setEditId(shop.id);
    setForm({ name:shop.name, owner:shop.owner, category:shop.category, state:shop.state, city:shop.city, area:shop.area, address:shop.address, phone:shop.phone });
    setTab("add");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    setShops(prev => prev.filter(s => s.id !== id));
    setDeleteConfirm(null);
    showToast("Shop deleted.");
  };

  const handlePhotoUpload = (e, shopId) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setShops(prev => prev.map(s => s.id === shopId ? { ...s, photos: [...s.photos, url] } : s));
    showToast("Photo uploaded!");
    e.target.value = "";
  };

  const totalRatings = shops.reduce((s,sh) => s + sh.totalRatings, 0);
  const avgOverall = shops.length ? (shops.reduce((s,sh)=>s+sh.avgRating,0)/shops.length).toFixed(1) : "0";

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <div>
          <p style={{ color: "#FF6B2B", fontWeight: 600, fontSize: 12, marginBottom: 4, letterSpacing: 0.5 }}>DASHBOARD</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem,3vw,2rem)" }}>Admin Panel</h1>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["shops","add","photos"].map(t => (
            <button key={t} className={`tab-btn ${tab===t?"active":""}`} onClick={() => { setTab(t); if(t!=="add"){setEditId(null);setForm({name:"",owner:"",category:"Restaurant",state:"",city:"",area:"",address:"",phone:""})} }}>
              {t === "shops" ? "📋 All Shops" : t === "add" ? (editId?"✏️ Edit Shop":"➕ Add Shop") : "📸 Photos"}
            </button>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 28 }}>
        {[["🏪","Total Shops",shops.length,"#FF6B2B"],["⭐","Total Reviews",totalRatings,"#f59e0b"],["📈","Avg Rating",avgOverall,"#22c55e"],["🗺️","States",new Set(shops.map(s=>s.state)).size,"#3b82f6"]].map(([icon,label,val,col]) => (
          <div key={label} style={{ background: "#fff", borderRadius: 14, padding: "20px 24px", border: "1px solid #f0e8e0", borderLeft: `4px solid ${col}` }}>
            <div style={{ fontSize: 26, marginBottom: 6 }}>{icon}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: col }}>{val}</div>
            <div style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* TAB: ALL SHOPS */}
      {tab === "shops" && (
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f0e8e0", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f5f0eb", display: "flex", gap: 12, alignItems: "center" }}>
            <input className="input-field" style={{ maxWidth: 320 }} placeholder="🔍  Search shops..." value={search} onChange={e=>setSearch(e.target.value)} />
            <span style={{ marginLeft: "auto", fontSize: 13, color: "#aaa" }}>{filteredShops.length} shops</span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "#faf6f2" }}>
                  {["Shop Name","Owner","Category","Location","Rating","Reviews","Actions"].map(h => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#888", fontSize: 12, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredShops.map((shop,i) => (
                  <tr key={shop.id} style={{ borderTop: "1px solid #f5f0eb", background: i%2===0?"#fff":"#fdfbf8" }}>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <img src={shop.photos[0]} alt="" style={{ width: 36, height: 36, borderRadius: 8, objectFit: "cover" }} />
                        <span style={{ fontWeight: 600 }}>{shop.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px", color: "#555" }}>{shop.owner}</td>
                    <td style={{ padding: "12px 16px" }}><span className="badge" style={{ background: "#fff4ee", color: "#FF6B2B", border: "1px solid #ffd8c0" }}>{shop.category}</span></td>
                    <td style={{ padding: "12px 16px", color: "#888", fontSize: 12 }}>{shop.area && `${shop.area}, `}{shop.city}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ color: "#FF6B2B", fontWeight: 700 }}>★ {shop.avgRating.toFixed(1)}</span>
                    </td>
                    <td style={{ padding: "12px 16px", color: "#888" }}>{shop.totalRatings}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => handleEdit(shop)} style={{ padding: "5px 12px", borderRadius: 7, border: "1px solid #e0d6cc", background: "#fff", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>Edit</button>
                        <button onClick={() => setDeleteConfirm(shop.id)} style={{ padding: "5px 12px", borderRadius: 7, border: "1px solid #fecaca", background: "#fff8f8", color: "#ef4444", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* DELETE CONFIRM */}
          {deleteConfirm && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ background: "#fff", borderRadius: 16, padding: 32, maxWidth: 360, width: "90%", textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🗑️</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", marginBottom: 8 }}>Delete this shop?</h3>
                <p style={{ color: "#888", marginBottom: 24, fontSize: 14 }}>This action cannot be undone. All ratings and photos will be permanently lost.</p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                  <button className="btn-ghost" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                  <button className="btn-primary" style={{ background: "#ef4444" }} onClick={() => handleDelete(deleteConfirm)}>Yes, Delete</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB: ADD/EDIT SHOP */}
      {tab === "add" && (
        <div style={{ background: "#fff", borderRadius: 16, padding: 32, border: "1px solid #f0e8e0", maxWidth: 700 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", marginBottom: 24, fontSize: "1.3rem" }}>{editId ? "Edit Shop Details" : "Add a New Shop"}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[["Shop Name *","name","text"],["Owner Name *","owner","text"],["Phone","phone","tel"],["Address","address","text"]].map(([lbl,key,type]) => (
              <div key={key}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#888", display: "block", marginBottom: 5 }}>{lbl}</label>
                <input className="input-field" type={type} placeholder={lbl.replace(" *","")} value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))} />
              </div>
            ))}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#888", display: "block", marginBottom: 5 }}>Category</label>
              <select className="input-field" value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>
                {CATEGORIES.filter(c=>c!=="All").map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#888", display: "block", marginBottom: 5 }}>State *</label>
              <select className="input-field" value={form.state} onChange={e=>setForm(f=>({...f,state:e.target.value,city:"",area:""}))}>
                <option value="">Select State</option>
                {INDIA_LOCATIONS.states.map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#888", display: "block", marginBottom: 5 }}>City *</label>
              <select className="input-field" value={form.city} onChange={e=>setForm(f=>({...f,city:e.target.value,area:""}))} disabled={!form.state}>
                <option value="">Select City</option>
                {cities.map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#888", display: "block", marginBottom: 5 }}>Area</label>
              <select className="input-field" value={form.area} onChange={e=>setForm(f=>({...f,area:e.target.value}))} disabled={!form.city}>
                <option value="">Select Area</option>
                {areas.map(a=><option key={a}>{a}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            <button className="btn-primary" onClick={handleSave}>{editId ? "💾 Save Changes" : "➕ Add Shop"}</button>
            {editId && <button className="btn-ghost" onClick={() => { setEditId(null); setForm({name:"",owner:"",category:"Restaurant",state:"",city:"",area:"",address:"",phone:""}); setTab("shops"); }}>Cancel</button>}
          </div>
        </div>
      )}

      {/* TAB: PHOTOS */}
      {tab === "photos" && (
        <div>
          <input type="file" ref={fileRef} accept="image/*" style={{ display: "none" }} onChange={e => handlePhotoUpload(e, uploadShopId)} />
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {shops.map(shop => (
              <div key={shop.id} style={{ background: "#fff", borderRadius: 16, padding: 20, border: "1px solid #f0e8e0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: 15 }}>{shop.name}</h3>
                    <p style={{ color: "#aaa", fontSize: 12 }}>{shop.photos.length} photo{shop.photos.length!==1?"s":""}</p>
                  </div>
                  <button className="btn-primary" style={{ padding: "8px 18px", fontSize: 13 }} onClick={() => { setUploadShopId(shop.id); fileRef.current.click(); }}>+ Upload Photo</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 10 }}>
                  {shop.photos.map((p,i) => (
                    <div key={i} style={{ position: "relative" }}>
                      <img src={p} alt="" className="photo-thumb" onClick={() => setPhotoModal(p)} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
