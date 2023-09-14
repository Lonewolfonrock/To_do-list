import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase,ref,push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings ={
    databaseURL: "https://realtime-databases-e2ad3-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app =initializeApp(appSettings)
const database=getDatabase(app)
const todolistinDB =ref(database,"Task")

const addbtn= document.getElementById("add_box");

 

addbtn.addEventListener("click",function(){

    
    let inputtext = document.getElementById("input").value;
    document.getElementById("input").value=""
    push(todolistinDB,inputtext)


})

function appendTodolist(){

}


