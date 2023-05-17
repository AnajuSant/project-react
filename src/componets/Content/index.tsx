import style from "./index.module.css";
import Plus from "../../assets/plus.svg";
import { NoContent } from "../NoContent";
import { ChangeEvent, useEffect, useState } from "react";
import { Todolist } from "../TodoList";
import { Task } from "../../model/task";

import { v4 as uuid4 } from "uuid";
import { api } from "../../configs/api";
export const Content = () => {
  // const [nomeState, setNomeState] = useState<string>("Cesar")
  // function MudaNome(){
  //     setNomeState("Jean");//variaveis de estado, 1 elemento é efetivamente a varivel e a segunda é a função que irá manipular a veriavel
  //     //atualização de forma dinamica (useState) variáveis de estado

  // imutabilidade
  // }

  const [description, setDescription] = useState<string>(""); //variaveis de estado
  const [taskList, setTaskList] = useState<Task[]>([]);

  const tasksDone = taskList.filter((task) => {
    return task.isDone !== false;
  });

  const desableButton = !description.length; // variavel comun

  const addTaskOnList = () => {
    const newTask = {
      id: uuid4(), //UUID TAREFA DE CASA
      description,
      isDone: false,
    };

    // setTaskList((currentValue) => [...currentValue, newTask]);
    // setDescription("");

    api
      .post("tasks", newTask)
      .then((response) => {
        setTaskList((currentValue) => [...currentValue, newTask]);
      })
      .finally(() => {
        setDescription("");
      });
  };

  const removeTaskOnDelete = (id: string) => {
    setTaskList((currentValue) =>
      currentValue.filter((task) => task.id !== id)
    );

    api.delete("tasks/" + id).then((response) => {
      setTaskList((currentValue) =>
        currentValue.filter((task) => task.id !== id)
      );
    });
  };

  const changeStatusCheckBox = (id: string) => {
    const task = taskList.find((task) => task.id === id);

    if (task) {
      api.patch("tasks/" + task.id, {
        isDone: !task.isDone,
      });
    }

    const elements = taskList.map((task) => {
      if (task.id == id) {
        return {
          ...task,
          isDone: !task.isDone,
        };
      }

      return task;
    });

    setTaskList(elements);
  };

  useEffect(() => {
    api
      .get("tasks")
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setTaskList(data);
      });
  }, []);

  return (
    <section className={style.section_container}>
      <main>
        <article className={style.input_container}>
          <input
            className={style.input}
            type="text"
            value={description}
            placeholder="Adicione uma nova tarefa"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setDescription(event.target.value)
            }
          ></input>
          <article>
            <button
              disabled={desableButton}
              className={style.button}
              onClick={() => addTaskOnList()}
            >
              Criar
              <img src={Plus} alt="Logo de mais"></img>
            </button>
          </article>
        </article>
        <article className={style.content_header}>
          <article className={style.tasks_container}>
            <p className={style.tasks_done}>Tarefas Criadas</p>
            <span className={style.span_value}>{taskList.length}</span>
          </article>

          <article className={style.tasks_container}>
            <p className={style.tasks_done}>Concluidas</p>
            <span className={style.span_value}>
              {" "}
              {tasksDone.length} de {taskList.length}
            </span>
          </article>
        </article>

        {taskList.length == 0 ? (
          <NoContent />
        ) : (
          <Todolist
            changeStatusCheckBox={changeStatusCheckBox}
            onDelete={removeTaskOnDelete}
            list={taskList}
          />
        )}
      </main>
    </section>
  );
};
