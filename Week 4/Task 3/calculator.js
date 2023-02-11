const Display = document.getElementById("display");
const Numb_pad = document.querySelectorAll("#Num_pad button");
const Operators = document.querySelectorAll("#Operations button");
let run_btn = document.getElementById("equals_btn");

let history = [];
let current_value = 0;
let operator = "";
let last_result = 0;
let new_float = false;

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
        //check if user just added a decimal point, and overwrite the trailing 0 if so
        if(new_float){
          current_value += e.target.value;
          current_value = current_value.slice(0,-2) + current_value.slice(-1);
          new_float = false;
        } else {
          current_value += e.target.value;
        }
      }
      Display.textContent = current_value;
    });
  }
  //Setup the operator inputs
  for (i = 0; i <Operators.length; i++){
    Operators[i].addEventListener('click',function(e){
      run_btn.click();
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
      if(last_result = 0){
        Display.textContent = last_result + " " + operator;
      } else {
        Display.textContent = Display.textContent + " " + operator;
      }

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
  run_btn.addEventListener('click',function(e){
    history.push(current_value);
    current_value = 0;

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
    Display.textContent = operator = "";
    current_value = last_result = history.length = 0;
    new_float = false;
  });

  //Setup the backspace button
  let backspace_btn = document.getElementById("backspace");
  backspace_btn.addEventListener('click',function(e){
    current_value = Number(current_value.toString().slice(0,-1));
    Display.textContent = current_value;
  });

  //Setup the float button
  let float_btn = document.getElementById("float_btn");
  float_btn.addEventListener('click',function(e){
    current_value = parseFloat(current_value).toFixed(1);
    new_float = true;
    Display.textContent = current_value;
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
      case ".":
        e.preventDefault();
        let float_btn = document.getElementById("float_btn");
        float_btn.click();
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
    return("Nice try, but you can't divide by 0");
  } else {
    return(Number(value1) / Number(value2));
    
  }
}

function operate(value1,value2){
  result_backup = last_result;
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

  Display.textContent = last_result;
  //If we got the divide by 0 response restore the previous result, else add the result to history
  if(last_result =="Nice try, but you can't divide by 0"){
    last_result = result_backup;
  } else{
    history.push(last_result);
  }
}
setup();
