"use strict";

const commit = document.querySelector(".profile-commits-container");

for (let week = 0; week < 52; week++) {
    // Create Row
    const row = document.createElement("div");
    row.classList.add("commit-row");
    for (let day = 0; day < 7; day++) {
        // Insert Days into Row
        const item = document.createElement("div");
        item.classList.add("commit-item");
        row.appendChild(item);
    }
    console.log(commit);
    commit.appendChild(row);
    // Append Row to Container
}
