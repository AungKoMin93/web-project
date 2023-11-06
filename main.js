

// userauthentication

// const TempUserObject = {
//     name : "Mya",
//     password : "123",
//     Q1a_history : [false,false,false,false,false,false],
//     Q1a_Mark : 0,
//     Q1b_history : [],
//     Q1b_Mark : 0,
//     Q2a_history : [],
//     Q2a_Mark : 0,
//     Q2b_history : [],
//     Q2b_Makr : 0,  
// }
let currentUserId = 0;

const TempuserArr = [
    {
    name : "Mya",
    password : "123",
    Q1a_history : [],
    Q1a_Mark : 0,
    Q1b_history : [],
    Q1b_Mark : 0,
    Q2a_history : [],
    Q2a_Mark : 0,
    Q2b_history : [],
    Q2b_Mark : 0,  
},
{
    name : "kyaw",
    password : "12345",
    Q1a_history : [],
    Q1a_Mark : 0,
    Q1b_history : [],
    Q1b_Mark : 0,
    Q2a_history : [],
    Q2a_Mark : 0,
    Q2b_history : [],
    Q2b_Mark : 0,  
}
];

const DatabaseUser = localStorage.getItem("users") != null ? JSON.parse(localStorage.getItem("users")) : TempuserArr;

localStorage.setItem("users", JSON.stringify(DatabaseUser));


// Question 1 section 

// Q1a section
const correstansQ1a = [false,false,true,true,true,true,true,true]

let Q1Amark = document.getElementById("Q1Amark");


function SavetoQues1aResult(){
    // getinputvalue
    let tempuses = DatabaseUser;
    const q1aInput = document.querySelectorAll(".q1a");

    // loopinputvalue
    q1aInput.forEach((element,i) => {
        let tempid = element.getAttribute("id");
        console.log(tempid);

        let tempinput = document.getElementById(tempid);
        // console.log(tempinput.checked);
        if(tempinput.checked){
            tempuses[currentUserId].Q1a_history[i] = true;
        }
        else{
            tempuses[currentUserId].Q1a_history[i] = false;
        };
    });
   
    // calculate for mark
    let anserarr = tempuses[currentUserId].Q1a_history;

    let temMark = 0;

    anserarr.forEach((element,i) => {
        if(element == correstansQ1a[i]){
            temMark++;
        }
    });

    tempuses[currentUserId].Q1a_Mark = temMark;    
    // save answer to localStorage
    // tempuses = DatabaseUser;
    localStorage.setItem("users", DatabaseUser == null ? JSON.stringify(TempuserArr) : JSON.stringify(tempuses));

    ShowresultForQ1a();
}

function ShowresultForQ1a(){    
    let anserarr = DatabaseUser[currentUserId].Q1a_history;
    const q1aInput = document.querySelectorAll(".q1a");
    const btnQ1a = document.getElementById("btnQ1a");

    if(anserarr.length == 0){
        q1aInput.forEach(element => {
            let tempid = element.getAttribute("id");            
            let teminput = document.getElementById(tempid);
            teminput.checked = false;
        });
    }
    else{
        q1aInput.forEach((element,i) => {
            let tempid = element.getAttribute("id");            
            let teminput = document.getElementById(tempid);
            
            if(correstansQ1a[i]){
                if(anserarr[i]){
                    teminput.checked = true;
                    teminput.classList.add("right");
                    teminput.setAttribute("disabled","disabled");
                }
                else{
                    teminput.classList.remove("border-primary")
                    teminput.classList.add("border-danger")
                    teminput.setAttribute("disabled","disabled");
                }
            }
            else{
                if(anserarr[i]){
                    teminput.checked = true;
                    teminput.classList.add("wrong");
                    teminput.setAttribute("disabled","disabled");
                }
                else{
                    teminput.classList.remove("border-primary")
                    teminput.classList.add("border-success")
                    teminput.setAttribute("disabled","disabled");
                }
            }
            
        });

        
        btnQ1a.setAttribute("disabled","disabled")    
    }    
    Q1Amark.innerHTML = DatabaseUser[currentUserId].Q1a_Mark;
     // Question 1 total result
     q1total = DatabaseUser[currentUserId].Q1a_Mark + DatabaseUser[currentUserId].Q1b_Mark;
     Q1result.innerText = q1total;
}


