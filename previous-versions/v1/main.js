// global variables "equation" defined in which the input equation is stored as string;

var equation = '';
var a,b,c;
var equal = false, variable = false;
var   variableCounter = 0;
var negativeSignOfB;
var negativeSignOfC;

  // below function is used to take digits of a number as an input untill some symbolic key is pressed. And store each digit in array named 'digitCollector';
function putNumber(numberPosition){
    var numberStackArray = ['0','1','2','3','4','5','6','7','8','9','.'];
    
    equation += numberStackArray[numberPosition];
    document.getElementById("output").innerHTML=equation;
}

  // below function is used to take operator as an input untill some numeric key is pressed. And store each operator in array named 'operatorCollector';
function putOperator(operatorPosition){
    var operatorStackArray = ['/','*','-','+'];
    
    equation += operatorStackArray[operatorPosition];
    document.getElementById("output").innerHTML=equation;
}

  // below function is used to take a required action when equals to key is pressed;
  // variableCounter ensures that user should enter only one variable

function putVariable() {
    equation += 'x';
    variable = true; document.getElementById("output").innerHTML=equation;
    if(variableCounter) {
        Error("Do not Enter Variable more than once");
    }
    variableCounter++;
}
function putEqual() {
    equation += '=';
    equal = true; document.getElementById("output").innerHTML=equation;
}

function reset() {
    equation = equation.substring(0,0);
    document.getElementById("output").innerHTML=equation;
    variableCounter = 0;
}
function goBack() {
    
    if(equation[equation.length-1] === 'x') {
        variableCounter = 0;
    }
    equation = equation.substring(0,equation.length-1);
    document.getElementById("output").innerHTML=equation;
}

function start() {
    
    if (!equal && !variable) {
        Error("You forget to Enter Required Character eg: 'x','='" );
        return 0;
    }
    a=1,b=0,c=0;
    var inputString = equation;
     variableCounter = 0;
     negativeSignOfB = 0;
     negativeSignOfC = 0;
    
      //The below loop is used to remove all the space present in the inputString;
    while(inputString.indexOf(" ") !== -1) {
        indexOfSpace = inputString.indexOf(" ");
        inputString = inputString.substring(0,indexOfSpace) + inputString.substring(indexOfSpace+1,inputString.length);
    }
    
      //The below function is used to identify rather first number entered is positive or negative;
    var sign = "";
    if (inputString[0] === '+') {
        inputString = inputString.substring(1,inputString.length);
    } else if (inputString[0] === '-') {
        inputString = inputString.substring(1,inputString.length);
        sign = '-';
    }
    
    
    var variable = 'x';
    var indexOfVariable = inputString.indexOf(variable);
        
        //the below if..else statement is used to 
        if(isNaN(inputString[indexOfVariable-1]) && isNaN(inputString[indexOfVariable+1])) {
            inputString = inputString.substring(0,indexOfVariable)+"1"+inputString.substring(indexOfVariable,inputString.length);
            indexOfVariable++;
        }
    
    
    var indexOfOperator = inputString.indexOf('+');
        if(indexOfOperator === -1) {
            indexOfOperator = inputString.indexOf('-');
        }
        
    var indexOfEqual = inputString.indexOf('=');
    var splitingPoint = [];
    
    if(indexOfVariable > indexOfOperator) {
        
        if(indexOfOperator > indexOfEqual) {
            // indexOfVariable>indexOfOperator>indexOfEqual
            splitingPoint.push(indexOfEqual);
            splitingPoint.push(indexOfOperator);
            splitingPoint.push(indexOfVariable);
            
        } else if(indexOfVariable > indexOfEqual){
            // indexOfVariable>indexOfEqual>indexOfOperator
            negativeSignOfC = 1;

            splitingPoint.push(indexOfOperator);
            splitingPoint.push(indexOfEqual);
            splitingPoint.push(indexOfVariable);
            
        } else {
            // indexOfEqual>indexOfVariable>indexOfOperator
            splitingPoint.push(indexOfOperator);
            splitingPoint.push(indexOfVariable);
            splitingPoint.push(indexOfEqual);
            
        }
        
    } else {
        //indexOfOperator>indexOfVariable
        if(indexOfVariable > indexOfEqual) {
            // indexOfOperator>indexOfVariable>indexOfEqual
            splitingPoint.push(indexOfEqual);
            splitingPoint.push(indexOfVariable);
            splitingPoint.push(indexOfOperator);
            
        } else if(indexOfOperator > indexOfEqual){
            // indexOfOperator>indexOfEqual>indexOfVariable
            negativeSignOfB = 1;

            splitingPoint.push(indexOfVariable);
            splitingPoint.push(indexOfEqual);
            splitingPoint.push(indexOfOperator);
            
        } else {
            // indexOfEqual>indexOfOperator>indexOfVariable
            splitingPoint.push(indexOfVariable);
            splitingPoint.push(indexOfOperator);
            splitingPoint.push(indexOfEqual);
            
        }
        
    }
    
    var value1 = parseFloat(inputString.substring(0,splitingPoint[0]));
    var value2 = parseFloat(inputString.substring(splitingPoint[0]+1, splitingPoint[1]));
    var value3 = parseFloat(inputString.substring(splitingPoint[1]+1, splitingPoint[2]));
    var value4 = parseFloat(inputString.substring(splitingPoint[2]+1, inputString.length));

    var numInEquation = [];
    if(!isNaN(value1)) {
        numInEquation.push(value1);
    }
    if(!isNaN(value2)) {
        numInEquation.push(value2);
    }
    if(!isNaN(value3)) {
        numInEquation.push(value3);
    }
    if(!isNaN(value4)) {
        numInEquation.push(value4);
    }

    numInEquation[0] = parseFloat(sign  + numInEquation[0].toString());
    
    if(numInEquation.length > 3 || numInEquation.length <= 2 && indexOfOperator !== -1 || numInEquation.length < 2 ) {
        Error("Expression Entered is not Suitable");
    } else {
        execute(numInEquation,sign+inputString);
    }
}

