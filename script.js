const startButton = document.querySelector('button')
const submit = document.querySelector('.submit')
const answerArea = document.querySelector('textarea')
const body = document.body
const Qcounter = document.querySelector('h1')
const label = document.querySelector('p')
const learnMore = document.querySelector('.learnmore')
const fX = document.querySelector('.fExit')
const textArea = document.querySelector('.feedback')
const Fframe = document.querySelector(".background")
const fSubmit = document.querySelector('.fSubmit')
const fTitle = document.querySelector('.fTitle')

let question = 1
let selectedQ

const questionsRef = [
  'How handsome/beautiful do you think you are? (1 to 10)',
  'Are you smart? (Yes or No)',
  'How are you right now? (Any)',
  'Have you ever had siblngs? (Yes or no)',
  'How many skills can you do? (Number)',
  'What is your favorite hobby or pass-time? (Any)',
  'How many hours of sleep do you get per night? (Number)',
  'Do you prefer coffee or tea? (Coffee or Tea)',
  'What year were you born? (4-digit Number)',
  'Are you currently employed? (Yes or No)',
  'How many countries have you visited? (Number)',
  'Do you prefer hot weather or cold weather? (Hot or Cold)',
  'What is your favorite color? (Color Name)',
  'How many pets do you currently own? (Number)',
  'Do you believe in aliens? (Yes or No)'
]

const validColors = [
  'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 
  'black', 'white', 'gray', 'grey', 'violet', 'indigo', 'cyan', 'magenta', 
  'turquoise', 'gold', 'silver', 'beige', 'maroon', 'navy', 'lavender'
]

let remainingQuestions = [...questionsRef];

function pickQuestion() {
  if (remainingQuestions.length === 0) return null;
  const chance = Math.floor(Math.random() * remainingQuestions.length);
  return remainingQuestions.splice(chance, 1);
}

selectedQ = pickQuestion()
label.textContent = selectedQ

function answer() {
  if (question === 15) {
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

learnMore.addEventListener('click', () => {
  Fframe.style.display = 'inline'
  fTitle.style.display = 'inline'
  fX.style.display = 'inline'
  fSubmit.style.display = 'inline'
  textArea.style.display = 'inline'
})

fX.addEventListener('click', () => {
  Fframe.style.display = 'none'
  fTitle.style.display = 'none'
  fX.style.display = 'none'
  fSubmit.style.display = 'none'
  textArea.style.display = 'none'
})

startButton.addEventListener('click', () => {
  startButton.style.transform = 'scale(1.95)'
  setTimeout(() => {
    startButton.style.transform = 'scale(2)'
    startSurvey()
  }, 150)
})

submit.addEventListener('click', () => {
  const enteredValue = answerArea.value.trim()
  const lowerValue = enteredValue.toLowerCase();
  
  if (selectedQ === questionsRef || selectedQ === questionsRef || selectedQ === questionsRef || selectedQ === questionsRef) {
    if (enteredValue === "" || isNaN(Number(enteredValue))) {
      alert("Please enter a valid number!");
      return;
    }
  }
  
  if (selectedQ === questionsRef) {
    const num = Number(enteredValue);
    if (enteredValue === "" || isNaN(num) || num < 1 || num > 10) {
      alert("Please enter a number between 1 and 10!");
      return;
    }
  }

  if (selectedQ === questionsRef) {
    const num = Number(enteredValue);
    if (enteredValue === "" || isNaN(num) || enteredValue.length !== 4) {
      alert("Please enter a valid 4-digit year!");
      return;
    }
  }

  if (selectedQ === questionsRef || selectedQ === questionsRef) {
    if (enteredValue === "") {
        alert('Please enter something!')
        return;
    }
  }

  if (selectedQ === questionsRef) {
    if (enteredValue === "" || !validColors.includes(lowerValue)) {
      alert("Please enter a valid color name!");
      return;
    }
  }
  
  if (selectedQ === questionsRef || selectedQ === questionsRef || selectedQ === questionsRef || selectedQ === questionsRef) {
    if (enteredValue === "" || !["yes", "no"].includes(lowerValue)) {
      alert("Please type 'Yes' or 'No'!");
      return;
    }
  }

  if (selectedQ === questionsRef) {
    if (enteredValue === "" || !["coffee", "tea"].includes(lowerValue)) {
      alert("Please type 'Coffee' or 'Tea'!");
      return;
    }
  }

  if (selectedQ === questionsRef) {
    if (enteredValue === "" || !["hot", "cold"].includes(lowerValue)) {
      alert("Please type 'Hot' or 'Cold'!");
      return;
    }
  }
  
  answer(); 
});

learnMore.addEventListener('click', () => {
    
})

// ===== FEEDBACK EMAIL (EmailJS) =====

// Wait for page to fully load before using EmailJS
window.addEventListener('load', function() {
  // Initialize EmailJS with your Public Key
  emailjs.init("M0zTgl2nMw_wrRjep");

  const fSubmitBtn = document.querySelector('.fSubmit');
  const feedbackArea = document.querySelector('.feedback');

  fSubmitBtn.addEventListener('click', function() {
    const feedbackText = feedbackArea.value.trim();
    
    if (feedbackText === "") {
      alert("Please write some feedback before submitting!");
      return;
    }

    // Show sending state
    fSubmitBtn.textContent = "Sending...";
    fSubmitBtn.disabled = true;

    // Send via EmailJS
    emailjs.send(
      "service_thyl6yk",
      "template_8ku8mid",
      {
        subject: "New Survey Feedback Submitted",
        message: feedbackText,
        to_email: "thelittledevchannel@gmail.com, josefdawsonbiler@gmail.com"
      }
    ).then(function(response) {
      alert("Feedback sent successfully! Thank you.");
      feedbackArea.value = "";
    }, function(error) {
      alert("Failed to send feedback. Please try again later.\nError: " + error.text);
    }).finally(function() {
      fSubmitBtn.textContent = "Submit";
      fSubmitBtn.disabled = false;
    });
  });
});