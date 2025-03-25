import { BrowserRouter, Routes, Route } from "react-router-dom";

import Aula from "./pages/Aula";
import TDLPlus from "./pages/TDLPlus";
import TDLPersona from "./pages/TDLpersona";
import ContextAPI from "./pages/ContextAPI";

const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Aula />} />
        <Route path="/tdlplus" element={<TDLPlus />} />
        <Route path="/tdlpersona" element={<TDLPersona />} />
        <Route path="/contextapi" element={<ContextAPI />} />
      </Routes>
    </BrowserRouter>
  )
};


export default Rotas;
