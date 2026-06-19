import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import BottomBar from "@/components/BottomBar";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <BottomBar />
    </BrowserRouter>
  );
}
