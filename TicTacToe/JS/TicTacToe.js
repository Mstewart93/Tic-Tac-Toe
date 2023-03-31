let activePlayer = 'X';
//keeps track of whose turn it is.
let selectedSquares = [];
//This is an array of moves. determines win condition.

function placeXOrO(squareNumber) {
    //function for placing x or o
    if (!selectedSquares.some(element => element.includes(squareNumber)))
    // Condition ensures square hasnt been selected
    //.some() used to check each elemn of th array
    // to see if it contains the square number clicked on.
    {
        let select = document.getElementById(squareNumber);
        //this retreives the HTML id that was clicked on
        if (activePlayer === 'X') {
            //checks whose turn it is.
            select.style.backgroundImage = 'url("./images/cat.jpeg")';
            // if player is x then image is X
        }
        else {
            select.style.backgroundImage = 'url("./images/dog.jpg")';
        }
        selectedSquares.push(squareNumber + activePlayer);
        //squarenumer and activel player are concatenaed and added to array
        checkWinConditions();
        //this calls a function to check for any win conditions.
        if (activePlayer === 'X') {
            activePlayer = 'O'
            // if active player is X change to O
        }
        else {
            activePlayer = 'X'
        }
        audio('./media/place.mp3');
        //plays placement sound.
        if (activePlayer === 'O') {
            //checks computer turn
            disableClick();
            //disables clicking for computers turn
            setTimeout(function () { computersTurn(); }, 1000);
            //this waits 1 second before thecomputer places an image and enables click
        }
        return true;
        //returning true is needed for our computersTurn() funtion to work

    }
    function computersTurn() {
        //this resluts in a random square being selecte
        let success = false;
        // this is need for a wile loop
        let pickASquare;
        //this variable storesa random number 0-8.
        while (!success) {
            pickASquare = String(Math.floor(Math.random()*9));
            //rrandom number between 0 and 8 is selected 
            if (placeXOrO(pickASquare)) {
            //if the randm numebr evaluated returns tru the square hasnt been pickded

                placeXOrO(pickASquare)
                //this calls the function
                success = true;
                //this changes the boolean and ends the loop.
            };
        }
    }
}
// the following function looks throught the selected quares array to
//search for win conditions
//drawline() function is called to draw a line on the screen 
//if the condtion is met
 function checkWinConditions() {
    // X 0, 1, 2 condition
    if (arrayIncludes('0X', '1X', '2X')) {drawWinLine(50, 100, 558, 100) }
    // X 3, 4, 5 condition 
    else if (arrayIncludes('3X','4X','5X')) {drawWinLine(50, 304, 558, 304) }

    else if (arrayIncludes('6X','7X','8X')) {drawWinLine(50, 508, 558, 508) }

    else if (arrayIncludes('0X','3X','6X')) {drawWinLine(50, 508, 558, 508) }

    else if (arrayIncludes('1X','4X','7X')) {drawWinLine(304, 50, 304, 558) }

    else if (arrayIncludes('2X','5X','8X')) {drawWinLine(508, 50, 508, 558) }

    else if (arrayIncludes('6X','4X','2X')) {drawWinLine(100, 508, 510, 90) }

    else if (arrayIncludes('0X','4X','8X')) {drawWinLine(100, 100, 520, 520) }

    else if (arrayIncludes('0O','1O','2O')) {drawWinLine(50, 100, 558, 100) } 

    else if (arrayIncludes('3O','4O','5O')) {drawWinLine(50, 304, 558, 304) }

    else if (arrayIncludes('6O','7O','8O')) {drawWinLine(50, 508, 558, 508) }

    else if (arrayIncludes('0O','3O','6O')) {drawWinLine(100, 50, 100, 558) }

    else if (arrayIncludes('1O','4O','7O')) {drawWinLine(304, 50, 304, 558) }

    else if (arrayIncludes('2O','5O','8O')) {drawWinLine(508, 50, 508, 558) }

    else if (arrayIncludes('6O','4O','2O')) {drawWinLine(100, 508, 510, 90) }

    else if (arrayIncludes('0O','4O','8O')) {drawWinLine(100, 100, 520, 520) }

    else if (selectedSquares.length >= 9) {
        audio('./media/tie.mp3');
        setTimeout(function () {resetGame(); }, 500);
    }

    function arrayIncludes(squareA, squareB, squareC) {
        const a =selectedSquares.includes(squareA);
        const b =selectedSquares.includes(squareB);
        const c =selectedSquares.includes(squareC);

        if (a === true && b === true && c === true) { return true;}
   
    }
 }

 function disableClick() {
    body.style.pointerEvents = 'none';
    setTimeout(function () { body.style.pointerEvents = 'auto'; }, 1000);
   }

   function audio(audioURL) {
    let audio = new Audio(audioURL);
    audio.play();
   }
   


//THE CODE WORKED UP TO HERE




   function drawWinLine(coordX1, coordY1, coordX2, coordY2)
   //uses HTMML canvas to draw the win lines
   {
    const canvas = document.getElementById('win-lines');
    // accesses the canvas element
    const c = canvas.getContext('2d');
    //gives access to methods and properties to use on canvas
    let x1 = coordX1,
    //start of a line on the x axis
        y1 = coordY1,
        //start y axis
        x2 = coordX2,
        //end x axis
        y2 = coordY2,
        //end y axis
        x = x1,
        //this stores the temporary x axis data we update in the loop
        y = y1;
        //this stores the temp y data
    function animateLineDrawing() 
        //this function interacts with the canvas
    {
        const animationLoop = requestAnimationFrame(animateLineDrawing);
        // this creates a loop
        c.clearRect(0, 0, 608, 608);
        //this method clears content from the last loop iteration
        c.beginPath();
        // this starts a new path.
        c.moveTo(x1, y1);
        //This method moves us to a starting point in our line.
        c.lineTo(x,y);
        //this method indicates the end point in ur line.
        c.lineWidth = 10;
        //this sets the width of our line
        c.strokeStyle = 'rgba(70, 255, 33, .8';
        //sets the color of the line
        c.stroke();
        // this draws everything we set above.
        if (x1 <= x2 && y1 <= y2) {
            if (x < x2) {x += 10; }
            if (y < y2) {y += 10; }
            if (x >= x2 && y >= y2 ) { cancelAnimationFrame(animationLoop); }
        }

        if (x1 <= x2 && y1 >= y2) {
            if (x < x2) {x += 10;}
            if (y > y2) {y -= 10;}
            if (x >= x2 && y <= y2) {cancelAnimationFrame(animationLoop); }
        }
    }  

    function clear() {
        const animationLoop = requestAnimationFrame(clear);
        c.clearRect(0, 0, 608, 608);
        cancelAnimationFrame(animationLoop);
    }
    disableClick();
    audio('./media/winGame.mp3');
    animateLineDrawing();
    setTimeout(function () {clear(); resetGame(); }, 1000);



   }