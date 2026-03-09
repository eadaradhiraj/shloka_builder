"use strict";

// FIX: \\u → \u so Unicode ranges actually work
const non_rom_reg = /[^\u0000-\u024F\u1E00-\u1EFF\u2C60-\u2C7F\uA720-\uA7FF]/g;

// FIX: ["l"].includes(lorg) → lorg === "l" throughout
function laghu_or_dirgha(sylls, pos, lorg) {
    if (sylls.length < pos) {
        return "";
    } else if (lorg === "l") {
        return vowel_type(sylls[pos - 1]) === "l" ? "text-success" : "text-danger";
    } else if (lorg === "g") {
        return vowel_type(sylls[pos - 1]) === "g" ? "text-success" : "text-danger";
    } else {
        return "";
    }
}

// Metre patterns defined as plain arrays — much less repetitive than
// calling laghu_or_dirgha() once per syllable at definition time.
// Key: position index (1-based) → "l" or "g"
// These are looked up at render time against the actual sylls array.
const METRE_PATTERNS = {
    "anushtup":            { 5:"l", 6:"g", 7:"g", 13:"l", 14:"g", 15:"l" },
    "upendravajra":        { 1:"l", 2:"g", 3:"l", 4:"g", 5:"g", 6:"l", 7:"l", 8:"g", 9:"l", 10:"g", 11:"g" },
    "shalini":             { 1:"g", 2:"g", 3:"g", 4:"g", 5:"g", 6:"l", 7:"g", 8:"g", 9:"l", 10:"g", 11:"g" },
    "bhujangaprayAta":     { 1:"l", 2:"g", 3:"g", 4:"l", 5:"g", 6:"g", 7:"l", 8:"g", 9:"g", 10:"l", 11:"g", 12:"g" },
    "druta-vilambita":     { 1:"l", 2:"l", 3:"l", 4:"g", 5:"l", 6:"l", 7:"g", 8:"l", 9:"l", 10:"g", 11:"l", 12:"g", 13:"l", 14:"l", 15:"l", 16:"g", 17:"l", 18:"l", 19:"g", 20:"l", 21:"l", 22:"g", 23:"l", 24:"g" },
    "chandriNI":           { 1:"l", 2:"g", 3:"g", 4:"g", 5:"g", 6:"g", 7:"g", 8:"l", 9:"g", 10:"g", 11:"l", 12:"g", 13:"g" },
    "mAlinI":              { 1:"l", 2:"l", 3:"l", 4:"l", 5:"l", 6:"l", 7:"g", 8:"g", 9:"g", 10:"l", 11:"g", 12:"g", 13:"l", 14:"g", 15:"g" },
    "totakam":             { 1:"l", 2:"l", 3:"g", 4:"l", 5:"l", 6:"g", 7:"l", 8:"l", 9:"g", 10:"l", 11:"l", 12:"g" },
    "pancAmaram":          { 1:"l", 2:"g", 3:"l", 4:"g", 5:"l", 6:"g", 7:"l", 8:"g", 9:"l", 10:"g", 11:"l", 12:"g", 13:"l", 14:"g", 15:"l", 16:"g" },
    "shikhariNI":          { 1:"l", 2:"g", 3:"g", 4:"g", 5:"g", 6:"g", 7:"l", 8:"l", 9:"l", 10:"l", 11:"l", 12:"g", 13:"g", 14:"l", 15:"l", 16:"l", 17:"g" },
    "mandAkrAntA":         { 1:"g", 2:"g", 3:"g", 4:"g", 5:"l", 6:"l", 7:"l", 8:"l", 9:"l", 10:"g", 11:"g", 12:"l", 13:"g", 14:"g", 15:"l", 16:"g", 17:"g" },
    "shArdUla-vikrIditam": { 1:"g", 2:"g", 3:"g", 4:"l", 5:"l", 6:"g", 7:"l", 8:"g", 9:"l", 10:"l", 11:"l", 12:"g", 13:"g", 14:"g", 15:"l", 16:"g", 17:"g", 18:"l", 19:"g" },
    "sragdhaaraa":         { 1:"g", 2:"g", 3:"g", 4:"g", 5:"l", 6:"g", 7:"g", 8:"l", 9:"l", 10:"l", 11:"l", 12:"l", 13:"l", 14:"g", 15:"g", 16:"l", 17:"g", 18:"g", 19:"l", 20:"g", 21:"g" },
    "Vamshastha":          { 1:"l", 2:"g", 3:"l", 4:"g", 5:"g", 6:"l", 7:"l", 8:"g", 9:"l", 10:"g", 11:"l", 12:"g" },
    "vasantatilaka":       { 1:"g", 2:"g", 3:"l", 4:"g", 5:"l", 6:"l", 7:"l", 8:"g", 9:"l", 10:"l", 11:"g", 12:"l", 13:"g", 14:"g" },
    "rathoddhatA":         { 1:"g", 2:"l", 3:"g", 4:"l", 5:"l", 6:"l", 7:"g", 8:"l", 9:"g", 10:"l", 11:"g" },
    "indravajra":          { 1:"g", 2:"g", 3:"l", 4:"g", 5:"g", 6:"l", 7:"l", 8:"g", 9:"l", 10:"g", 11:"g" },
};

