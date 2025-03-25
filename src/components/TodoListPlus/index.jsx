import { useEffect, useState } from "react";
import check from '../../assets/check.svg';
import edit from '../../assets/pen.svg';
import close from '../../assets/delete.svg';
import play from "../../assets/play.svg";
import up from '../../assets/upload.svg';
import alarmSound from "../../assets/piano.mp3";


const TodoListPlus = () => {

  const [tarefas, setTarefas] = useState(() => {
    const tarefasStorage = localStorage.getItem("Array de Tarefas Plus");
    return tarefasStorage ? JSON.parse(tarefasStorage) : [
      {
        task: "Acordar Cedo",
        time: 5
      },
      {
        task: "Estudar JSES6+",
        time: 120
      },
      {
        task: "Lavar o Carro",
        time: 60
      },
      {
        task: "Estudar Hooks",
        time: 60
      }
    ];
  });
  const [concluidos, setConcluidos] = useState(() => {
    const concluidosStorage = localStorage.getItem("Array de Concluidos Plus");
    return concluidosStorage ? JSON.parse(concluidosStorage) : []
  });
  const [campo, setCampo] = useState("")
  const [time, setTime] = useState("");
  const [editandoIndex, setEditandoIndex] = useState(null);
  const [execultando, setExecultando] = useState(null);
  const [tempoRestante, setTempoRestante] = useState(null);
  const [intervalo, setIntervalo] = useState(null);
  const [alarme, setAlarme] = useState(new Audio(alarmSound));

  useEffect(() => {
    localStorage.setItem("Array de Tarefas Plus", JSON.stringify(tarefas));
  }, [tarefas]);

  useEffect(() => {
    localStorage.setItem("Array de Concluidos Plus", JSON.stringify(concluidos));
  }, [concluidos]);

  useEffect(() => {
    alarme.onended = () => {
      alarme.pause();
      alarme.currentTime = 0;
    };
  }, [alarme]);

  const iniciarTarefa = (index) => {
    if (execultando !== null) {
      pararTimer();
    }

    setExecultando(index);
    setTempoRestante(tarefas[index].time * 60);

    let alarmeTocado = false;

    const novoIntervalo = setInterval(() => {
      setTempoRestante((prev) => {
        if (prev <= 1 && !alarmeTocado) { 
          concluirItem(index);
          pararTimer();
          alarmeTocado = true;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setIntervalo(novoIntervalo);
  };

  const pararTimer = () => {
    if (intervalo) {
      clearInterval(intervalo);
      setIntervalo(null);
    }
    setExecultando(null);
  };


  const formatarTempo = (min) => {
    const totalSegundos = Math.round(min * 60);
    const horas = String(Math.floor(totalSegundos / 3600)).padStart(2, "0");
    const minutos = String(Math.floor((totalSegundos % 3600) / 60)).padStart(2, "0");
    const segundos = String(totalSegundos % 60).padStart(2, "0");

    return `${horas}:${minutos}:${segundos}`;
  };

  function addItem(e) {
    e.preventDefault();
    const novaTarefa = { task: e.target[0].value, time: e.target[1].value };

    if (editandoIndex !== null) {
      const novasTarefas = tarefas.filter((_, i) => i !== editandoIndex);
      novasTarefas.push(novaTarefa);
      setTarefas(novasTarefas);
    } else {
      setTarefas([...tarefas, novaTarefa])
    }

    setCampo("");
    setTime("");
    setEditandoIndex(null);
  };

  function handleCampo(e) {
    setCampo(e.target.value)
  }

  function handleTime(e) {
    setTime(e.target.value)
  }

  function removerItem(index) {
    const novasTarefas = tarefas.filter((_, i) => i !== index);
    setTarefas(novasTarefas);
  }

  function editarItem(index) {
    setCampo(tarefas[index].task);
    setTime(tarefas[index].time);
    setEditandoIndex(index);
  }

  function concluirItem(index) {
    alarme.currentTime = 0;
    alarme.play();
    const tarefaConcluida = tarefas[index];
    const novosConcluidos = [...concluidos, tarefaConcluida].slice(0, 5);
    setConcluidos(novosConcluidos);
    removerItem(index);
    pararTimer();
  };

  function retornarItem(index) {
    const tarefaRetornada = concluidos[index];
    setTarefas([...tarefas, tarefaRetornada]);
    setConcluidos(concluidos.filter((_, i) => i !== index));
  }



  return (
    <div className="todoListPlus">

      <div className="tasks">
        <h3>Tarefas</h3>
        <ul className="tasks-lista">
          {
            tarefas.map((item, index) => {
              return (
                <li className="tasks-lista-item" key={index}>
                  <div className="task-box">
                    {item.task}
                    <span
                      className="time-box"
                    >
                      {execultando === index ? formatarTempo(tempoRestante / 60) : formatarTempo(item.time)}
                    </span>
                  </div>
                  <div className="tasks-lista-item-actions">
                    <img
                      src={play}
                      alt="Iniciar Tarefa"
                      onClick={() => iniciarTarefa(index)}
                    />
                    <img
                      src={check}
                      alt="marcar como feito"
                      onClick={() => concluirItem(index)}
                    />
                    <img
                      src={edit}
                      alt="editar"
                      onClick={() => editarItem(index)}
                    />
                    <img
                      src={close}
                      alt="remover"
                      onClick={() => removerItem(index)}
                    />
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>


      <div className="content-addTask">
        <form
          onSubmit={addItem}
        >
          <div className="inputs">
            <input
              type="text"
              value={campo}
              name="task"
              placeholder="Nova Tarefa"
              onChange={handleCampo}
            />
            <input
              type="number"
              value={time}
              name="time"
              placeholder="Digite o tempo em minutos"
              onChange={handleTime}
            />
          </div>
          <button
            id="add-btn"
            type="submit"
            disabled={(campo.length < 3 || time < 1)}
          >
            {editandoIndex !== null ? "Salvar" : "Adicionar"}
          </button>
        </form>
      </div>

      <div className="content-concluidos">
        {concluidos.length > 0 && (
          <>
            <h3>Últimos Concluídos</h3>
            <ul className="content-concluidos-lista">
              {concluidos.map((item, index) => {
                return (
                  <li key={index} className="content-concluidos-lista-item">
                    {item.task}
                    <div className="content-concluidos-lista-item-actions">
                      <img
                        src={up}
                        alt="voltar"
                        onClick={() => retornarItem(index)}
                      />
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

export default TodoListPlus;
