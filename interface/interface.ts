
// export type TodoElem = {
//     date : number
//     dateString : String
//     checked : boolean
//     text : String
// }

export function createTodoElem(text) {
    let d = new Date()
    
    let d_fmt = String(d.toLocaleDateString() )
        + "\n" + String(d.getHours())
        + "h:" + String(d.getMinutes())
        + "min:" + String(d.getSeconds())
        + "sec"
    return {
        date: Date.now(),
        checked: false,
        text: text,
        dateString: d_fmt
    }
}


export function addList(data) {
    let number = 0
    let lname = "TodoList " + String(number)
    while (Object.keys(data).includes(lname)) {
        number += 1
        lname = "TodoList " + String(number)
    }
    let updated = { ...data}
    updated[lname] = []
    return updated
}

export function removeList(data, listName) {
    let updated = { ...data}
    delete updated[listName]
    return updated

}

export function addElemToList(data, listName) {
    let updated = { ...data}
    updated[listName].push(createTodoElem(""))
    return updated
}

export function removeElemToList(data, listName, elemDate) {
    let updated = { ...data}
    updated[listName] = updated[listName].filter((x) => x.date != elemDate)
    return updated
}

export function modifyTextFromListElem(data, listName, elemDate, newText) {
    let updated = { ...data}
    updated[listName] = updated[listName].map(x => {
        if (x.date == elemDate) {
            x.text = newText
            return x
        } else {
            return x
        }
    })
    return updated
}

export function toggleItemFromList(data, listName, elemDate) {
    let updated = { ...data}
    updated[listName] = updated[listName].map(x => {
        if (x.date == elemDate) {
            x.checked = !x.checked
            return x
        } else {
            return x
        }
    })
    return updated
}

