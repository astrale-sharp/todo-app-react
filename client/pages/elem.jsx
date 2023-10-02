import styles from '../styles/Home.module.css';
import {useDraggable} from '@dnd-kit/core';
// props :
// - checked visible
// - date
// - dateString
// - text
// button suppress
// button check
export default function Elem(props) {
  let pp = props.parentProps
  let mark = props.done? <span>✔</span>  : <span>&nbsp;&nbsp;</span>
  let id = pp.name + "///" + String(props.date)
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: id,
    date: props.date,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;


  return (
    <div id={id} 
      // ref={setNodeRef} 
      //  {...listeners} {...attributes}
          className={styles.elem}
          style={{
            borderColor: props.done ? "green" : "yellow",
            zIndex : 100,
            ...style
          }}
    >
      <div className={styles.hbox} style={{
        justifyItems: 'center',
        alignItems: "center"
      }}>
        <button className={styles.button} style={{zIndex:101}}  
        onClick={x => pp.toggleItemFromList(pp.name, props.date)}
          >
            {mark}
          </button>

        <div style={{
          textAlign: "center",
          wordBreak: 'break-word',
          flexGrow: 0,
          marginRight: 10,
          fontSize: "0.5em"
        }}>
          <p> {(props.dateString??"").split("\n")[0]} </p>
          <p> {(props.dateString??"").split("\n")[1]} </p>
        </div>

        <textarea
          style={{
            flexGrow: 3,
          }}
          value={props.text}
          placeholder="Do the cool thing (eat, sleep and React)"
          onChange={x => pp.modifyTextFromListElem(pp.name, props.date, x.target.value)}
          
        />
        <button
        style={{zIndex:101}}
          onClick={(x) => pp.removeElemToList(pp.name, props.date)}
          className={styles.button}>
          x
        </button>
      </div>
    </div>
  );
}






