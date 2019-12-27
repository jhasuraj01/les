// global variables "equation" defined in which the input equation is stored as string;
 var equation = '';
 var programExecution;
 
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
 }
 function putEqual() {
     equation += '=';
     equal = true; document.getElementById("output").innerHTML=equation;
 }
 
 function reset() {
     equation = equation.substring(0,0);
     document.getElementById("output").innerHTML=equation;
 }
 
 function goBack() {
     equation = equation.substring(0,equation.length-1);
     document.getElementById("output").innerHTML=equation;
 }
 
 function start() {
 
     programExecution = true;
     var inputString = equation;
 
     var equationCenter = inputString.indexOf("=");
     var LHS = inputString.substring(0,equationCenter);
     var RHS = inputString.substring(equationCenter+1,inputString.length);
 
     var termsInLHS = getArrayOfTerms(LHS);
     var termsInRHS = getArrayOfTerms(RHS);
 
     var constantInLHS = 0;
     var variableInLHS = [];
     for (var i = 0; i<termsInLHS.length; i++) {
         if(isNaN(termsInLHS[i])) {
             variableInLHS.push(termsInLHS[i]);
         } else {
             constantInLHS += parseFloat(termsInLHS[i]);
         }
     }
 
     var constantInRHS = 0;
     var variableInRHS = [];
     for (i = 0; i<termsInRHS.length; i++) {
         if(isNaN(termsInRHS[i])) {
             variableInRHS.push(termsInRHS[i]);
         } else {
             constantInRHS += parseFloat(termsInRHS[i]);
         }
     }
 
     
 
     var sumOfCoefficients = getCoefficientOfVariable(variableInLHS) - getCoefficientOfVariable(variableInRHS);
     if (sumOfCoefficients === 0) {
         Error("This is not an example of linear equation. <br> For equation to be a linear equation the coefficient of 'x' should be non-zero");
     }
     var sumOfConstants = constantInRHS - constantInLHS;
    
 
     var valueOfVariable = sumOfConstants/sumOfCoefficients;
     output(valueOfVariable);
 
 }
   
   // the below function takes an array as an input which contains a variable terms and return the sum of the coefficient of that variable;
 function getCoefficientOfVariable(arrayOfVariable) {
 
     var coefficientOfVariable = 0;
 
     for (i = 0; i<arrayOfVariable.length; i++) {
 
         var varElement = arrayOfVariable[i].toString();
 
         var sign = "";
         if (varElement[0] === '+') {
             varElement = varElement.substring(1,varElement.length);
         } else if (varElement[0] === '-') {
             varElement = varElement.substring(1,varElement.length);
             sign = '-';
         }
 
         if (varElement === 'x') {
             varElement = '1x';
         }
 
         if (varElement.indexOf('x') === 0 && varElement.lastIndexOf('x') === 0) {
             coefficientOfVariable += parseFloat(sign + varElement.substring(1,varElement.length));
 
         } else if (varElement.indexOf('x') === varElement.length-1 && varElement.lastIndexOf('x') === varElement.length-1) {
             coefficientOfVariable += parseFloat(sign + varElement.substring(0,varElement.length-1));
 
         } else {
             Error("You may have written number on both the side of the variable or may have written two 'x' together.");
             return 0;
         }
     }
 
     return coefficientOfVariable;
 }
 
   // the below function takes a string as an input, separate each term and returns the array of terms; 
 function getArrayOfTerms(varString) {
 
     var arrayOfTerms = [];
 
     var sign = "";
     if (varString[0] === '+') {
         varString = varString.substring(1,varString.length);
     } else if (varString[0] === '-') {
         varString = varString.substring(1,varString.length);
         sign = '-';
     }
 
     while (varString.indexOf('+') !== -1 || varString.indexOf('-') !== -1) {
 
         var indexOfPlus = varString.indexOf('+');
         var indexOfMinus = varString.indexOf('-');
 
         if (indexOfPlus !== -1 && indexOfPlus !== 0 && indexOfPlus < indexOfMinus || indexOfMinus === -1) {
             var arrayOfTermsElement = varString.substring(0,indexOfPlus);
             arrayOfTerms.push(sign + arrayOfTermsElement);
             varString = varString.substring(indexOfPlus+1,varString.length);
             sign = '';
 
         } else if (indexOfMinus !== -1 && indexOfMinus !== 0) {
             arrayOfTermsElement = varString.substring(0,indexOfMinus);
             arrayOfTerms.push(sign + arrayOfTermsElement);
             varString = varString.substring(indexOfMinus+1,varString.length);
             sign = '-';
 
         } else if (indexOfMinus === 0 || indexOfPlus === 0) {
             Error("Don't put two mathematical operators['+' or '-'] together");
 
         }
         if ( varString[varString.length-1] === '+' || varString[varString.length-1] === '-') {
             Error("Do not put mathematical operator['+' or '-'] before '=' sign");
         }
 
     }
     arrayOfTerms.push(sign + varString);
 
     return arrayOfTerms;
 }
 
 
 function output(solution) {
     if (programExecution) {
         document.getElementById("output").innerHTML=equation+"<br> &rArr; X = " + solution;
     }
 }
 
 function Error(extra) {
     document.getElementById("output").innerHTML=equation+"<br> Please Enter Valid Expression <br><br> Ex. <br> <ol> <li>3x+2=1</li> <li>3x-2=1</li> <li>2+4x=5</li> </ol> <br>" + extra;
     programExecution = false;
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
 
 
 function deleteZeroesFromStart (tempvariable) {
     while(tempvariable.startsWith('0')) {
         tempvariable = tempvariable.substring(1,tempvariable.length);
     }
     return tempvariable;
 }
 
 /* Set the width of the side navigation to 250px */
//  function openNav() {
//      document.getElementById("mySidenav").style.width = "280px";
//  }
 
 /* Set the width of the side navigation to 0 */
//  function closeNav() {
//      document.getElementById("mySidenav").style.width = "0";
//  }