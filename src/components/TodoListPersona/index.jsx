import { useEffect, useState } from "react";
import check from '../../assets/check.svg';
import edit from '../../assets/pen.svg';
import close from '../../assets/delete.svg';
import up from '../../assets/upload.svg';


const TodoListPersona = () => {

  const [tarefas, setTarefas] = useState(() => {
    const tarefasStorage = localStorage.getItem("Array de Tarefas Persona");
    return tarefasStorage ? JSON.parse(tarefasStorage) : [
      'Acordar Cedo',
      'Estudar JSES6+',
      'Lavar o Carro',
      'Estudar Hooks'
    ];
  });

  const [concluidos, setConcluidos] = useState(() => {
    const concluidosStorage = localStorage.getItem("Array de Concluidos Persona");
    return concluidosStorage ? JSON.parse(concluidosStorage) : []
  });

  const [campo, setCampo] = useState("")
  const [editandoIndex, setEditandoIndex] = useState(null);


  function addItem() {
    if (editandoIndex !== null) {
      const novasTarefas = [...tarefas];
      novasTarefas[editandoIndex] = campo;
      setTarefas(novasTarefas);
      setEditandoIndex(null);
    } else {
      setTarefas([...tarefas, campo])
    }
    setCampo("");
  };

  function handleCampo(e) {
    setCampo(e.target.value)
  }

  function removerItem(index) {
    const novasTarefas = tarefas.filter((_, i) => i !== index);
    setTarefas(novasTarefas);
  }

  function editarItem(index) {
    setCampo(tarefas[index]);
    setEditandoIndex(index);
  }

  function cocluirItem(index) {
    const tarefaConcluida = tarefas[index];
    const novosConcluidos = [...concluidos, tarefaConcluida].slice(0, 5);
    setConcluidos(novosConcluidos);
    removerItem(index);
  }

  function retornarItem(index) {
    const tarefaRetornada = concluidos[index];
    setTarefas([...tarefas, tarefaRetornada]);
    setConcluidos(concluidos.filter((_, i) => i !== index));
  }

  useEffect(() => {
    localStorage.setItem("Array de Tarefas Persona", JSON.stringify(tarefas));
  }, [tarefas]);

  useEffect(() => {
    localStorage.setItem("Array de Concluidos Persona", JSON.stringify(concluidos));
  }, [concluidos]);

  return (
    <div className="todoListPersona">

      <div className="tasks">
        <h3>Tarefas</h3>
        <ul className="tasks-lista">
          {
            tarefas.map((item, index) => {
              return (
                <li className="tasks-lista-item" key={index}>
                  {item}
                  <div className="tasks-lista-item-actions">
                    <img src={check} alt="marcar como feito" onClick={() => cocluirItem(index)} />
                    <img src={edit} alt="editar" onClick={() => editarItem(index)} />
                    <img src={close} alt="remover" oncClick={() => removerItem(index)} />
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>


      <div className="content-addTask">
        <input type="text" value={campo} name="nome" placeholder="Nova Tarefa" onChange={handleCampo} />
        <button id="add-btn" type="button" onClick={addItem} disabled={campo.length < 3}>
          {editandoIndex !== null ? "Salvar" : "Adicionar"}
        </button>
      </div>

      <div className="content-concluidos">
        {concluidos.length > 0 && (
          <>
            <h3>Últimos Concluídos</h3>
            <ul className="content-concluidos-lista">
              {concluidos.map((item, index) => {
                return (
                  <li key={index} className="content-concluidos-lista-item">
                    {item}
                    <div className="content-concluidos-lista-item-actions">
                      <img src={up} alt="voltar" onClick={() => retornarItem(index)} />
                    </div>
                  </li>
                )
              }
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  )
};

export default TodoListPersona;
