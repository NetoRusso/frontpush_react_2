/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";


function App() {

  // const [tarefas, setTarefas] = useState([
  // 'Acordar Cedo',
  // 'Estudar JSES6+',
  // 'Lavar o Carro',
  // 'Estudar Hooks'
  // ]);

  const [tarefas, setTarefas] = useState(() => {
    const tarefasStorage = localStorage.getItem("Array de Tarefas");
    return tarefasStorage ? JSON.parse(tarefasStorage) : [
      'Acordar Cedo',
      'Estudar JSES6+',
      'Lavar o Carro',
      'Estudar Hooks'
    ];
  });

  const [campo, setCampo] = useState("")



  function addItem() {

    setTarefas([...tarefas, campo])
    setCampo("");
  }

  function handleCampo(e) {
    setCampo(e.target.value)
  }

  // useEffect(() => {
  //   const tarefasStorage = localStorage.getItem("Array de Tarefas");
  //   if (tarefasStorage) {
  //     setTarefas(JSON.parse(tarefasStorage));
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem("Array de Tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  return (
    <div className="App">
      <h1>Bora Codar!</h1>
      <ul>
        {
          tarefas.map((item, index) => {
            return (
              <li key={index}>{item}</li>
            )
          })
        }
      </ul>
      <input type="text" value={campo} name="nome" placeholder="Nova Tarefa" onChange={handleCampo} />
      <button id="add-btn" type="button" onClick={addItem} disabled={campo.length < 3}>Adicionar</button>
    </div>
  );
}

export default App;
