/* Triangle Game Javascript */

var circleColor = "green";
var resetButton = document.querySelector("#reset");
var circleOne = document.querySelector("#one");


// begin game
resetButton.addEventListener("click", function(){
     alert("Game started");

     if (circleColor === "green"){
    var col = circleOne.style.backgroundColor = "black";
    console.log("circleOne color = " + col);
     }
});
