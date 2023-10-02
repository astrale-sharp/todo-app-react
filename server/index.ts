'use-strict'
// import {} from "../interface/interface"

const express = require("express");
const cors = require('cors')


const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors())

// This is a list containing each todo list.

// ListName -> List(= [{date_number, checked, Text  }].sorted() )
let todos = { "My great todo list": [] }
// init lists


// This request returns the todos and is
// used by the client to initiate itself 
app.get("/fulldata", (req, res) => {
    // console.log("sent full data");
    res.json(todos);
});

app.post("/setdata*",(req,res) => {
    console.log("state updated!")
    todos = JSON.parse(req.body)
    // console.log("state updated!: ", todos)
})

app.get("/setdata*",(req,res) => {
    console.log("state updated!")
    console.log(req.body)
    todos = JSON.parse(req.body)
    // console.log("state updated!: ", todos)
})

// app.get("/add_list",(req, res) => {
// })

// app.get("/remove_list/id=:id",(req, res) => {
//     // res.json({"msg" : req.params.id})
// })

// app.get("/list_add_elem/id=:id/elem=:elem",(req, res) => {
// })

// app.get("/list_remove_elem/id=:id/elem_date=:date",(req, res) => {})

// app.get("/edit/id=:id",(req, res) => {})
app.post("*", (req,res) => {
    console.log("error post uncaugth: ");

})

app.get("*",(req,res) => {
    console.log("error uncaugth: ", res);
    res.json( {"Error fetching" : req.path}  )
})

console.log(`Server listening on http://${PORT}`);

app.listen(PORT);
