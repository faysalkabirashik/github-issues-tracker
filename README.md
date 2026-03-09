



# GitHub Issues Tracker – Assignment Question:

## 1️⃣ What is the difference between `var`, `let`, and `const`?

`var`, `let`, and `const` are all used to declare variables in JavaScript, but they behave differently.

* **var** is the older way of declaring variables. As it is function scoped. It can be redeclared.
* **let** was introduced in ES6. It is block-scoped. It can be updated but cannot be re-declared in the same scope.
* **const** is also block-scoped, but its value cannot be reassigned after it is declared. It is used for constant variable. When it is declared it should be assigned as well.

---

## 2️⃣ What is the spread operator (`...`)?

The spread operator (`...`) is used to expand elements of an array or properties of an object into another array or object. 

Example with arrays:

```javascript
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4, 5];
```


---

## 3️⃣ What is the difference between `map()`, `filter()`, and `forEach()`?

* **map()** creates a new array by transforming each element of the original array.
* **filter()** creates a new array containing for only the elements that match a certain condition.
* **forEach()** loops through each element in the array but it does not return a new array.

---

## 4️⃣ What is an arrow function?

An arrow function is a shorter way to write functions in JavaScript. 

Example of a normal function:

```javascript
function add(a, b) {
  return a + b;
}
```
---

## 5️⃣ What are template literals?

Template literals are a way to create strings using backticks (`` ` ``) instead of single or double quotes. They allow variables and expressions to be easily included inside strings using `${}`.

Example:

```javascript
const name = "Ashik";
const message = `Hello, my name is ${name}`;
```

Template literals also allow multi-line strings without using `\n`, which makes them very useful for formatting text.

---

**Author:**
Md. Foysal Kabir Ashik
