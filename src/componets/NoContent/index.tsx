import style from './index.module.css';
import Clipboard from '../../assets/clipboard.svg'

export const NoContent = () => {
  return (
    <section className={style.section_container}>

        
        <img src={Clipboard}></img>
    <p className={style.text}>
        <strong>Você ainda não tem tarefas cadastradas</strong>
        Crie tarefas e organize seus itens a fazer
    </p>
    </section>
    
  );
};