// Q1b section
const correstansQ1B = ["volcano","wildlife","soil","bacteria","rocks","air","mangroves","trees"];

let Q1Bmark = document.getElementById("Q1bmark");
const Q1result = document.getElementById("Q1result")

function SavetoQues1BResult(){
    // getinputvalue
    let tempuses = DatabaseUser;

    // loopinputvalue
    correstansQ1B.forEach((element,i) => {
       let tempinput = document.getElementById("bl"+(i+1));
        console.log(tempinput);       
       
        tempuses[currentUserId].Q1b_history[i] = tempinput.value.trim();       
    });
   
    // calculate for mark
    let anserarr = tempuses[currentUserId].Q1b_history;

    let temMark = 0;

    anserarr.forEach((element,i) => {
        if(element == correstansQ1B[i]){
            temMark++;
        }
    });
    tempuses[currentUserId].Q1b_Mark = temMark;
    // save answer to localStorage
    localStorage.setItem("users", DatabaseUser == null ? JSON.stringify(TempuserArr) : JSON.stringify(tempuses));
    ShowresultForQ1B();
}



function ShowresultForQ1B(){
    // console.log(DatabaseUser);
    let anserarr = DatabaseUser[currentUserId].Q1b_history;   
    const btnQ1B = document.getElementById("btnQ1B");

    if(anserarr.length == 0){
        correstansQ1B.forEach((element,i) => {
            let tempinput = document.getElementById("bl"+(i+1));
            tempinput.value = "";
        });
    }
    else{        
        btnQ1B.setAttribute("disabled","disabled");          
        anserarr.forEach((element,i) => {
            let tempinput = document.getElementById("bl"+(i+1));
            tempinput.setAttribute("disabled","disabled");     
            if(element == ""){
                tempinput.value = "no answered for this question"
            }
            else{
                tempinput.value = element;
                if(element == correstansQ1B[i]){
                    tempinput.classList.add("text-success")
                }
                else{
                    tempinput.classList.add("text-danger")
                }
            }  
         });
    }
    Q1Bmark.innerHTML = DatabaseUser[currentUserId].Q1b_Mark;

    // Question 1 total result
    q1total = DatabaseUser[currentUserId].Q1a_Mark + DatabaseUser[currentUserId].Q1b_Mark;
    Q1result.innerText = q1total;
}

function Q1Reload(){
    ShowresultForQ1B();
    ShowresultForQ1a();
}



//Qesetion 2 section
// Q2A section
const correstansQ2A = [
    ["the atmosphere", "atmosphere"],
    ["plant","carbon dioxide","sunlight","water","photosynthesis"],
    ["plant"],
    ["sunlight","the sun","sun"]
];

let Q2Amark = document.getElementById("Q2Amark");

function SavetoQues2AResult(){
    // getinputvalue
    let tempuses = DatabaseUser;

    // loopinputvalue
    correstansQ2A.forEach((element,i) => {
       let tempinput = document.getElementById("Q2A-"+(i+1));
        console.log(tempinput);       
       
        tempuses[currentUserId].Q2a_history[i] = tempinput.value;       
    });
   
    // calculate for mark
    let anserarr = tempuses[currentUserId].Q2a_history;

    let temMark = 0;

    anserarr.forEach((element,i) => {
        correstansQ2A[i].forEach(correctAns => {
            if(element.toLowerCase() == correctAns){
                temMark++;
                console.log(element);
            }
        });
    });

    tempuses[currentUserId].Q2a_Mark = temMark;
    // save answer to localStorage
    localStorage.setItem("users", DatabaseUser == null ? JSON.stringify(TempuserArr) : JSON.stringify(tempuses));
    ShowresultForQ2A();
}

