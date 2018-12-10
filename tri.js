/* Triangle Game Javascript */

// variables
var circleColorOne = "green";
var circleArrayGreen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var circleArrayBlack = [];
var resetButton = document.querySelector("#reset");
var circleOne = document.querySelector("#one");
var allCircles = document.querySelectorAll(".circle");

//start - reset toggle button
resetButton.addEventListener("click", function () {
   if (circleColorOne === "green") {
      //function to start game
      startGame();
   } else {
      //function to reset all circles to green
      resetCircles();
   }
});

//function to start game
function startGame() {
   circleOne.style.backgroundColor = "black";
   circleColorOne = "black";
   //remove circle 1 from the active array
   delete circleArrayGreen[0];
   //add circle 1 to inactive array
   circleArrayBlack.push(1);
}

//function to reset circle colors
function resetCircles() {
   //reset all circles color to green
   for (i = 0; i < allCircles.length; i++) {
      allCircles[i].style.backgroundColor = "green";
   }

   //reset array contents to start
   circleArrayGreen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
   circleArrayBlack = [];
   circleColorOne = "green";
}

// function to change circle color to white onclick if game started
window.onload = function () {
   var anchors = document.getElementsByClassName("circle");
   for (var i = 0; i < anchors.length; i++) {
      var anchor = anchors[i];
      anchor.onclick = function () {
         var x = this.id;
         //onclick only if game is started
         if (circleColorOne === "black") {
            if (document.getElementById(x).style.backgroundColor === 'green') {
               document.getElementById(x).style.backgroundColor = 'white';
            } else {
               document.getElementById(x).style.backgroundColor = 'green';
            }
         }
      }
   }
}