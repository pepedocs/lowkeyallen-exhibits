# id
javascript-programming-language-1995

# title
JavaScript Programming Language

# what
The JavaScript programming language, created by Brendan Eich at Netscape in just 10 days. Originally designed to make web pages interactive, JavaScript became one of the world's most widely used programming languages and the foundation of modern web development.

# impact
- Made web pages interactive and dynamic for the first time
- Became the only programming language supported by all web browsers
- Evolved from simple scripts to powering complex web applications
- Enabled the rise of AJAX, single-page applications, and modern web frameworks
- Expanded beyond browsers to servers (Node.js), mobile apps, and desktop applications
- Remains the most widely used programming language globally

# when
1995

# category
Computing History

# language
JavaScript

# codeSnippet
```javascript
// The original JavaScript concepts that changed web development forever
// These examples show the revolutionary features Brendan Eich created in 10 days

// 1. First-class functions - functions as values
function createCounter() {
    var count = 0;  // Closures - inner functions access outer variables
    
    return function() {
        count++;
        return count;
    };
}

var counter1 = createCounter();
var counter2 = createCounter();

console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter2()); // 1 (separate closure)

// 2. Dynamic object creation and modification
var person = {
    name: "Brendan Eich",
    age: 34,
    greet: function() {
        return "Hello, I'm " + this.name;
    }
};

// Objects can be modified at runtime
person.occupation = "Language Designer";
person.createLanguage = function(name, days) {
    return "Created " + name + " in " + days + " days";
};

console.log(person.createLanguage("JavaScript", 10));

// 3. Prototype-based inheritance (not class-based like Java)
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    return this.name + " makes a sound";
};

function Dog(name, breed) {
    Animal.call(this, name);  // Call parent constructor
    this.breed = breed;
}

// Set up prototype chain
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.speak = function() {
    return this.name + " barks";
};

var myDog = new Dog("Rex", "Golden Retriever");
console.log(myDog.speak()); // "Rex barks"

// 4. Event-driven programming for web interactivity
// Original DOM manipulation that made the web dynamic
function makePageInteractive() {
    // Find elements and add behavior
    var button = document.getElementById("myButton");
    var output = document.getElementById("output");
    
    // Event handlers - the foundation of interactive web pages
    button.onclick = function() {
        output.innerHTML = "Button clicked at " + new Date();
        
        // Animation - changing styles dynamically
        output.style.color = "red";
        setTimeout(function() {
            output.style.color = "black";
        }, 1000);
    };
    
    // Form validation - preventing bad data
    var form = document.getElementById("userForm");
    form.onsubmit = function(event) {
        var name = document.getElementById("userName").value;
        if (name.length < 2) {
            alert("Name must be at least 2 characters");
            event.preventDefault(); // Stop form submission
            return false;
        }
        return true;
    };
}

// 5. Asynchronous programming with callbacks
function loadDataFromServer(url, callback) {
    // XMLHttpRequest - AJAX before it was called AJAX
    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) { // Request complete
            if (xhr.status === 200) {
                callback(null, xhr.responseText);
            } else {
                callback(new Error("Request failed: " + xhr.status));
            }
        }
    };
    
    xhr.open("GET", url, true); // true = asynchronous
    xhr.send();
}

// Usage - the callback pattern that dominated early JavaScript
loadDataFromServer("/api/users", function(error, data) {
    if (error) {
        console.error("Failed to load data:", error);
        return;
    }
    
    try {
        var users = JSON.parse(data);
        displayUsers(users);
    } catch (parseError) {
        console.error("Invalid JSON:", parseError);
    }
});

// 6. Dynamic typing and type coercion
function demonstrateJavaScriptQuirks() {
    // Type coercion - automatic type conversion
    console.log("5" + 3);      // "53" (string concatenation)
    console.log("5" - 3);      // 2 (numeric subtraction)
    console.log("5" * "3");    // 15 (both converted to numbers)
    
    // Truthiness and falsiness
    if ("") {
        console.log("Empty string is truthy"); // Won't execute
    }
    
    if ("0") {
        console.log("String '0' is truthy"); // Will execute
    }
    
    // The infamous == vs === 
    console.log(0 == false);   // true (type coercion)
    console.log(0 === false);  // false (strict equality)
    
    // Dynamic property access
    var obj = { name: "JavaScript", year: 1995 };
    var property = "name";
    console.log(obj[property]); // "JavaScript"
    console.log(obj.year);      // 1995
}

// 7. The module pattern (before official modules existed)
var MyModule = (function() {
    // Private variables and functions
    var privateCounter = 0;
    var privateFunction = function() {
        console.log("This is private");
    };
    
    // Public API
    return {
        increment: function() {
            privateCounter++;
        },
        decrement: function() {
            privateCounter--;
        },
        getCount: function() {
            return privateCounter;
        },
        reset: function() {
            privateCounter = 0;
            privateFunction(); // Can call private function
        }
    };
})();

// Usage
MyModule.increment();
MyModule.increment();
console.log(MyModule.getCount()); // 2

// 8. Original browser detection and feature testing
function getBrowserInfo() {
    var userAgent = navigator.userAgent;
    var browser = "Unknown";
    
    // The browser wars era detection
    if (userAgent.indexOf("Netscape") !== -1) {
        browser = "Netscape Navigator";
    } else if (userAgent.indexOf("MSIE") !== -1) {
        browser = "Internet Explorer";
    }
    
    // Feature detection (better approach)
    var features = {
        hasLocalStorage: typeof(Storage) !== "undefined",
        hasCanvas: !!document.createElement('canvas').getContext,
        hasWebGL: (function() {
            try {
                var canvas = document.createElement('canvas');
                return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
            } catch(e) {
                return false;
            }
        })()
    };
    
    return { browser: browser, features: features };
}

// Initialize the page when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", makePageInteractive);
} else {
    makePageInteractive();
}
```

# sourceLink
Based on Netscape Navigator source code and Brendan Eich's original design documents

# expertExplanation
Brendan Eich drew inspiration from Scheme (first-class functions, closures), Self (prototype-based inheritance), and Java (C-like syntax) to create JavaScript in just 10 days in May 1995. The time pressure led to some questionable design decisions (like type coercion and the confusing 'this' binding), but also produced surprisingly elegant features like closures and first-class functions that were rare in mainstream languages at the time. JavaScript's ability to modify itself at runtime and manipulate the DOM made the web programmable for the first time.