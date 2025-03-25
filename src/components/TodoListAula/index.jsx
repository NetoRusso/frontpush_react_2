import { useEffect, useState } from "react";


const TodoListAula = () => {

  const [tarefas, setTarefas] = useState(() => {
    const tarefasStorage = localStorage.getItem("Array de Tarefas Aula");
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


  useEffect(() => {
    localStorage.setItem("Array de Tarefas Aula", JSON.stringify(tarefas));
  }, [tarefas]);

  return (
    <div className="todoListAula">
      <ul>
        {
          tarefas.map((item, index) => {
            return (
              <li key={index}>{item}</li>
            )
          })
        }
      </ul>
      <div className="content-addTask">
        <input type="text" value={campo} name="nome" placeholder="Nova Tarefa" onChange={handleCampo} />
        <button id="add-btn" type="button" onClick={addItem} disabled={campo.length < 3}>Adicionar</button>
      </div>
    </div>
  )
};

export default TodoListAula;
