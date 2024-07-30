import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/Home"
import Community from "./pages/community.tsx";
import Ideaboard from "./pages/ideaboard.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
          <Route path="/community" element={<Community/>}/>
          <Route path ="/ideaboard" element={<Ideaboard/>}/> 
      </Routes>
    </BrowserRouter>
  )
}