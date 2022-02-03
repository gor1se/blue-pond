"use strict";

// import User from "./public/db/user.js";
import User from "./public/db/user.js";

const addVision = document.querySelector(".vision-add");
const addVisionText = document.querySelector("#newVision");

addVision.addEventListener("click", () => {
    if (addVisionText.value !== "") {
        console.log("Add: " + addVisionText.value);
    } else {
        console.log("not add");
    }
});
