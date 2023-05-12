import style from './index.module.css'
import Plus from '../../assets/plus.svg';
import { NoContent } from '../NoContent';
import { ChangeEvent, useState } from 'react';
import { Todolist } from '../TodoList';
import { Task } from '../../model/task';
export const Content = () => {

    // const [nomeState, setNomeState] = useState<string>("Cesar")
    // function MudaNome(){
    //     setNomeState("Jean");//variaveis de estado, 1 elemento é efetivamente a varivel e a segunda é a função que irá manipular a veriavel
    //     //atualização de forma dinamica (useState) variáveis de estado

    // imutabilidade
    // }


    const [description, setDescription] = useState<string>("");

    const [taskList, setTaskList] = useState<Task[]>([{
        id: '1',
        description: 'Lavar a louça',
        isDone:false
    }, 
    {
        id: '2',
        description: 'Lavar a roupa',
        isDone:true
    }, 
    {
        id: '3',
        description: 'Pagar meus boletos',
        isDone:false
    }]);


        const addTaskOnList= () => {
            const newTask = {
                id: '6', //UUID TAREFA DE CASA 
                description,
                isDone:false
            }

            setTaskList((currentValue) => [...currentValue, newTask]);
        }

      const removeTaskOnList= (id:string) => {
        setTaskList((currentValue) => currentValue.filter(task => task.id !== id))
      }


       return (
     <section className={style.section_container}>
        <main>

                <article className={style.input_container}>

                <input className={style.input} 
                type="text" 
                placeholder="Adicione uma nova tarefa"
                onChange={(event: ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)}>
                

                </input>
                <article>
                    <button className={style.button} onClick={() => addTaskOnList() }>Criar
                        <img src={Plus} alt="Logo de mais"></img>
                    </button>
                </article>
            </article>
            <article className={style.content_header}>
                <article className={style.tasks_container}>
                    <p className={style.tasks_done}>Tarefas Criadas</p>
                    <span className={style.span_value}>0</span>
                </article>

                <article className={style.tasks_container}>
                    <p className={style.tasks_done}>Concluidas</p>
                    <span className={style.span_value}>0</span>
                </article>
            </article>


            {taskList.length ==0 ? <NoContent /> : <Todolist onDelete={removeTaskOnList} list={taskList}/>}
          

        </main>
     </section>
    );
  };
  