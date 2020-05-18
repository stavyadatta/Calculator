/// <reference path="../typings/globals/jquery/index.d.ts" />
// $('#display').html('0');

var arrayOfNums = [];
var displayNum = NaN;
var finalNum = NaN
$("table").find('td').find("button").on({
    click: function () {
        if(!($(this).attr('value'))){
            arrayOfNums.push(parseInt(displayNum))
            displayingOperation();
            displayNum = NaN;
            var idOfOperator = $(this).attr('id');
            if(idOfOperator === 'equalsButton'){
                $('#display').val(operationArray());
            }else{
                arrayOfNums.push(idOfOperator);
            }
        } else{
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
    for(var i = 0; i<onlyOperations.length; i++){
        finalResult = decisionOperation(onlyNums[0],onlyNums[1], onlyOperations[i]);
        onlyNums.shift();
        onlyNums[0] = finalResult;

    }
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

function outputError(value, message = ' '){
    console.log(value + message);
}