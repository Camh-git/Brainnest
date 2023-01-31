function find_diagonal(length, width){
  //Based on a² + b² = c²
  let diag = length*Math.sqrt(2);
  console.log(`The diagonal of a square with sides of ${length} is:${diag}`);
}
find_diagonal(9,9);