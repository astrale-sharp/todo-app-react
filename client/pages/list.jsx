import Elem from "./elem"
import styles from '../styles/Home.module.css';
import { useState } from "react";
import {useDroppable} from '@dnd-kit/core';


// props.elems
// props.key == props.name
// props.idx
// button add elem
// toggle hide/unhide checklist
export default function Listcontainer(props) {

  let [checkedVisible, SetCheckedVisible] = useState(false)
  const { isOver, setNodeRef } = useDroppable({
    id: props.name,
    name : props.name
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };



  let todos = (props.elems ?? [])
    .sort((x, y) => x.date >= y.date)
    .filter(x => !x.checked)
    .map(x =>
      <Elem
        done={false}
        parentProps={props}
        date={x.date}
        dateString={x.dateString}
        text={x.text}
        key={props.name + x.date}
      ></Elem>)

  let dones = (props.elems ?? [])
    .sort((x, y) => x.date >= y.date)
    .filter(x => x.checked)
    .map(x =>
      <Elem
        done={true}
        parentProps={props}
        date={x.date}
        dateString={x.dateString}
        text={x.text}
        key={props.name + x.date}
      ></Elem>)

  return (
    <div className={styles.vbox} style={{
      minWidth: 300,
      alignItems: "center",
      zIndex: 5,
      ...style
    }}>
      <div ref={setNodeRef} className={styles.hbox} style={{
      }}>
        <button
          className={styles.button}
          onClick={(x) => SetCheckedVisible(x => !x)}>
          &#9728;
        </button>
        <div
          className={styles.title}
          style={{
            height: 10,
            margin: "auto",
            paddingLeft: 10,
            paddingRight: 10,
          }}>
          {props.name} </div>

        <button
          onClick={x => props.removeList(props.name)}
          className={styles.button}
        > &#10007; </button>
      </div>
      {todos}
      {checkedVisible ? dones : null}
      <button
        className={styles.button}
        onClick={(x) => props.addElemToList(props.name)}>
        + </button>
    </div>
  );
}


