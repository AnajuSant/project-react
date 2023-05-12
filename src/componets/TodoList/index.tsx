import Trash from '../../assets/trash.svg'
import { Task } from '../../model/task';
import styles from './index.module.css';


interface TodolistProps{ 
    list: Task[];
    onDelete: (id: string) => void;

}



export const Todolist = ({ list, onDelete }: TodolistProps) =>{
    return (
        <section className={styles.section_container}>
        {list.map((task) =>(
            <article className={styles.content_container}>

            <input
             type="checkbox" 
             id={task.id}
             defaultChecked={task.isDone}>
            </input>
            <p className={styles.text}> {task.description}</p>           
            <img onClick={() => onDelete(task.id)}  className={styles.img} src={Trash}></img>
      
        </article>
))}
        </section>
    )
}