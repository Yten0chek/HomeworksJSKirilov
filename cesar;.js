let fs = require('fs');


//Блок создания массива частот оригинального массива и объявление переданного алфавита
let CF_ENG = [0.0804, 0.0154, 0.0306, 0.0399, 0.1251, 0.0230, 0.0196, 0.0549, 0.0726, 0.0016, 0.0067, 0.0414, 0.0253, 0.0709, 0.0760, 0.0200, 0.0011, 0.0612, 0.0654, 0.0925, 0.0271, 0.0099, 0.0192, 0.0019, 0.0173, 0.0009];
let FF = new Array();
let len = 26;
//Конец блока



//Объявление и иничиолизация оригинального алфавита
let alph = new Object();
let ArrayAlph = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
ArrayAlph.forEach(element => {
    alph[element]=1;
});
// alph является словарём, в котором значению ключу - букве алфавита, будет соответствовать количество его вхождений во всём тексте
// конец блока


//читаем файл
let inText = fs.readFileSync('HarryPotterText.txt', 'utf8').toString();
//inText = inText.toString;


//Блок подсчёта вхождений каждого символа (из англ алфавита, НЕ буквы кодироваться не будут) и подсчёт количества всех букв
let totalLenght = 0;
for(let element in inText){
    let symbol = inText[element].toLowerCase();
    if(alph[symbol]){
        alph[symbol.toLowerCase()]++;
        totalLenght++;
    }
}
//Конец блока


let totalRemove = 24; //сдвиг алфавита, подробнее в READ_ME_CESAR.txt


//Блок частот со сдвигом, подробнее в READ_ME_CESAR.txt
let i = 0;
for(let symbol in alph){
    let index = (i+totalRemove)%len;
    FF[index] = (alph[symbol]-1)/totalLenght;
    i++;
}
//Конец блока


//ДЕКОДИРОВАНИЕ ШИФРА ЦЕЗАРЯ
let bing = new Array(); //создаём массив,
//в который далее будем передавать все суммы квадратов разности (расстояния) между оригинальным алфовитом и
//сдвинутым передаваемым алфовитом
for(let j = 0; j < len; j++){
    bing[j]=0;
}

let argMin = 0; //сдвиг передоваемого алфавита, при котором сумма минимальна 
let minFun = 10000000;//минимальная сумма
//подсчёт всех сумм квадратов расстаяний
for(let k = 0; k < len; k++){
    for(let i = 0; i < len; i++){
        bing[k] += ((CF_ENG[i] - FF[(i+k)%len])*(CF_ENG[i] - FF[(i+k)%len]));
    }
    //выявление наименьшей суммы
    if (bing[k] < minFun){
        minFun = bing[k];
        argMin = k;
    }
}

console.log(argMin);

