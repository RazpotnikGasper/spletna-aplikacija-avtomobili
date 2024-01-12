import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Admin />} />
        <Route path="admin" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
