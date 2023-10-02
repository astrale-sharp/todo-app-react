'use-client'

import { StrictMode, createRef, useMemo, useRef, useState, useEffect } from 'react'
import React from "react";
import styles from '../styles/Home.module.css';
import Listcontainer from "./list"
import Elem from "./elem"
import * as Interface from "../../interface/interface"
import Listselector from './listSelector';
import { DndContext, useDndContext } from '@dnd-kit/core';


const base = "http://0.0.0.0:8000/"
const unchecked = <span>&#x2610;</span>;
const checked = <span>&#x2611;</span>;

export default function Home() {
  // lists and todos
  const [data, setData] = useState({ "My super list": [Interface.createTodoElem("Launch the server ;)")] });
  // an array of 0 to 2 elems, elems must be in list names
  const [listSelector, setListSelector] = useState([])

  // we init by pulling data from the server
  let sendPromise = useRef(null)


  // reading from the server
  useEffect(() => fetch(base + "fulldata", { mode: 'cors' })
    .then((res) => res.json()).then((res) => setData(res)).catch(((e) => console.log(e)))
    , [])


  // function handleDragEnd(event) {
  //   const { over } = event;
  //   console.log(event)
  //   if (over != null) {
  //     let target_list = over.id
  //     console.log("log", event)
  //     let [sending_list, date] = event.active.id.split("///")
  //     removeElemToList(sending_list, date)
  //     addElemToList(target_list)
  //     console.log(target_list)
  //     console.log(sending_list)
  //     console.log(date)
  //   }

    // alert(4)
    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    // setParent(over ? over.id : null);

  // };

  function addList() {
    let updated = Interface.addList(data)
    setData(updated)
  }

  function removeList(listName) {
    let updated = Interface.removeList(data, listName)
    setData(updated)
    syncServer(updated)
  }
  function addElemToList(listName) {
    let updated = Interface.addElemToList(data, listName)
    setData(updated)
    syncServer(updated)
  }
  function removeElemToList(listName, elemDate) {
    let updated = Interface.removeElemToList(data, listName, elemDate)
    setData(updated)
    syncServer(updated)
  }
  function modifyTextFromListElem(listName, elemDate, newText) {
    let updated = Interface.modifyTextFromListElem(data, listName, elemDate, newText)
    setData(updated)
    syncServer(updated)
  }
  function toggleItemFromList(listName, elemDate) {
    let updated = Interface.toggleItemFromList(data, listName, elemDate)
    setData(updated)
    syncServer(updated)
  }

  function syncServer(obj) {
    console.log("try sync!")
    console.log(base + "setdata/")
    if (sendPromise.current !== null && sendPromise.current.state == "fulfilled") {
      console.log("sending!")
      sendPromise.current = useEffect(() => {
        // POST request using fetch inside useEffect React hook
        let requestOptions = {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          body: JSON.stringify(obj),
            headers: {'Content-type': 'application/json; charset=UTF-8',},
        }

        sendPromise.current = fetch(
          base + "setdata/", requestOptions).then((_) => console.log("send state"))
      }, []);
    }


  }

  let l1 = Object.entries((data ?? {})).filter(([list_name, todos]) => listSelector.includes(list_name))
  let l2 = Object.entries((data ?? {})).filter(([list_name, todos]) => !listSelector.includes(list_name))
  let map = x => x.map(([list_name, todos]) =>
    <Listcontainer
      addList={addList}
      removeList={removeList}
      addElemToList={addElemToList}
      removeElemToList={removeElemToList}
      modifyTextFromListElem={modifyTextFromListElem}
      toggleItemFromList={toggleItemFromList}

      data={data}
      setData={setData}

      key={list_name}
      name={list_name}
      elems={todos}
    >
    </Listcontainer>)

  l1 = map(l1)
  l2 = map(l2)


  return (
    <DndContext 
    //onDragEnd={}
    >
      <div>
        {/* some {JSON.stringify(data)} */}
        <title>Todo App</title>
        <main>
          <div
            className={styles.wrapper}
          >
            <div className={styles.vbox}
            >
              <div
                className={styles.title}
                style={{
                  fontSize: "2.5em",
                  marginBottom: 50,
                  textAlign: "center",
                  margin: 0,
                }}
              > Todo App </div>
              <div
                className={styles.hbox}
                style={{
                  minWidth: 100,
                  textAlign: 'center'
                }}
              >
                <Listselector
                  names={Object.keys((data ?? {}))}
                  listSelector={listSelector}
                  setListSelector={setListSelector}
                  addList={addList}
                ></Listselector>
                {l1}
                {l2}
              </div>
            </div>
          </div>

        </main>
      </div>
    </DndContext>
  );
}



