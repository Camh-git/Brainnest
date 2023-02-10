const Display = document.getElementById("Display");
const Numb_pad = document.querySelectorAll("#Num_pad button");
const Operators = document.querySelectorAll("#Operations button");
const Warning = document.getElementById("warning");

//Remodel logic: each input is added to history, operate whenever an operator is input(this includes displaying the result), unless  input_history has less than 
//2 numbers, add results to result history. the results will show when operator is pressed(to see results as you go in multi-step calculations) or when = is pressed
let history = [];
let current_value = 0;
let operator = "";
let last_result = 0;

function debug_show_history(){
  let response = "History:";
  for (i=0; i<history.length;i++){
    response+= history[i];
  }
  return(response);
}

function setup(){
  //Setup the number inputs
  for (i = 0; i <Numb_pad.length; i++){
    Numb_pad[i].addEventListener('click',function(e){
      if(current_value == 0){
        current_value = e.target.value;
      } else {
        current_value += e.target.value;
      }
      Display.textContent = current_value;
    });
  }
  //Setup the operator inputs
  //TODO: fix issue where chaining operators without an = causes the wrong operator to be used(try running the chain example to see).
  for (i = 0; i <Operators.length; i++){
    Operators[i].addEventListener('click',function(e){
      switch(e.target.value){
        case "Add":
          operator = "+";
          break;
        case "Subtract":
          operator = "-";
          break;
        case "Multiply":
          operator = "*";
          break;
        case "Divide":
          operator = "/";
          break;
        }
      Display.textContent = operator;

      //This check stops the calculator from using a value that was just reset to 0 by a previous operation
      if(current_value == 0){
        console.log("Operator event handler: no current value, skipping operation, ignore if just after result");
        return;
      }
      history.push(current_value);
      current_value = 0;
      if(history.length > 1){
        operate(history[history.length-2],history[history.length-1]);
      } else{
        console.log("Operator event handler: operation skipped due to lack of second value");
      }
    });
  }
  //Setup the equals button
  let run_btn = document.getElementById("Equals_btn");
  run_btn.addEventListener('click',function(e){
    history.push(current_value);
    current_value = 0;

    if(history.length <= 1 || operator == ""){
      Warning.textContent = "Please fill out the equation before running.";
    } else {
      operate(history[history.length-2],history[history.length-1]);
    }
  });
  //setup the Clear button
  //TODO: update this to clear the final values
  let clear_btn = document.getElementById("Clear_btn");
  clear_btn.addEventListener('click',function(e){
    //This is on the assumption that you didn't want this to just reload the page
    Display.textContent = Warning.textContent = operator = "";
    current_value = last_result = history.length = 0;
  });
  //Setup the backspace button
  let backspace_btn = document.getElementById("backspace");
  backspace_btn.addEventListener('click',function(e){
    current_value = Number(current_value.toString().slice(0,-1));
    Display.textContent = Warning.textContent = current_value;
  });
  
  //Setup keyboard control
  document.addEventListener('keydown',function(e){
    console.log(e.key);
    switch(e.key){
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
        e.preventDefault();
        for (i = 0; i <Numb_pad.length; i++){
          if(Numb_pad[i].value == e.key){
            Numb_pad[i].click();
          }
        }
        break;
      case "+":
      case "-":
      case "/":
      case "*":
        e.preventDefault();
        for (i = 0; i < Operators.length; i++){
          if(Operators[i].value == e.key){
            Operators[i].click();
          }
        }
        break;

      case "Backspace":
        e.preventDefault();
        let back = document.getElementById("backspace");
        back.click();
        break;
      
      case "Enter":
        e.preventDefault();
        let Equals = document.getElementById("Equals_btn");
        Equals.click();
        break;
    }

  });
}

function add (value1, value2){
  console.log(`adding: ${value1} to ${value2}`);
  return(Number(value1) + Number(value2));
}
function subtract (value1, value2){
  console.log(`subtracting: ${value1} from ${value2}`);
  return(Number(value1) - Number(value2));
}
function multiply (value1, value2){
  console.log(`multiplying: ${value1} by ${value2}`);
  return(Number(value1) * Number(value2));
}
function divide (value1, value2){
  console.log(`dividing: ${value1} by ${value2}`);
  if(value1 == Number(0) || value2 == Number(0)){
    Warning.textContent = "Nice try, but you can't divide by 0";
  } else {
    return(Number(value1) / Number(value2));
    
  }
}

function operate(value1,value2){
  console.log(`value 1:${value1}, value2:${value2}`); //TODO: debug, delete when done
  switch(operator){
    case "+":
      last_result = add(value1, value2);
      break;
    case "-":
      last_result = subtract(value1, value2);
      break;
    case "*":
      last_result = multiply(value1, value2);
      break;
    case "/":
      last_result = divide(value1, value2);
      break;
  }
  history.push(last_result);
  Display.textContent = last_result;
  debug_show_history();

}
setup();