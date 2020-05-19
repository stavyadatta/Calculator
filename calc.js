/// <reference path="../typings/globals/jquery/index.d.ts" />
// $('#display').html('0');

var arrayOfNums = [];
var displayNum = NaN;
var finalNum = NaN
var equalBefore = false;
var operatorUsedBefore = false;
var inUseOperator;

$("table").find('td').find("button").on({
    click: function () {
        outputError(arrayOfNums, ' at all times');
        if(!($(this).attr('value'))){
            /// if the equals is not used before then that means the user wants results so that's why there shouldn't be
            /// double pushing into array
            var idOfOperator = $(this).attr('id');
            if(equalBefore){
                equalBefore = false;
            } else{
                arrayOfNums.push(parseInt(displayNum));
            }
            outputError(arrayOfNums, ' after the push');
            if(idOfOperator === 'equalsButton'){
                $('#display').val(operationArray());
                equalBefore = true;
                return;
            } else if(idOfOperator === 'clearButton'){
                equalOrClearImplementation(true);
            }
            if(arrayOfNums.length === 2){
                outputError('entering the length statement');
                $('#display').val(operationArray());
                displayNum = NaN;
            } else {
                outputError(displayNum, ' this is when the addition is not taking place');
                displayNum = NaN;
            }
            inUseOperator = idOfOperator;

            // if(!equalBefore){
            //     arrayOfNums.push(parseInt(displayNum));
            // } else{
            //     /// since no pushing the equals before can be turned false
            //     equalBefore = false;
            // }
            /// this part of the code is to make sure the value the user sees is appropriate
            // if(!operatorUsedBefore){
            //     displayingOperation();
            //     operatorUsedBefore = true;
            //     arrayOfNums.push(idOfOperator);
            //     $('#display').val(operationArray());
            // }else{
            //     ///outputError(arrayOfNums, ' this is when the 2nd operator is inputted')
            //     arrayOfNums.push(idOfOperator);
            // }
            //
            // displayNum = NaN;
            //
            // if(idOfOperator === 'equalsButton'){
            //     $('#display').val(operationArray());
            // } else if(idOfOperator === 'clearButton'){
            //     clearCalculation();
            // }
        } else{
            // if(equalBefore){
            //     ///outputError(displayNum, ' entering???');
            //     displayNum = NaN;
            //     arrayOfNums = [];
            //     equalBefore = false;
            // }
            outputError('whenever the user enters a number');
            if(equalBefore){
                equalOrClearImplementation();
                equalBefore = false;
            }
            displaying($(this).val());
        }
    }
});

function equalOrClearImplementation(clearDecision = false) {
    if(clearDecision){
        $('#display').val(' ');
    }
    displayNum = NaN;
    arrayOfNums = [];
    inUseOperator = null;
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
    outputError(arrayOfNums, ' when the operator button is hit');
    var onlyOperations = inUseOperator;
    var finalResult = decisionOperation(arrayOfNums[0], arrayOfNums[1], onlyOperations);
    outputError(finalResult, ' this is the result of the output')
    arrayOfNums = [finalResult];
    outputError(arrayOfNums, ' this operator should now only be having one value that is 3');
    displayNum = finalResult;
    return finalResult;
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
    if(isNaN(two)){
        return one;
    }
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