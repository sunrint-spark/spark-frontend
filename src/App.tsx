import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/Home"
import Community from "./pages/community";
import { ModalProvider } from './modal/ModalContext';
import Ideaboard from "./pages/ideaboard";
import Brainstorm from "./pages/Brainstorm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
          <Route path="/community" element={<Community/>}/>
          <Route path ="/ideaboard" element={
              <ModalProvider>
                  <Ideaboard/>
              </ModalProvider>
          }/>
          <Route path="/brainstorm" element={<Brainstorm/>}/>
      </Routes>
    </BrowserRouter>
  )
}