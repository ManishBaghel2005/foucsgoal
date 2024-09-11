const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputfield = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressbar = document.querySelector(".progress-bar");
const progressvalue = document.querySelector(".progress-value");


const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
  first:{
    name: " ",
    completed: false,
  },
  second:{
    name: " ",
    completed: false,
  },
  third:{
    name: " ",
    completed: false,
  }
}

let completedarray =Object.values(allGoals).filter((goal) => goal.completed).length

/// foreach ki madd se phele allquerselect se ek ek karke check hoge fir  click event se box par tick mark
// lagega fir sabi input box ko eke ek karke check hoge ki khale hai ki nahi fir agar khale hai to fale hobne chase
// if else se khale hone par condition apply hogi

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const allinputfilled = [...inputfield].every(function (input) {
      return input.value;
    });

    if (allinputfilled) {
      checkbox.parentElement.classList.toggle("complete");
      // progressvalue.style.width = "33.33%";
      const inputId = checkbox.nextElementSibling.id;
      allGoals[inputId].completed =!allGoals[inputId].completed
      completedarray =Object.values(allGoals).filter((goal) => goal.completed).length
      progressvalue.style.width = `${completedarray / 3 * 100}%`
      progressvalue.firstElementChild.innerText = `${completedarray}/3 completed`
      localStorage.setItem("allGoals",JSON.stringify(allGoals))
    } else {
      progressbar.classList.add("show-error");
    }
  });
});






inputfield.forEach((input) => {
  if(allGoals[input.id]){
input.value = allGoals[input.id].name

if(allGoals[input.id].completed){
  input.parentElement.classList.add("completed")
}
}



  input.addEventListener("focus", () => {
    progressbar.classList.remove("show-error");
  });


  input.addEventListener("input",(e)=>{

    if(allGoals[input.id].completed){
    input.value =allGoals[input.id].name
    return 
    }

    allGoals[input.id] = {
      name: input.value,
      completed:false
    }
   localStorage.setItem("allGoals",JSON.stringify(allGoals))
  })

});
