/* Creating a method that takes in an array of any type as a parameter 
and creating a new randomized array of it by spreading the array inside another array.
We are using this method to randomize the order of the answer options.*/

export const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);
