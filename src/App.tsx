import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/Home"
import Community from "./pages/community.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
          <Route path="/community" element={<Community/>}/>
      </Routes>
    </BrowserRouter>
  )
}