function ShowresultForQ2A(){
    // console.log(DatabaseUser);
    let anserarr = DatabaseUser[currentUserId].Q2a_history;   
    const btnQ2A = document.getElementById("btnQ2A");

    if(anserarr.length == 0){
        correstansQ2A.forEach((element,i) => {
            let tempinput = document.getElementById("Q2A-"+(i+1));
            tempinput.value = "";
        });
    }
    else{        
        btnQ2A.setAttribute("disabled","disabled");          
        anserarr.forEach((element,i) => {
            let tempinput = document.getElementById("Q2A-"+(i+1));
            tempinput.setAttribute("disabled","disabled");     
            if(element == ""){
                tempinput.value = "no answered for this question"
            }
            else{
                tempinput.value = element;
                let checkPass = false;
                correstansQ2A[i].forEach(correctAns => {
                    if(element.toLowerCase() == correctAns){
                        checkPass = true;
                    }                  
                });  
                
                if(checkPass){
                    tempinput.classList.add("text-success")
                }
                else{
                    tempinput.classList.add("text-danger")
                }
            }  
         });
    }
    Q2Amark.innerHTML = DatabaseUser[currentUserId].Q2a_Mark;

    // Question 2 total result
    q2total = DatabaseUser[currentUserId].Q2a_Mark + DatabaseUser[currentUserId].Q2b_Mark;
    Q2result.innerText = q2total;
}


// Q2B section
const correstansQ2B = [2,4,1,3];

let Q2Bmark = document.getElementById("Q2Bmark");

const Q2result = document.getElementById("Q2result");

function SavetoQues2BResult(){
    // getinputvalue
    let tempuses = DatabaseUser;

    // loopinputvalue
    correstansQ2B.forEach((element,i) => {
       let tempinput = document.getElementById("Q2b-"+(i+1));
        console.log(tempinput);       
       
        tempuses[currentUserId].Q2b_history[i] = tempinput.value;       
    });
   
    // calculate for mark
    let anserarr = tempuses[currentUserId].Q2b_history;

    let temMark = 0;

    anserarr.forEach((element,i) => {        
            if(element == correstansQ2B[i]){
                temMark++;
            }
    });

    tempuses[currentUserId].Q2b_Mark = temMark;
    // save answer to localStorage
    localStorage.setItem("users", DatabaseUser == null ? JSON.stringify(TempuserArr) : JSON.stringify(tempuses));
    ShowresultForQ2B();
}

function ShowresultForQ2B(){
    // console.log(DatabaseUser);
    let anserarr = DatabaseUser[currentUserId].Q2b_history;   
    const btnQ2B = document.getElementById("btnQ2B");

    if(anserarr.length == 0){
        correstansQ2B.forEach((element,i) => {
            let tempinput = document.getElementById("Q2b-"+(i+1));
            tempinput.value = "";
        });
    }
    else{        
        btnQ2B.setAttribute("disabled","disabled");          
        anserarr.forEach((element,i) => {
            let tempinput = document.getElementById("Q2b-"+(i+1));
            tempinput.setAttribute("disabled","disabled");     
            if(element == ""){
                tempinput.value = "No selected"
            }
            else{
                tempinput.value = element;
                if(element == correstansQ2B[i]){
                    tempinput.classList.add("text-success");
                }
                else{
                    tempinput.classList.add("text-danger");
                }
            }  
         });
    }
    Q2Bmark.innerHTML = DatabaseUser[currentUserId].Q2b_Mark;

    // Question 2 total result
    q2total = DatabaseUser[currentUserId].Q2a_Mark + DatabaseUser[currentUserId].Q2b_Mark;
    Q2result.innerText = q2total;
}



function Q2Reload(){
   ShowresultForQ2A()
   ShowresultForQ2B();
}
