"use strict";

// ─── Character class constants (Now in SLP1) ──────────────────────────────────
// n, m, ñ, ṅ, ṇ
const NASALS            = ["n", "m", "Y", "N", "R"];
// a, A, i, I, u, U, e, ai, o, au, ṛ, ṝ
const VOWELS            = ["a", "A", "i", "I", "u", "U", "e", "E", "o", "O", "f", "F"];
const SONORANTS_AFTER_S = ["a", "A", "i", "I", "u", "U", "e", "E", "o", "O", "f", "F", "y", "r", "l", "v"];
const VOICED_INITIALS   = ["a", "A", "e", "E", "o", "O", "i", "I", "u", "U", "y", "r", "v", "b", "g", "d", "q", "f", "F"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function pushjoin(result, prop, st) {
    result.push({ st, prop });
}

// HK 'z' (ś) is now SLP1 'S'. 
// HK 'cch' is now SLP1 'cC'.
function handleS(result, prop, lhst, rhst) {
    if (SONORANTS_AFTER_S.includes(rhst[1])) {
        pushjoin(result, prop, lhst.slice(0, -1) + "cC" + rhst.slice(1));
        pushjoin(result, prop, lhst + " " + rhst);
    } else {
        pushjoin(result, prop, lhst + " " + rhst);
    }
}

function handleAspirate(result, prop, lhst, rhst, nasalChar) {
    if (rhst[0] === "S") {
        handleS(result, prop, lhst, rhst);
    } else if (NASALS.includes(rhst[0])) {
        pushjoin(result, prop, lhst.slice(0, -1) + nasalChar + rhst);
    } else {
        pushjoin(result, prop, lhst + " " + rhst);
    }
}

// ─── Core sandhi engine ───────────────────────────────────────────────────────
function sandhi_join(arrs) {
    const result = [];

    for (const { lhs, rhs = { st: "" } } of arrs) {
        const lhst = lhs.st;
        const rhst = rhs.st;
        const prop  = rhs.prop;

        // ── Pronoun special cases (saH, ezaH, mU, mI) ──────────────────────
        if (
            (lhst.endsWith("saH") || lhst.endsWith("ezaH") ||
             lhst.endsWith("mU")  || lhst.endsWith("mI")) &&
            lhs.prop === "pronoun"
        ) {
            if (lhst.endsWith("mU") || lhst.endsWith("mI")) {
                pushjoin(result, prop, lhst + " " + rhst);
            } else if (["e","E","o","O","i","I","u","U","c","d","q","h","g","l","m","b","n","p","t","w","y","r","v","A","S"].includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + " " + rhst);
            } else if (rhst[0] === "a") {
                pushjoin(result, prop, lhst.slice(0, -2) + "o'" + rhst.slice(1));
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Vocalic ṛ (SLP1: f) ─────────────────────────────────────────────
        } else if (lhst.endsWith("f")) {
            if (["a","A","i","I","u","U","e","E","o","O"].includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + "r" + rhst);
            } else if (rhst[0] === "f") {
                pushjoin(result, prop, lhst + rhst);
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -r ────────────────────────────────────────────────────────
        } else if (lhst.endsWith("r")) {
            if (rhst[0] === "r") {
                const elongd = { a: "A", A: "A", i: "I", I: "I", u: "U", U: "U" };
                pushjoin(result, prop, lhst.slice(0, -2) + elongd[lhst.slice(-2, -1)] + rhst);
            } else if (["n","g","j","a","A","i","I","u","U","d","q","m","y","b","l","v","h","e","E","o","O"].includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + "r" + rhst);
            } else if (rhst[0] === "c") {
                pushjoin(result, prop, lhst.slice(0, -1) + "S" + rhst);
            } else if (rhst[0] === "w") {
                pushjoin(result, prop, lhst.slice(0, -1) + "z" + rhst);
            } else if (rhst[0] === "t") {
                pushjoin(result, prop, lhst.slice(0, -1) + "s" + rhst);
            } else {
                pushjoin(result, prop, lhst.slice(0, -1) + "H " + rhst);
            }

        // ── Final -An ───────────────────────────────────────────────────────
        } else if (lhst.endsWith("An")) {
            if (VOWELS.includes(rhst[0])) {
                pushjoin(result, prop, lhst + rhst);
            } else if (rhst[0] === "t") {
                pushjoin(result, prop, lhst.slice(0, -1) + "Ms" + rhst);
            } else if (rhst[0] === "q") { // ḍ
                pushjoin(result, prop, lhst.slice(0, -1) + "R" + rhst);
            } else if (rhst[0] === "w") { // ṭ
                pushjoin(result, prop, lhst.slice(0, -1) + "Mz" + rhst);
            } else if (rhst[0] === "j") {
                pushjoin(result, prop, lhst.slice(0, -1) + "Y" + rhst);
            } else if (rhst[0] === "c") {
                pushjoin(result, prop, lhst.slice(0, -1) + "MS" + rhst);
            } else if (rhst[0] === "S") { // ś
                pushjoin(result, prop, lhst.slice(0, -1) + "YC" + rhst.slice(1));
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -ai / -au (SLP1: E / O) ───────────────────────────────────
        } else if (lhst.endsWith("E") || lhst.endsWith("O")) {
            if (VOWELS.includes(rhst[0])) {
                const aiudict = { E: "y", O: "v" };
                const ending  = lhst.endsWith("E") ? "E" : "O";
                // Now slicing only 1 char because E and O are single chars!
                pushjoin(result, prop, lhst.slice(0, -1) + "A " + rhst);
                pushjoin(result, prop, lhst.slice(0, -1) + "A" + aiudict[ending] + rhst); 
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -a / -A ───────────────────────────────────────────────────
        } else if (lhst.endsWith("a") || lhst.endsWith("A")) {
            const adict = { a: "A", A: "A", i: "e", I: "e", u: "o", U: "o", f: "ar", e: "E", E: "E", o: "O", O: "O" };
            if (rhst.startsWith("E") || rhst.startsWith("O")) {
                pushjoin(result, prop, lhst.slice(0, -1) + rhst);
            } else if (Object.hasOwn(adict, rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + adict[rhst[0]] + rhst.slice(1));
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -i / -I ───────────────────────────────────────────────────
        } else if (lhst.endsWith("i") || lhst.endsWith("I")) {
            const vowelarr = ["a", "A", "e", "E", "o", "O", "f", "u", "U"];
            if (vowelarr.includes(rhst[0]) && lhs.prop !== "dual") {
                pushjoin(result, prop, lhst.slice(0, -1) + "y" + rhst);
            } else if ((rhst[0] === "i" || rhst[0] === "I") && lhs.prop !== "dual") {
                pushjoin(result, prop, lhst.slice(0, -1) + "I" + rhst.slice(1));
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -u / -U ───────────────────────────────────────────────────
        } else if (lhst.endsWith("u") || lhst.endsWith("U")) {
            const vowelarr = ["a", "A", "e", "E", "o", "O", "f", "i", "I"];
            if (vowelarr.includes(rhst[0]) && lhs.prop !== "dual") {
                pushjoin(result, prop, lhst.slice(0, -1) + "v" + rhst);
            } else if ((rhst[0] === "u" || rhst[0] === "U") && lhs.prop !== "dual") {
                pushjoin(result, prop, lhst.slice(0, -1) + "U" + rhst.slice(1));
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -e / -o ───────────────────────────────────────────────────
        } else if (lhst.endsWith("e") || lhst.endsWith("o")) {
            if (lhst.endsWith("o") && lhs.prop === "interjection") {
                pushjoin(result, prop, lhst + " " + rhst);
            } else if (rhst.startsWith("O") || rhst.startsWith("E")) {
                const auieodict = { o: "v", e: "y" };
                pushjoin(result, prop, lhst.slice(0, -1) + "a " + rhst);
                pushjoin(result, prop, lhst.slice(0, -1) + "a" + auieodict[lhst.slice(-1)] + rhst);
            } else if (["i","I","u","U","e","o","f","E","O"].includes(rhst[0])) {
                const aiudict = { e: "y", o: "v" };
                pushjoin(result, prop, lhst.slice(0, -1) + "a " + rhst);
                pushjoin(result, prop, lhst.slice(0, -1) + "a" + aiudict[lhst.slice(-1)] + rhst); 
            } else if (rhst[0] === "a") {
                pushjoin(result, prop, lhst + "'" + rhst.slice(1));
            } else if (rhst[0] === "A") {
                pushjoin(result, prop, lhst.slice(0, -1) + "a " + rhst);
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -aH ───────────────────────────────────────────────────────
        } else if (lhst.endsWith("aH")) {
            if (rhst[0] === "a") {
                pushjoin(result, prop, lhst.slice(0, -2) + "o'" + rhst.slice(1));
            } else if (["e","E","o","O","i","I","u","U","A","f","F"].includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + " " + rhst);
            } else if (rhst[0] === "c") {
                pushjoin(result, prop, lhst.slice(0, -1) + "S" + rhst);
            } else if (["y","l","r","h","v","m","n","b","g","j","d","q"].includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -2) + "o " + rhst);
            } else if (rhst[0] === "t" || rhst[0] === "w") {
                const tTvisdict = { t: "s", w: "z" };
                pushjoin(result, prop, lhst.slice(0, -1) + tTvisdict[rhst[0]] + rhst);
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -AH ───────────────────────────────────────────────────────
        } else if (lhst.endsWith("AH")) {
            if (["a","e","E","o","O","i","I","u","U","A","f","F"].includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + " " + rhst);
            } else if (["y","l","r","h","v","m","n","b","g","j","d","q"].includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + " " + rhst);
            } else if (rhst[0] === "c") {
                pushjoin(result, prop, lhst.slice(0, -1) + "S" + rhst);
            } else if (rhst[0] === "t" || rhst[0] === "w") {
                const tTvisdict = { t: "s", w: "z" };
                pushjoin(result, prop, lhst.slice(0, -1) + tTvisdict[rhst[0]] + rhst);
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -H (generic visarga) ──────────────────────────────────────
        } else if (lhst.endsWith("H")) {
            if (rhst[0] === "t" || rhst[0] === "w") {
                const tTvisdict = { t: "s", w: "z" };
                pushjoin(result, prop, lhst.slice(0, -1) + tTvisdict[rhst[0]] + rhst);
            } else if (["a","A","i","I","u","U","e","E","o","O","f","y","l","h","v","m","n","b","g","j","d","q"].includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + "r" + rhst);
            } else if (["i","u","e"].includes(lhst.slice(-2, -1)) && rhst[0] === "r") {
                const iudict = { i: "I ", u: "U ", e: "e " };
                pushjoin(result, prop, lhst.slice(0, -2) + iudict[lhst.slice(-2, -1)] + rhst);
            } else if (rhst[0] === "c") {
                pushjoin(result, prop, lhst.slice(0, -1) + "S" + rhst);
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -w (ṭ) ─────────────────────────────────────────────
        } else if (lhst.endsWith("w")) {
            if (VOICED_INITIALS.includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + "q" + rhst);
            } else if (rhst[0] === "S") {
                handleS(result, prop, lhst, rhst);
            } else if (rhst[0] === "h") {
                pushjoin(result, prop, lhst.slice(0, -1) + "qq" + rhst);
                pushjoin(result, prop, lhst.slice(0, -1) + "q " + rhst);
            } else if (rhst.startsWith("nAm") || rhst.startsWith("nagar") || rhst.endsWith("navat")) {
                pushjoin(result, prop, lhst.slice(0, -1) + "RR" + rhst.slice(1));
            } else if (NASALS.includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + "R" + rhst);
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -q (ḍ) ─────────────────────────────────────────────
        } else if (lhst.endsWith("q")) {
            if (rhst[0] === "S") {
                handleS(result, prop, lhst, rhst);
            } else if (rhst.startsWith("nAm") || rhst.startsWith("nagar") || rhst.endsWith("navat")) {
                pushjoin(result, prop, lhst.slice(0, -1) + "RR" + rhst.slice(1));
            } else if (NASALS.includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + "R" + rhst);
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final Aspirates (th/T, dh/D, ph/P, bh/B, gh/G, kh/K, jh/J) ──────
        // In SLP1, these are all 1 character, making slicing infinitely cleaner!
        } else if (lhst.endsWith("T")) { handleAspirate(result, prop, lhst, rhst, "n");
        } else if (lhst.endsWith("D")) { handleAspirate(result, prop, lhst, rhst, "n");
        } else if (lhst.endsWith("P")) { handleAspirate(result, prop, lhst, rhst, "m");
        } else if (lhst.endsWith("B")) { handleAspirate(result, prop, lhst, rhst, "m");
        } else if (lhst.endsWith("G")) { handleAspirate(result, prop, lhst, rhst, "N");
        } else if (lhst.endsWith("K")) { handleAspirate(result, prop, lhst, rhst, "N");
        } else if (lhst.endsWith("J")) { handleAspirate(result, prop, lhst, rhst, "Y");

        // ── Final -p ────────────────────────────────────────────────────────
        } else if (lhst.endsWith("p")) {
            if (rhst[0] === "S") {
                handleS(result, prop, lhst, rhst);
            } else if (NASALS.includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + "m" + rhst); 
            } else if (rhst[0] === "h") {
                pushjoin(result, prop, lhst.slice(0, -1) + "bb" + rhst);
                pushjoin(result, prop, lhst.slice(0, -1) + "b " + rhst);
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -b ────────────────────────────────────────────────────────
        } else if (lhst.endsWith("b")) {
            if (rhst[0] === "S") {
                handleS(result, prop, lhst, rhst);
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -d ────────────────────────────────────────────────────────
        } else if (lhst.endsWith("d")) {
            if (rhst[0] === "S") {
                handleS(result, prop, lhst, rhst);
            } else if (rhst[0] === "h") {
                pushjoin(result, prop, lhst.slice(0, -1) + "dd" + rhst);
                pushjoin(result, prop, lhst.slice(0, -1) + "d " + rhst);
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -t ────────────────────────────────────────────────────────
        } else if (lhst.endsWith("t")) {
            if (VOICED_INITIALS.includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + "d" + rhst);
            } else if (rhst[0] === "S") {
                handleS(result, prop, lhst, rhst);
            } else if (rhst[0] === "l") {
                pushjoin(result, prop, lhst.slice(0, -1) + "l" + rhst);
            } else if (NASALS.includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + "n" + rhst);
            } else if (rhst[0] === "c") {
                pushjoin(result, prop, lhst.slice(0, -1) + "c" + rhst);
            } else if (rhst[0] === "j") {
                pushjoin(result, prop, lhst.slice(0, -1) + "j" + rhst);
            } else if (rhst[0] === "w") { // ṭ
                pushjoin(result, prop, lhst.slice(0, -1) + "w" + rhst);
            } else if (rhst[0] === "q") { // ḍ
                pushjoin(result, prop, lhst.slice(0, -1) + "q" + rhst);
            } else if (rhst[0] === "h") {
                pushjoin(result, prop, lhst.slice(0, -1) + "dd" + rhst);
                pushjoin(result, prop, lhst.slice(0, -1) + "d " + rhst);
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -j ────────────────────────────────────────────────────────
        } else if (lhst.endsWith("j")) {
            if (rhst[0] === "S") {
                handleS(result, prop, lhst, rhst);
            } else if (NASALS.includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + "Y" + rhst); // ñ
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -g ────────────────────────────────────────────────────────
        } else if (lhst.endsWith("g")) {
            if (rhst[0] === "S") {
                handleS(result, prop, lhst, rhst);
            } else if (NASALS.includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + "N" + rhst); // ṅ
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -k ────────────────────────────────────────────────────────
        } else if (lhst.endsWith("k")) {
            if (VOICED_INITIALS.includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + "g" + rhst);
            } else if (rhst[0] === "S") {
                handleS(result, prop, lhst, rhst);
            } else if (NASALS.includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + "N" + rhst); // ṅ
            } else if (rhst[0] === "l") {
                pushjoin(result, prop, lhst.slice(0, -1) + "l" + rhst);
            } else if (rhst[0] === "h") {
                pushjoin(result, prop, lhst.slice(0, -1) + "gg" + rhst);
                pushjoin(result, prop, lhst.slice(0, -1) + "g " + rhst);
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -c ────────────────────────────────────────────────────────
        } else if (lhst.endsWith("c")) {
            if (VOICED_INITIALS.includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + "j" + rhst);
            } else if (NASALS.includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + "Y" + rhst); // ñ
            } else if (rhst[0] === "S") {
                handleS(result, prop, lhst, rhst);
            } else if (rhst[0] === "h") {
                pushjoin(result, prop, lhst.slice(0, -1) + "jj" + rhst);
                pushjoin(result, prop, lhst.slice(0, -1) + "j " + rhst);
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -m ────────────────────────────────────────────────────────
        } else if (lhst.endsWith("m")) {
            if (VOWELS.includes(rhst[0]) || rhst[0] === "" || rhst[0] === ".") {
                pushjoin(result, prop, lhst + rhst);
            } else {
                pushjoin(result, prop, lhst.slice(0, -1) + "M " + rhst);
            }

        // ── Final -n ────────────────────────────────────────────────────────
        } else if (lhst.endsWith("n")) {
            if (VOWELS.includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + "nn" + rhst);
            } else if (rhst[0] === "t") {
                pushjoin(result, prop, lhst.slice(0, -1) + "Ms" + rhst);
            } else if (rhst[0] === "w") { // ṭ
                pushjoin(result, prop, lhst.slice(0, -1) + "Mz" + rhst); // Mṣ
            } else if (rhst[0] === "q") { // ḍ
                pushjoin(result, prop, lhst.slice(0, -1) + "R" + rhst);  // ṇ
            } else if (rhst[0] === "j") {
                pushjoin(result, prop, lhst.slice(0, -1) + "Y" + rhst);  // ñ
            } else if (rhst[0] === "c") {
                pushjoin(result, prop, lhst.slice(0, -1) + "MS" + rhst); // Mś
            } else if (rhst[0] === "S") { // ś
                pushjoin(result, prop, lhst.slice(0, -1) + "YC" + rhst.slice(1)); // ñC
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Default ─────────────────────────────────────────────────────────
        } else {
            pushjoin(result, prop, lhst + " " + rhst);
        }
    }

    return result;
}

// ─── Sequential sandhi over a word array ─────────────────────────────────────
function join_all_sandhi(arrs) {
    if (arrs.length === 0) return [];
    if (arrs.length === 1) return [arrs[0].st];

    return arrs.slice(1)
        .reduce(
            (prev, rhs) => prev.flatMap(lhs => sandhi_join([{ lhs, rhs }])),
            [arrs[0]]
        )
        .map(r => r.st);
}
