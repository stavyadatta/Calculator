var arrayOfNums = [];
var displayNum = NaN;
var finalNum = NaN
var equalBefore = false;
var operatorUsedBefore = false;
var inUseOperator;
var counterForEqual = 0;
var numberBeforeResult;

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
                counterForEqual++;
                if(counterForEqual > 1){
                    displayNum = decisionOperation(numberBeforeResult, displayNum, inUseOperator);
                    $('#display').val(decisionOperation(displayNum));
                }else{
                    $('#display').val(operationArray());
                }
                equalBefore = true;
            } else if(idOfOperator === 'clearButton'){
                equalOrClearImplementation(true);
            } else {
                if(arrayOfNums.length === 2){
                    outputError('entering the length statement');
                    $('#display').val(operationArray());
                    displayNum = NaN;
                } else {
                    outputError(displayNum, ' this is when the addition is not taking place');
                    displayNum = NaN;
                }
                inUseOperator = idOfOperator;
            }
        } else{
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
    counterForEqual = 0;
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
    outputError(finalResult, ' this is the result of the output');
    numberBeforeResult = arrayOfNums[1];
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

function outputError(value, message = ' '){
    console.log(value + message);
}