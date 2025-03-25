import { BrowserRouter, Routes, Route } from "react-router-dom";

import Aula from "./pages/Aula";
import TDLPlus from "./pages/TDLPlus";
import TDLPersona from "./pages/TDLpersona";

const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Aula />} />
        <Route path="/tdlplus" element={<TDLPlus />} />
        <Route path="/tdlpersona" element={<TDLPersona />} />
      </Routes>
    </BrowserRouter>
  )
};


export default Rotas;
