function area_of_a_triangle(side_1,side_2,side_3){
  //the equation was written out this way to tidy things up. The value SP is short for semiperimeter
  let SP = side_1+side_2+side_3;
  let a = -side_1+side_2+side_3;
  let b = side_1-side_2+side_3;
  let c = side_1+side_2-side_3;
  let area = Math.sqrt(SP*a*b*c)*0.25;
  area = Number(area.toPrecision(3));
  console.log(`The area of a triange with sides ${side_1},${side_2} and ${side_3} is: ${area}`);
}
area_of_a_triangle(5,6,7);