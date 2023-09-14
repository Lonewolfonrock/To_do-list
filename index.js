// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjMNygJAnkEN3sjUSh4Q0izOyS0TKAI00",
  authDomain: "realtime-databases-e2ad3.firebaseapp.com",
  databaseURL: "https://realtime-databases-e2ad3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "realtime-databases-e2ad3",
  storageBucket: "realtime-databases-e2ad3.appspot.com",
  messagingSenderId: "406936515070",
  appId: "1:406936515070:web:1e68c5a14c6bfa068e10af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database=getDatabase(app)
const itemList=ref(database,"Items")

const inputElement=document.getElementById("input");
const addBtn=document.getElementById("add_box");
const removebtn=document.querySelector("delete");
const itemListinHtml = document.querySelector("#main1");



addBtn.addEventListener("click",function(){
    let inputvalue=inputElement.value
    itemListinHtml.innerHTML=""
    if(inputvalue!=""){
        push(itemList,inputvalue);
        inputElement.value=""
        
    }
    else{
        alert("cant put empty value")
    }
});

onValue(itemList,function(snapshot){
    let itemsArray = Object.entries(snapshot.val())
    
    for(let i=0; i<itemsArray.length; i++){
        let itemListarr=itemsArray[i];
        let key=itemListarr[0]
        let value=itemListarr[1]

        appendTOHtml(itemListarr);

    }
})

function appendTOHtml(itemListarr) {
    let id = itemListarr[0];
    let value = itemListarr[1];
    
    // Check if the item with the same ID already exists in the list
    if (!document.getElementById(id)) {
        
        let newelement = `<li class="li_items" id="${id}">
            <label class="note">${value}</label>
            <span class="material-symbols-outlined delete">delete_forever</span>
        </li>`;
        
        
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = newelement;

        
        const deleteBtn = tempContainer.querySelector(".delete");
        deleteBtn.addEventListener("click", function () {
            let exactLocationOfItemInDB = ref(database, `Items/${id}`);
            remove(exactLocationOfItemInDB);
            
           
            document.getElementById(id).remove();
        });

        // Append the new element to the list
        document.getElementById("main1").appendChild(tempContainer.firstChild);
    }
}






