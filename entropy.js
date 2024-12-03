let input = 'abrakadabra';

let alph = new Object();

let inLength = input.length;

for (let i = 0; i < inLength; i++) {
  if (alph[input.charAt(i)]) {
    alph[input.charAt(i)]++;
  } else {
    alph[input.charAt(i)] = 1;
  }
}


let alphPower = 0;

for (let i in alph) {
  alphPower++;
  alph[i] /= inLength;
}

entropy = 0;

if (alphPower > 1) {
  for (let i in alph) {
    entropy -= alph[i] * Math.log(alph[i]);
  }
  entropy /= Math.log(alphPower);
}

console.log(entropy);
