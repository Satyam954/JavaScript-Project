let questionn = document.getElementById("questionn")
let option = document.getElementById("option")
let next =document.getElementById("next")
let count = document.getElementById("count")



let questions = [
    {
        id: 1,
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks Text Mark Language",
            "Home Tool Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },

    {
        id: 2,
        question: "Which language is used to style a web page?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "Python"
        ],
        answer: "CSS"
    },

    {
        id: 3,
        question: "Which language is used to add interactivity to a web page?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],
        answer: "JavaScript"
    },

    {
        id: 4,
        question: "Which method adds an item to the end of an array?",
        options: [
            "push()",
            "pop()",
            "shift()",
            "unshift()"
        ],
        answer: "push()"
    },

    {
        id: 5,
        question: "Which method creates a new array by filtering elements?",
        options: [
            "map()",
            "filter()",
            "find()",
            "forEach()"
        ],
        answer: "filter()"
    },

    {
        id: 6,
        question: "Which method returns the first matching element?",
        options: [
            "map()",
            "filter()",
            "find()",
            "forEach()"
        ],
        answer: "find()"
    },

    {
        id: 7,
        question: "Which keyword is used to declare a variable that cannot be reassigned?",
        options: [
            "var",
            "let",
            "const",
            "static"
        ],
        answer: "const"
    },

    {
        id: 8,
        question: "What does DOM stand for?",
        options: [
            "Data Object Model",
            "Document Object Model",
            "Digital Object Model",
            "Document Oriented Model"
        ],
        answer: "Document Object Model"
    },

    {
        id: 9,
        question: "Which operator is used for strict equality in JavaScript?",
        options: [
            "=",
            "==",
            "===",
            "!="
        ],
        answer: "==="
    },

    {
        id: 10,
        question: "Which method is used to execute a function for every array element?",
        options: [
            "map()",
            "filter()",
            "find()",
            "forEach()"
        ],
        answer: "forEach()"
    }
];




// first step is to render the question 

// sow one question in one time 


// make a whole fucntion od this bcoz we use more time 
let question_number = 0;
let result =0


function renderques() {
    let current_question = questions[question_number]
console.log(current_question);

questionn.textContent = current_question.question

current_question.options.forEach((ans) => {
    let li = document.createElement("li")
    li.classList = " text-shadow-gray-900 border rounded-sm cursor-pointer  border-gray-700 py-2 px-3 my-2 mx-1"
    li.textContent = ans;
    option.append(li)
})


   count.textContent=`${question_number+1} of ${questions.length}`
}


// let current_question = questions[question_number]
// console.log(current_question);

// questionn.textContent = current_question.question

// current_question.options.forEach((ans) => {
//     let li = document.createElement("li")
//     li.classList = " text-shadow-gray-900 border rounded-sm  border-gray-700 py-2 px-3 my-2 mx-1"
//     li.textContent = ans;
//     option.append(li)


// }
// )

renderques()
next.addEventListener("click",(e) => {
  
    if (next.textContent==="Again") {
     result=0
     question_number=0
     answerd=false
     next.textContent = "Next"
     renderques()
     return
  
}
 if (question_number!==questions.length-1) {
      questionn.textContent=""
    option.textContent=""
    question_number++
    answerd=false
    renderques()

} else{
     count.textContent=`Your score ${result} / ${questions.length}`
     next.textContent="Again"
     questionn.textContent="To Start Again Click on again and play again"
     option.textContent=""
}



}
)


// and now for  option  select the option and display the correct ans 
let answerd = false
option.addEventListener("click",(e) => {
     if (e.target.tagName!=="LI") {
    return
  }
  let li=e.target
  let userans=li.textContent
  let currentques= questions[question_number]
 
    if (answerd) {
        return
    }
    if (userans===currentques.answer) {
        result++
        li.classList.add("border-green-700","bg-green-200")
        console.log(result)
      
    }
    else{
          li.classList.add("border-red-700","bg-red-200")
    }


    answerd=true
 
}
)


