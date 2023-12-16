import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Home"
import CriticalRoute from "./pages/CriticalRoute"
import InventoryModel from "./pages/InventoryModel"
import DecisionTheory from "./pages/DecisionTheory"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/critical-route" element={<CriticalRoute />} />
        <Route path="/inventory-model" element={<InventoryModel />} />
        <Route path="/decision-theory" element={<DecisionTheory />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