function create_table(sylls) {
    // FIX: read metr_val once, not inside every loop iteration
    const metr_val = document.getElementById('metres').value;
    const pattern  = METRE_PATTERNS[metr_val];

    // FIX: guard against unknown metre
    if (!pattern) {
        console.warn(`Unknown metre: "${metr_val}"`);
        return;
    }

    // Build class string for each syllable position
    // FIX: position beyond metre definition → empty string, not undefined → no `class=undefined`
    function cls(i) {
        const lorg = pattern[i + 1];           // pattern is 1-based
        return lorg ? laghu_or_dirgha(sylls, i + 1, lorg) : "";
    }

    let content = "<table class='table res_table'><tr>";

    // Row 1: vowel type (l / g)
    for (let i = 0; i < sylls.length; i++) {
        // FIX: class attribute value is quoted
        content += `<td class="${cls(i)}">${vowel_type(sylls[i])}</td>`;
    }
    content += "</tr><tr>";

    // Row 2: syllable text
    for (let i = 0; i < sylls.length; i++) {
        content += `<td class="${cls(i)}">${sylls[i]}</td>`;
    }
    content += "</tr><tr>";

    // Row 3: position numbers
    for (let i = 0; i < sylls.length; i++) {
        content += `<td>${i + 1}</td>`;
    }
    content += "</tr></table>";

    // FIX: implicit global `targetElement` → const; innerHTML += → insertAdjacentHTML
    const targetElement = document.getElementById('here_table');
    targetElement.insertAdjacentHTML("beforeend", content);
}

// FIX: typo create_textare → create_textarea
function create_textarea(it, txt) {
    const sylls = syllabalize(txt);
    create_table(sylls);
    // FIX: implicit global `resultsElement` → const; innerHTML += → insertAdjacentHTML
    const resultsElement = document.getElementById('results');
    resultsElement.insertAdjacentHTML(
        "beforeend",
        `<input id="result${it}" class="form-control result" value="${kh2dev(txt)}" type="text" readonly>`
    );
}

function loop_objs() {
    const arrs = [];
    const lis  = document.getElementsByClassName('list-group-item');

    for (let i = 0; i < lis.length; i++) {
        // FIX: implicit global `cli` → const
        const cli       = lis[i];
        let   word_item = cli.querySelector(".word").value.replace(/\s\s+/g, ' ');
        if (word_item.replace(non_rom_reg, '#').indexOf('#') > -1) {
            word_item = dev2kh(word_item);
        }
        arrs.push({ st: word_item, prop: cli.querySelector(".prop").value });
    }

    const result = join_all_sandhi(arrs);

    document.querySelectorAll('.result').forEach(e => e.remove());
    document.querySelectorAll('.res_table').forEach(e => e.remove());

    for (let i = 0; i < result.length; i++) {
        // FIX: updated to fixed function name
        create_textarea(i, result[i]);
    }
}

function move(button, direction) {
    const listItem = button.parentNode.parentNode;
    if (direction === 'down') {
        // FIX: implicit global `nextItem` → const
        const nextItem = listItem.nextElementSibling;
        if (nextItem) listItem.parentNode.insertBefore(nextItem, listItem);
    } else if (direction === 'up') {
        // FIX: implicit global `previousItem` → const
        const previousItem = listItem.previousElementSibling;
        if (previousItem) listItem.parentNode.insertBefore(listItem, previousItem);
    }
}

function addWord() {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';

    const innerDiv = document.createElement('div');
    innerDiv.className = 'input-group word-div';

    const moveUpButton    = document.createElement('button');
    moveUpButton.className = 'btn move-up';
    moveUpButton.textContent = '↑';
    moveUpButton.onclick = function () { move(this, 'up'); };
    innerDiv.appendChild(moveUpButton);

    const wordInput       = document.createElement('input');
    wordInput.type        = 'text';
    wordInput.className   = 'word form-control';
    wordInput.placeholder = 'enter a word';
    innerDiv.appendChild(wordInput);

    const nestedDiv    = document.createElement('div');
    nestedDiv.className = 'input-group-append';
    nestedDiv.id        = 'button-addon4';

    const propInput       = document.createElement('input');
    propInput.type        = 'text';
    propInput.className   = 'prop form-control';
    propInput.placeholder = 'enter a property if applicable';
    nestedDiv.appendChild(propInput);

    const deleteButton      = document.createElement('button');
    deleteButton.className  = 'btn btn-outline-secondary del-item';
    deleteButton.type       = 'button';
    deleteButton.textContent = 'delete';
    deleteButton.onclick    = function () { del_word(this); };
    nestedDiv.appendChild(deleteButton);

    innerDiv.appendChild(nestedDiv);

    const moveDownButton    = document.createElement('button');
    moveDownButton.className = 'btn move-down';
    moveDownButton.textContent = '↓';
    moveDownButton.onclick = function () { move(this, 'down'); };
    innerDiv.appendChild(moveDownButton);

    listItem.appendChild(innerDiv);

    document.getElementById('sortable1').appendChild(listItem);

    // FIX: re-bind click handlers to ALL items after adding a new one
    change_color();
}

function del_word(el) {
    el.closest('.list-group-item').remove();
}

function change_color() {
    // FIX 1: querySelectorAll — all items get a handler, not just the first
    // FIX 2: use `this` inside handler — refers to the clicked element, not a MouseEvent
    // FIX 3: reset all items first, then highlight only the clicked one
    document.querySelectorAll('.list-group-item').forEach(item => {
        item.onclick = function () {
            document.querySelectorAll('.list-group-item').forEach(el => {
                el.style.backgroundColor = "";
                el.classList.remove("selected");
            });
            this.style.backgroundColor = "blue";
            this.classList.add("selected");
        };
    });
}

function vowel_type(syll) {
    return short_vowels.includes(syll.slice(-1)) && !vowels.includes(syll.slice(-2, -1))
        ? "l"
        : "g";
}
