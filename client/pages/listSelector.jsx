import styles from '../styles/Home.module.css';


// props.names
// props.listSelector
// props.setListSelector
export default function Listselector(props) {
    console.log(props.listSelector)
    let selector = (props.names??[]).map(x =>
        <div
            style={{
                minWidth: 150,
                paddingBlock: 10,
                alignContent: "center",
                justifyContent: "center",
                borderRadius: 0,
                backgroundColor: props.listSelector.includes(x) ? "lightgreen" : "lightblue"
            }}
            className={styles.title}
            onClick={x => {
                // console.log(props.listSelector)
                if (props.listSelector.length <= 1)  {
                    let updated = [...props.listSelector]
                    updated.push(x.currentTarget.innerText)
                    props.setListSelector(updated)
                } else {
                    let updated = [...props.listSelector]
                    updated[0] = updated[1]
                    updated[1] = x.currentTarget.innerText
                    props.setListSelector(updated)
                }
            }}
            > {x} </div>
    )

    return (
        <div>
            {selector}
            <button
                className={styles.button}
                onClick={(x) => props.addList()}>
                + </button>
        </div>
    );
} 