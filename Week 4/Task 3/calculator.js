const display = document.getElementById("display");
const numbPad = document.querySelectorAll("#Num_pad button");
const operators = document.querySelectorAll("#Operations button");
const runBtn = document.getElementById("equals_btn");

let history = [];
let currentValue = 0;
let operator = "";
let lastResult = 0;
let newFloat = false;

function setup(){
  //Setup the number inputs
  for (i = 0; i <numbPad.length; i++){
    numbPad[i].addEventListener('click',function(e){
      if(currentValue == 0){
        if(newFloat){
           setup_new_float(e);
        } else {
          currentValue = e.target.value;
        }
      } else {
        //check if user just added a decimal point, and overwrite the trailing 0 if so
        if(newFloat){
          setup_new_float(e);
        } else {
          currentValue += e.target.value;
        }
      }
      display.textContent = currentValue;
    });
  }
  //Setup the operator inputs
  for (i = 0; i <operators.length; i++){
    operators[i].addEventListener('click',function(e){
      runBtn.click();
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
      if(lastResult = 0){
        display.textContent = lastResult + " " + operator;
      } else {
        display.textContent = display.textContent + " " + operator;
      }

      //This check stops the calculator from using a value that was just reset to 0 by a previous operation
      if(currentValue == 0){
        console.log("Operator event handler: no current value, skipping operation, ignore if just after result");
        return;
      }

      history.push(currentValue);
      currentValue = 0;

      if(history.length > 1){
        operate(history[history.length-2],history[history.length-1]);
      } else{
        console.log("Operator event handler: operation skipped due to lack of second value");
      }
    });
  }
  //Setup the equals button
  runBtn.addEventListener('click',function(e){
    history.push(currentValue);
    currentValue = 0;

    if(history.length <= 1 || operator == ""){
      console.log("Please fill out the equation before running.");
    } else {
      operate(history[history.length-2],history[history.length-1]);
    }
  });

  //setup the Clear button
  let clear_btn = document.getElementById("clear_btn");
  clear_btn.addEventListener('click',function(e){
    //This is on the assumption that you didn't want this to just reload the page
    operator = "";
    display.textContent = 0;
    currentValue = lastResult = history.length = 0;
    newFloat = false;
  });

  //Setup the backspace button
  let backspace_btn = document.getElementById("backspace");
  backspace_btn.addEventListener('click',function(e){
    currentValue = Number(currentValue.toString().slice(0,-1));
    display.textContent = currentValue;
  });

  //Setup the float button
  let float_btn = document.getElementById("float_btn");
  float_btn.addEventListener('click',function(e){
    currentValue = parseFloat(currentValue).toFixed(1);
    newFloat = true;
    display.textContent = currentValue;
  });

  //Setup keyboard control
  document.addEventListener('keydown',function(e){
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
        for (i = 0; i <numbPad.length; i++){
          if(numbPad[i].value == e.key){
            numbPad[i].click();
          }
        }
        break;
      case "+":
      case "-":
      case "/":
      case "*":
        e.preventDefault();
        for (i = 0; i < operators.length; i++){
          if(operators[i].value == e.key){
            operators[i].click();
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

      case ".":
        e.preventDefault();
        let float_btn = document.getElementById("float_btn");
        float_btn.click();
        break;
    }
  });
}

function setup_new_float(e){
  currentValue += e.target.value;
  currentValue = currentValue.slice(0,-2) + currentValue.slice(-1);
  newFloat = false;
}

function debug_show_history(){
  let response = "History:";
  for (i=0; i<history.length;i++){
    response+= history[i];
  }
  return(response);
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
    return("Nice try, but you can't divide by 0");
  } else {
    return(Number(value1) / Number(value2));
  }
}

function operate(value1,value2){
  result_backup = lastResult;
  switch(operator){
    case "+":
      lastResult = add(value1, value2);
      break;
    case "-":
      lastResult = subtract(value1, value2);
      break;
    case "*":
      lastResult = multiply(value1, value2);
      break;
    case "/":
      lastResult = divide(value1, value2);
      break;
  }

  display.textContent = lastResult;
  //If we got the divide by 0 response restore the previous result, else add the result to history
  if(lastResult =="Nice try, but you can't divide by 0"){
    lastResult = result_backup;
  } else{
    history.push(lastResult);
  }
}
setup();