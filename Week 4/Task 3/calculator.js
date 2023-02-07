const Display = document.getElementById("Display");
const Numb_pad = document.querySelectorAll("#Num_pad button");
const Operators = document.querySelectorAll("#Operations button");
const Warning = document.getElementById("warning");

//Remodel logic: each input is added to history, operate whenever an operator is input(this includes displaying the result), unless  input_history has less than 
//2 numbers, add results to result history. the results will show when operator is pressed(to see results as you go in multi-step calculations) or when = is pressed
let input_history = [];
let result_history = [];
let value1 = 0;
let value2 = 0;
let operator = "";
let result = 0;

function setup(){
  //Setup the number inputs
  for (i = 0; i <Numb_pad.length; i++){
    Numb_pad[i].addEventListener('click',function(e){
      //Order of checks: is value 1 filled, if so is the operator chosen, if so is value 2 already filled
      if(value1 == 0){
        value1 = e.target.value;
        Display.textContent = value1;
      } else if (operator == "") {
        Warning.textContent = "Please select an operator before adding the second value";        
      } else if (value2 == 0){
        value2 = e.target.value;
        Display.textContent = value2;
      } else{
        Warning.textContent = "Please select an operator before adding the second value"; 
      }
      console.log(value1 + "," + value2); //TODO: debug, delete this
    });
  }
  //Setup the operator inputs
  for (i = 0; i <Operators.length; i++){
    Operators[i].addEventListener('click',function(e){
      if(operator == ""){
        let symbol = "";
        switch(e.target.value){
         case "Add":
           symbol = "+";
           break;
         case "Subtract":
           symbol = "-";
           break;
         case "Multiply":
           symbol = "*";
           break;
         case "Divide":
            symbol = "/";
            break;
        }
      operator = symbol;
      console.log(operator); //TODO: debug, delete this
      Display.textContent = operator;
      } else {
        Warning.textContent = "Operator already selected";
      }
    });
  }
  //Setup the equals button
  let run_btn = document.getElementById("Equals_btn");
  run_btn.addEventListener('click',function(e){
    if(value1 == 0 || value2 == 0 || operator == ""){
      Warning.textContent = "Please fill out the equation before running.";
    } else {
      operate();
    }
  });
  //setup the Clear button
  let clear_btn = document.getElementById("Clear_btn");
  clear_btn.addEventListener('click',function(e){
    //This is added on the assumption that you didn't want this to just reload the page
    Display.textContent = Warning.textContent = operator = "";
    value1 = value2 = result = 0;
    console.log(value1 +","+value2+","+result+","+Display.textContent+","+Warning.textContent+","+operator); //TODO: debug: delete this
  });

}

function add (value1, value2){
  return(Number(value1) + Number(value2));
}
function subtract (value1, value2){
  return(value1 - value2);
}
function multiply (value1, value2){
  return(value1 * value2);
}
function divide (value1, value2){
  return(value1 / value2);
}

function operate(){
  switch(operator){
    case "+":
      result = add(value1, value2);
      break;
    case "-":
      result = subtract(value1, value2);
      break;
    case "*":
      result = multiply(value1, value2);
      break;
    case "/":
      result = divide(value1, value2);
      break;
  }
  console.log(result);//TODO: debug, delete when done
  value1 =0, value2 =0, operator = "";
  Display.textContent = result;

}
setup();