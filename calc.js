/// <reference path="../typings/globals/jquery/index.d.ts" />
// $('#display').html('0');

var arrayOfNums = [];
var displayNum = NaN;
var finalNum = NaN
var equalBefore = false;
var operatorUsedBefore = false;

$("table").find('td').find("button").on({
    click: function () {
        outputError(arrayOfNums, ' at all times');
        if(!($(this).attr('value'))){
            /// this part of the code is to make sure the value the user sees is appropriate
            if(!operatorUsedBefore) {
                displayingOperation();
            }
            /// if the equals is not used before then that means the user wants results so that's why there shouldn't be
            /// double pushing into array
            if(!equalBefore){
                arrayOfNums.push(parseInt(displayNum));
            } else{
                /// since no pushing the equalsbefore can be turned false
                equalBefore = false;
            }
            displayNum = NaN;

            var idOfOperator = $(this).attr('id');
            if(idOfOperator === 'equalsButton'){
                $('#display').val(operationArray());
            } else if(idOfOperator === 'clearButton'){
                clearCalculation();
            } else{
                outputError(equalBefore, ' Entering the else statement when the operator is pushed');
                arrayOfNums.push(idOfOperator);
            }
        } else{
            if(equalBefore){
                outputError(displayNum, ' entering???');
                displayNum = NaN;
                arrayOfNums = [];
                equalBefore = false;
            }
            displaying($(this).val());
        }
    }
});

function displayingOperation() {
    $('#display').val(displayNum);
}
function displaying(value) {
    if(isNaN(displayNum)){
        $('#display').val(value);
        displayNum = value;
    } else{
        var firstItemOfArray = displayNum;
        var bigValue = firstItemOfArray * 10;
        var finalValue = bigValue + parseInt(value);
         displayNum = finalValue;
        $('#display').val(finalValue);
    }
}
function operationArray() {
    var onlyNums = arrayOfNums.filter(numbersOnly);
    var onlyOperations = arrayOfNums.filter(idOnly);
    var finalResult;
    outputError(onlyNums, ' initial array of nums');
    for(var i = 0; i<onlyOperations.length; i++){
        finalResult = decisionOperation(onlyNums[0],onlyNums[1], onlyOperations[i]);
        onlyNums.shift();
        onlyNums[0] = finalResult;
    }
    arrayOfNums = [onlyNums[0]];
    outputError(arrayOfNums, ' this is after the equal sign has been pressed');
    displayNum = onlyNums[0];
    equalBefore = true;
    return onlyNums[0];

}

function numbersOnly(value) {
    if (typeof (value) === 'number') {
        return value;
    }
}

function idOnly(value) {
    if (typeof (value) === 'string'){
        return value;
    }
}

function decisionOperation(one, two, operation){
    if(operation === 'addButton'){
        return one + two;
    } else if(operation === 'subtractButton'){
        return one - two;
    } else if( operation === 'multiplyButton'){
        return one * two;
    } else if(operation === 'divideButton'){
        return one/two;
    }
}
function clearCalculation() {
    $('#display').val(' ');
    arrayOfNums = [];
    displayNum = NaN;
}

function outputError(value, message = ' '){
    console.log(value + message);
}