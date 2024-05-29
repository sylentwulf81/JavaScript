// Initialize "locked" state for red, green, and blue color values

let redLocked = false;
let greenLocked = false;
let blueLocked = false;

// Initialize color values of red, green, and blue to 0

let red = 0;
let green = 0;
let blue = 0;

let lockStates = [redLocked, greenLocked, blueLocked];

let redValue = document.getElementById('red-result-text');
let greenValue = document.getElementById('green-result-text');
let blueValue = document.getElementById('blue-result-text');

/* 
    Handles updating the stored values of red, green, and blue in local storage
*/ 

function updateColor() {
    localStorage.setItem("redStorage", red);
    localStorage.setItem("greenStorage", green);
    localStorage.setItem("blueStorage", blue);
}

/*
Handles passing the locally stored value for red, green, and blue to their respective spans.
Also prints to the console the current lock status of each color variable when called. 
*/

function storedValue() {
    redValue.innerHTML = `${red}`;
    greenValue.innerHTML = `${green}`;
    blueValue.innerHTML = `${blue}`;

    if (redLocked === true) {
        console.log(`STORED VALUE: Red is LOCKED`)
    } else if (!redLocked) {
        console.log(`STORED VALUE: Red is UNLOCKED`)
    }

    if (greenLocked === true) {
        console.log(`STORED VALUE: Green is LOCKED`)
    } else if (!greenLocked) {
        console.log(`STORED VALUE: Green is UNLOCKED`)
    }

    if (blueLocked === true) {
        console.log(`STORED VALUE: Blue is LOCKED`)
    } else if (!blueLocked) {
        console.log(`STORED VALUE: Blue is UNLOCKED`)
    }
}


// Handles checking the locally stored calues of red, green, and blue (if any exist) 
// Also handles checking the locked or unlocked state of red, green, and blue at startup 

function handleStartup() {
    redLocked = localStorage.getItem("redLocked") === "true";
    greenLocked = localStorage.getItem("greenLocked") === "true";
    blueLocked = localStorage.getItem("blueLocked") === "true";

    if (redLocked) {
        document.getElementById('red-lock-icon').innerText = "Red: Locked"
    } else {
        document.getElementById('red-lock-icon').innerText = "Red: Unlocked"
    }

    if (greenLocked) {
        document.getElementById('green-lock-icon').innerText = "Green: Locked"
    } else {
        document.getElementById('green-lock-icon').innerText = "Green: Unlocked"
    }

    if (blueLocked) {
        document.getElementById('blue-lock-icon').innerText = "Blue: Locked"
    } else {
        document.getElementById('blue-lock-icon').innerText = "Blue: Unlocked"
    }

    red = parseInt(localStorage.getItem("redStorage"));
    console.log(`Red storage value is ${red}`);
    green = parseInt(localStorage.getItem("greenStorage"));
    console.log(`Green stored value is ${green}`);
    blue = parseInt(localStorage.getItem("blueStorage"));
    console.log(`Blue stored value is ${blue}`);

    document.body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

    redValue.innerHTML = `${red}`;
    greenValue.innerHTML = `${green}`;
    blueValue.innerHTML = `${blue}`;


    updateColor();
    storedValue();
}


/*
Randomizes the values of red, green, and blue 
*/ 

function randomizeColors() {
    if (redLocked && greenLocked && blueLocked) {
        alert( "All color values are locked!\nUnlock at least one value to continue." );
        return
    } 
    // If red value is not locked, randomize red
    if (!redLocked) {
        red = Math.floor(Math.random() * 256);
        redValue.innerHTML = `${red}`;
    }
    // If green value is not locked, randomize green
    if (!greenLocked) {
        green = Math.floor(Math.random() * 256);
        greenValue.innerHTML = `${green}`;
    }
    // If blue value is not locked, randomize blue
    if (!blueLocked) {
        blue = Math.floor(Math.random() * 256);
        blueValue.innerHTML = `${blue}`;
    }

    let randomColor = `rgb(${red}, ${green}, ${blue})`
    console.log(randomColor);

    // Change background color to randomColor
    document.body.style.backgroundColor = randomColor;

    updateColor()
}


/*
    Handles copying RGB to the clipboard 
*/ 

function copyColors() {
    navigator.clipboard.writeText(`rgb(${red}, ${green}, ${blue})`); 
    alert("Colors copied to clipboard!")
}

/*
    Resets all color values to 0, ignoring values that are already at 0 OR locked
*/

function resetColors() {
    if (red == 0 && green === 0 && blue === 0) {
        alert("All color values are already at 0")
        console.log("Nothing to reset")
        return
    } else {
        if (red !== 0 && !redLocked) {
            red = 0;
        }
        if (green !== 0 && !greenLocked) {
            green = 0;
        }
        if (blue !== 0 && !blueLocked) {
            blue = 0;
        }
    }

    document.body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

    updateColor();
    storedValue();
}

/* 
Color lock functions
TODO: Convert lock values to a lookup table and shrink these three disparate functions to a single one
*/

function lockRed() {
    redLocked = !redLocked; // Toggles the boolean value of redLocked
    if (redLocked) {
        console.log("Red has been LOCKED.");
        alert("Red has been LOCKED.")
        document.getElementById("red-lock-icon").innerText = "🔒"
    } else {
        console.log("Red has been UNLOCKED.");
        alert("Red has been UNLOCKED.")
        document.getElementById("red-lock-icon").innerText = "🔓"
    }
    localStorage.setItem("redLocked", redLocked);
}

function lockGreen() {
    greenLocked = !greenLocked; // Toggles the boolean value of greenLocked
    if (greenLocked) {
        console.log("Green has been LOCKED.");
        alert("Green has been LOCKED.")
        document.getElementById('green-lock-icon').innerHTML = "🔒"
    } else if (!greenLocked) {
        console.log("Green has been UNLOCKED.");
        alert("Green has been UNLOCKED.")
        document.getElementById("green-lock-icon").innerText = "🔓"
    }
    localStorage.setItem("greenLocked", greenLocked);
}

function lockBlue() {
    blueLocked = !blueLocked; // Toggles the boolean value of blueLocked
    if (blueLocked) {
        console.log("Blue has been LOCKED.");
        alert("Blue has been LOCKED.")
        document.getElementById("blue-lock-icon").innerText = "🔒";
    } else {
        console.log("Blue has been UNLOCKED.");
        alert("Blue has been UNLOCKED.")
        document.getElementById("blue-lock-icon").innerText = "🔓"
    }
    localStorage.setItem("blueLocked", blueLocked);
}

// Forces handling of load events
window.onload = handleStartup;