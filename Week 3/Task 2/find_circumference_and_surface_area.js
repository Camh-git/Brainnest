const pi = Math.PI;
function find_circumference_and_surface_area(radius){
    find_circumference(radius);
    find_surface_area(radius);
}
function find_circumference(radius){
    let circumference = 2 * pi * radius;
    console.log(`The circumference of a circle with a radius of ${radius} is ${circumference}`);
}
function find_surface_area(radius){
    let area = pi * (radius*radius)
    console.log(`The area of a circle with a raidus of ${radius} is ${area}`);
}
find_circumference_and_surface_area(4);