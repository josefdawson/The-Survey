const startButton = document.querySelector('button')
const submit = document.querySelector('.submit')
const answerArea = document.querySelector('textarea')
const body = document.body
const Qcounter = document.querySelector('h1')
const label = document.querySelector('p')

let question = 1
let selectedQ

// Master reference array for validations
const questionsRef = [
  'How handsome/beautiful do you think you are? (1 to 10)',
  'Are you smart? (Yes or No)',
  'How are you right now? (Any)',
  'Have you ever had siblngs? (Yes or no)',
  'How many skills can you do? (Number)'
]

// Duplicate the array so we can safely remove items from it
let remainingQuestions = [...questionsRef];

function pickQuestion() {
  if (remainingQuestions.length === 0) return null;
  
  // 1. Pick a random index from remaining questions
  const chance = Math.floor(Math.random() * remainingQuestions.length);
  
  // 2. Splice removes the item from the pool and returns it
  return remainingQuestions.splice(chance, 1)[0];
}

// Pick initial question
selectedQ = pickQuestion()
label.textContent = selectedQ

function answer() {
  if (question === 5) {
    // End survey safely when pool runs out
    label.textContent = "Survey Complete! The tab will close shortly, thank you.";
    answerArea.style.display = 'none';
    submit.style.display = 'none';
    setTimeout(() => {
      window.close()
    }, 3000)
    return;
  }
  
  question += 1
  answerArea.style.top = '1000px';
  submit.style.top = '1000px';
  Qcounter.style.top = '-100px'
  label.style.top = '2050px'
  
  setTimeout(() => {
    // Picks a fresh question that hasn't been used yet
    selectedQ = pickQuestion()
    
    answerArea.value = "" 
    label.textContent = selectedQ
    Qcounter.textContent = "Question " + question
    
    Qcounter.style.top = "0px"
    label.style.top = "200px"
    
    setTimeout(() => {
      answerArea.style.top = '400px'
      setTimeout(() => {
        submit.style.top = '400px'
      }, 500)
    }, 250)
  }, 500)
}

function startSurvey() {
  startButton.style.right = '-1000px';
  setTimeout(() => {
    startButton.style.display = 'none';
  }, 200)
  
  Qcounter.style.top = '0px'
  label.style.right = '650px'
  label.textContent = selectedQ
  
  setTimeout(() => {
    answerArea.style.top = '400px'
    setTimeout(() => {
      submit.style.top = '400px'
    }, 500)
  }, 250)
}

startButton.addEventListener('click', () => {
  startButton.style.transform = 'scale(1.95)'
  setTimeout(() => {
    startButton.style.transform = 'scale(2)'
    startSurvey()
  }, 150)
})

// Validation updated to use questionsRef so index numbers don't break
submit.addEventListener('click', () => {
  const enteredValue = answerArea.value.trim()
  
  if (selectedQ === questionsRef[4]) {
    if (enteredValue === "" || isNaN(Number(enteredValue))) {
      alert("Please enter a valid number!");
      return;
    }
  }
  
  if (selectedQ === questionsRef[0]) {
    const num = Number(enteredValue);
    if (enteredValue === "" || isNaN(num) || num < 1 || num > 10) {
      alert("Please enter a number between 1 and 10!");
      return;
    }
  }

  if (selectedQ === questionsRef[2]) {
    if (enteredValue === "") {
        alert('Please enter something!')
        return;
    }
  }
  
  if (selectedQ === questionsRef[1] || selectedQ === questionsRef[3]) {
    const lowerValue = enteredValue.toLowerCase();
    if (enteredValue === "" || !["yes", "no"].includes(lowerValue)) {
      alert("Please type 'Yes' or 'No'!");
      return;
    }
  }
  
  answer(); 
});
