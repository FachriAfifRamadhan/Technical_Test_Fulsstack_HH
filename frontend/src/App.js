import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./components/Home";
import Navbar from "./components/Navbar";
import Pengaturan from "./components/Pengaturan";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/pengaturan" element={<Pengaturan/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
