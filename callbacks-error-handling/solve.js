var argv = require('yargs')
    .usage('Usage: node $0 --l=[num] --b=[num]')
    .demand(['l','b'])
    .argv;

var rect = require('./rect.js');

function solveRect (l, b) {
    console.log("Solving for rectangle with l = " + l + " and b = " + b);
    
    rect(l, b, function(error, rectangle) {
        if (error) {
            console.log(error); 
        } else {
            console.log("The area of a rectangle of dimensions length = " + l + " and breadth = " + b + " is " + rectangle.area());
            console.log("The perimeter of a rectangle of dimensions length = " + l + " and breadth = " + b + " is " + rectangle.perimeter());
        }
    });
    console.log("");
}

solveRect(argv.l, argv.b);

// example usage: node solve.js -l  =2 -b=3