function execute(numInEquation,localInputString) {
    
    
    var identifier = localInputString.indexOf(numInEquation[0].toString());
    if(identifier === 0) {
        identifier = numInEquation[0].toString().length;
        checkAndAssign(identifier,localInputString,numInEquation,0);
    } else {
        checkAndAssign(identifier-1,localInputString,numInEquation,0);
    }
    localInputString = localInputString.substring(identifier+1,localInputString.length);
    
    
    if(numInEquation.length === 3) {
        identifier = localInputString.lastIndexOf(numInEquation[2].toString());

        if(localInputString.length - localInputString.substring(0,identifier).length === numInEquation[2].toString().length) {
            identifier -= 1;
            checkAndAssign(identifier,localInputString,numInEquation,2);
        } else {
            checkAndAssign(++identifier,localInputString,numInEquation,2);
        }
        localInputString = localInputString.substring(0,identifier);
     }
    
    
    identifier = localInputString.indexOf(numInEquation[1].toString());
    if(identifier === 0) {
        identifier = numInEquation[1].toString().length;
        checkAndAssign(identifier,localInputString,numInEquation,1);
    } else {
        checkAndAssign(identifier-1,localInputString,numInEquation,1);
    }
    calculate();
    
}

function checkAndAssign(identifier,inputString,numInEquation,i) {
    // ax+b=c;
    if(inputString[identifier] === 'x') {
       a = numInEquation[i];
    }
    if(inputString[identifier] === '+') {
         b = numInEquation[i];
       if(negativeSignOfB || negativeSignOfC) {
           b = 0-b;
        }
    }
    if(inputString[identifier] === '=') {
            c = numInEquation[i];
    }
    if(inputString[identifier] === '-') {
        b = -numInEquation[i];
       if(negativeSignOfB || negativeSignOfC) {
           b = 0-b;
        }
    }
    return 0;
}
function calculate() {
    var x = (c-b)/a;
    output(x);
}




function output(solution) {
    document.getElementById("output").innerHTML=equation+"<br> &rArr; X = " + solution;

}

function Error(extra) {
    document.getElementById("output").innerHTML=equation+"<br> Please Enter Valid Expression <br><br> Ex. <br> <ol> <li>3x+2=1</li> <li>3x-2=1</li> <li>2+4x=5</li> </ol> <br>" + extra;

}

function fixKeypadPosition() {
    var y = document.getElementsByClassName("KeypadPosition");
    var count=0;
         y[0].style.display = "block";
         y[1].style.display = "none";

    y = document.getElementsByClassName("inputKeys");
    y[0].style.position="fixed";
    y[0].style.bottom="0";
    y[0].style.backgroundImage = "rgba(15, 32, 39, 0.8);";
    y[0].style.backgroundImage = "-webkit-linear-gradient(to right, rgba(44, 83, 100, 0.8), rgba(32, 58, 67, 0.8), rgba(15, 32, 39, 0.8))";
    y[0].style.backgroundImage = "linear-gradient(to right, rgba(44, 83, 100, 0.8), rgba(32, 58, 67, 0.8), rgba(15, 32, 39, 0.8))";
}







function unfixKeypadPosition() {
    var y = document.getElementsByClassName("KeypadPosition");
    var count=0;
         y[1].style.display = "block";
         y[0].style.display = "none";
    y = document.getElementsByClassName("inputKeys");
    y[0].style.position="relative";
    y[0].style.bottom="none";
    y[0].style.backgroundImage = "none";
}


function pageLoaded() {
    var z = document.getElementsByClassName("cursorProperty");
    z[0].style.cursor = "pointer";
    z[1].style.cursor = "pointer";
    z[2].style.cursor = "pointer";
    z[3].style.cursor = "pointer";
    z[4].style.cursor = "pointer";
    z[5].style.cursor = "pointer";
    z[6].style.cursor = "pointer";
    z[7].style.cursor = "pointer";
    z[8].style.cursor = "pointer";
    z[9].style.cursor = "pointer";
    z[10].style.cursor = "pointer";
    z[11].style.cursor = "pointer";
    z[12].style.cursor = "pointer";
    z[13].style.cursor = "pointer";
    z[14].style.cursor = "pointer";
    z[15].style.cursor = "pointer";
    z[16].style.cursor = "pointer";
    z[17].style.cursor = "pointer";
}


function deleteZeroesFromStart (tempvariable) {
    while(tempvariable.startsWith('0')) {
        tempvariable = tempvariable.substring(1,tempvariable.length);
    }
    return tempvariable;
}

/* Set the width of the side navigation to 250px */
// function openNav() {
//     document.getElementById("mySidenav").style.width = "280px";
// }

/* Set the width of the side navigation to 0 */
// function closeNav() {
//     document.getElementById("mySidenav").style.width = "0";
// } 