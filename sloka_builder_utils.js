"use strict";

const non_rom_reg = /[^\u0000-\u024F\u1E00-\u1EFF\u2C60-\u2C7F\uA720-\uA7FF]/g;

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
    const metr_val = document.getElementById('metres').value;
    const pattern  = METRE_PATTERNS[metr_val];

    if (!pattern) {
        console.warn(`Unknown metre: "${metr_val}"`);
        return;
    }

    function cls(i) {
        const lorg = pattern[i + 1];           
        return lorg ? laghu_or_dirgha(sylls, i + 1, lorg) : "";
    }

    let content = "<table class='table res_table'><tr>";

    for (let i = 0; i < sylls.length; i++) {
        content += `<td class="${cls(i)}">${vowel_type(sylls[i])}</td>`;
    }
    content += "</tr><tr>";

    // Restored your original output format
    for (let i = 0; i < sylls.length; i++) {
        content += `<td class="${cls(i)}">${sylls[i]}</td>`;
    }
    content += "</tr><tr>";

    for (let i = 0; i < sylls.length; i++) {
        content += `<td>${i + 1}</td>`;
    }
    content += "</tr></table>";

    const targetElement = document.getElementById('here_table');
    targetElement.insertAdjacentHTML("beforeend", content);
}

function create_textarea(it, txt) {
    const sylls = syllabalize(txt);
    create_table(sylls);
    const resultsElement = document.getElementById('results');
    // Restored your original kh2dev call
    resultsElement.insertAdjacentHTML(
        "beforeend",
        `<input id="result${it}" class="form-control result" value="${kh2dev(txt)}" type="text" readonly>`
    );
}

function loop_objs() {
    const arrs = [];
    const lis  = document.getElementsByClassName('list-group-item');

    for (let i = 0; i < lis.length; i++) {
        const cli       = lis[i];
        let   word_item = cli.querySelector(".word").value.replace(/\s\s+/g, ' ');
        
        // 1. Check if Devanagari -> Convert to HK using your original function
        if (word_item.replace(non_rom_reg, '#').indexOf('#') > -1) {
            word_item = dev2kh(word_item);
        }
        
        // 2. Convert HK to SLP1 for pure Sandhi processing
        word_item = hkToSlp1(word_item);

        arrs.push({ st: word_item, prop: cli.querySelector(".prop").value });
    }

    // 3. Sandhi processes SLP1
    const result = join_all_sandhi(arrs);

    document.querySelectorAll('.result').forEach(e => e.remove());
    document.querySelectorAll('.res_table').forEach(e => e.remove());

    for (let i = 0; i < result.length; i++) {
        // 4. Convert SLP1 back to Harvard-Kyoto 
        let hkResult = slp1ToHk(result[i]);
        
        // 5. Pass Harvard-Kyoto to UI
        create_textarea(i, hkResult);
    }
}

function move(button, direction) {
    const listItem = button.parentNode.parentNode;
    if (direction === 'down') {
        const nextItem = listItem.nextElementSibling;
        if (nextItem) listItem.parentNode.insertBefore(nextItem, listItem);
    } else if (direction === 'up') {
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
    change_color();
}

function del_word(el) {
    el.closest('.list-group-item').remove();
}

function change_color() {
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