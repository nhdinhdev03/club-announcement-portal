import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Navigation from "./components/Navigation.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import AnnouncementDetailPage from "./pages/AnnouncementDetailPage.jsx";
import AnnouncementsPage from "./pages/AnnouncementsPage.jsx";
import ClubDetailPage from "./pages/ClubDetailPage.jsx";
import ClubsPage from "./pages/ClubsPage.jsx";
import HomePage from "./pages/HomePage.jsx";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navigation />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/clubs" element={<ClubsPage />} />
            <Route path="/clubs/:id" element={<ClubDetailPage />} />
            <Route path="/announcements" element={<AnnouncementsPage />} />
            <Route
              path="/announcements/:id"
              element={<AnnouncementDetailPage />}
            />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
