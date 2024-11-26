//Вся информация находится в READ_ME


//Не знаю, само появилось, без него вроде работает
//const { strictEqual } = require('assert');


let fs = require('fs'); //Работа с фалами

//Не знаю, само появилось, без него вроде работает
//const { isNumber } = require('util');
//const { isNumberObject } = require('util/types');

let inText = fs.readFileSync('input.txt', 'utf8'); //Запись строки файла в переменную
inText = inText.toString(); // Конверитрование переменной в тип данных string для дальнейшей работы с строкой

let len = inText.length;//длинна строки

fs.writeFileSync('output.txt', '');//очистка файла, в который мы будем складывать сжатую строку


//БЛОК СЖАТИЯ

for(let i = 0; i< len; i++){
    //подсчёт цепочки повторяющихся символов
    let n = 0;
    while(inText.charAt(i) == inText.charAt(i+n)){
        n++;
    }
    console.log(inText[i], n);

    i+=n-1;// элемент под индексом i равен элементу под индексом i+n-1, т. к. под этим индексом стоит последний элемент цепочки

    //блок записи сжатой цепочки
    
    if(n>2){ //проверяем осмысленность сжатия(зачем нам заменять 1 или 2 символа на 3) 
        while(n>=255){//проверка на выход из 255, т.к. в char выделено 8 байт, 256 символов с 0 до 255
            fs.appendFileSync('output.txt', "#"+ String.fromCharCode(255) + inText.charAt(i));
            n = n-255;
        }
        
        fs.appendFileSync('output.txt', "#" + String.fromCharCode(n)); // вывод хвостика меньшего 255
    }

    //иначе если сжатие элемента бессмыслено
    if(n==2){
        fs.appendFileSync('output.txt', inText.charAt(i));
    }
    fs.appendFileSync('output.txt', inText.charAt(i));
}

//БЛОК РАСШИФРОВКИ

//аналогично 14 и 15 строкам соответственно
let inDText = fs.readFileSync('output.txt', 'utf8');
inDText = inDText.toString();

len = inDText.length;
console.log('1');

//очистка файла с декодированным текстом
fs.writeFileSync('decode.txt', '');

for(let i = 0; i < len; i++){
    if(inDText.charAt(i)=='#'){ // если по строке мы нашли специальный символ
        let repits = inDText.charCodeAt(i+1); //то после него идёт символ, чей номер равен количеству повтороней следующего символа
        for (let j = 0; j < repits;j++){
            fs.appendFileSync('decode.txt', inDText.charAt(i+2))//запись repits раз этого сивола
        }
        i+=2;
    }
    else{// в любом случае нам нужно записать i(тый) символ
        fs.appendFileSync('decode.txt', inDText.charAt(i))
    }
}