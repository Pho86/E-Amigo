export function selectRandomFromArray(array: any[]) {
   return array[Math.floor(Math.random() * array.length)]
}

export function generateRandomNumber(min:number, max:number) {
   return Math.floor(Math.random() * (max - min + 1) + min);
}