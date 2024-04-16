import NavBar from "./components/NavBar";
import Movies from "./pages/Movies";
import WatchList from "./pages/WatchList";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies/*" element={<Movies />} />
        <Route path="/watchlist" element={<WatchList />} />
      </Routes>
    </Router>
  );
}

export default App;
