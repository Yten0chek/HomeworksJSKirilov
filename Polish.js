let expression = "1.345e-12 + 2";
//let expression = "-12*(-11 + 2) + 2";
let TrueAnswer = eval(expression);
expression+='f';
expression = expression.split(' ').join('');

expression = expression.split("e+").join("*10^");
expression = expression.split("e-").join("*10^-");

let res = expression.match(/((\()?(\^)?\-)?\d+(\.\d*)?/g);
if(expression[0]=='-')
    res[0] = '-' + res[0];
for(let i = 0; i<res.length;i++){
    let a =res[i];
    if(res[i][0] == '(' || res[i][0] == '^'){
        res[i]=res[i].substring(1);
    }
}
//console.log(res);
let answer = new Array();
let operations = new Array();
let operationsArch = {'+':1,'-':1,'^':3,'*':2,'/':2, 'f': -1};
let len = expression.length;
let j=0;
let beforeBraces = new Array();

for(let i = 1; i < len;i++){
    let symbol=expression.charAt(i);
    
    if(symbol == '('){
        beforeBraces.push('(');
        beforeBraces=beforeBraces.concat(operations);
        operations = new Array();
    }
    if(symbol == ')'){
        if(expression.charAt(i-1)!=')'){
            answer.push(res[j]);
            j++;
        }
        for(let g = operations.length-1; g>=0;g--){
            answer.push(operations.pop());
        }
        while(beforeBraces[beforeBraces.length-1]!='('){
            operations.push(beforeBraces.pop());
        }
        beforeBraces.pop();
        operations = operations.reverse();
    }
    if(symbol == '-' && (expression.charAt(i-1)=='(' || expression.charAt(i-1)=='^')){
        continue;
    }
    else if(operationsArch[symbol]){
        if(expression.charAt(i-1)!=')'){
            answer.push(res[j]);
            j++;
        }
        for(let g = operations.length-1; operationsArch[operations[g]] >= operationsArch[symbol] && operationsArch[symbol]!=3;g--){
            answer.push(operations.pop());
        }
        if(symbol!='f')
            operations.push(symbol);
        //console.log(operations);
    }
}
console.log(answer.join(' '));

function removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }

while(answer.length-1){
    let i = 0;
    for(i;!isNaN(answer[i]);i++);
    let exp = answer[i-2] + answer[i] + answer[i-1]
    answer[i] = eval(exp);
    answer[i-1]='f';
    answer[i-2]='f';
    answer=removeItemAll(answer,'f');
    //console.log(answer);
}
console.log(answer[0] == TrueAnswer);
console.log(answer[0]);
console.log(TrueAnswer);