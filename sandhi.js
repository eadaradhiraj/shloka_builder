"use strict";

// ─── Character class constants ────────────────────────────────────────────────
const NASALS            = ["n", "m", "J", "G", "N"];
const VOWELS            = ["a", "A", "i", "I", "u", "U", "e", "o", "R"];
const SONORANTS_AFTER_Z = ["a", "A", "i", "I", "u", "U", "e", "o", "R", "y", "r", "l", "v"];
const VOICED_INITIALS   = ["a", "A", "e", "o", "i", "I", "u", "U", "y", "r", "v", "b", "g", "d", "D", "R"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

// FIX: removed misleading `return result`; result is mutated in place
function pushjoin(result, prop, st) {
    result.push({ st, prop });
}

// Extracted: the repeated "z + sonorant → cch, else space" pattern
function handleZ(result, prop, lhst, rhst) {
    if (SONORANTS_AFTER_Z.includes(rhst[1])) {
        pushjoin(result, prop, lhst.slice(0, -1) + "cch" + rhst.slice(1));
        pushjoin(result, prop, lhst + " " + rhst);
    } else {
        pushjoin(result, prop, lhst + " " + rhst);
    }
}

// Extracted: consolidates th/dh/ph/bh/gh/kh/jh which only differ in nasalChar
function handleAspirate(result, prop, lhst, rhst, nasalChar) {
    if (rhst[0] === "z") {
        handleZ(result, prop, lhst, rhst);
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

        // ── Pronoun special cases (saH, eSaH, mU, mI) ──────────────────────
        if (
            (lhst.endsWith("saH") || lhst.endsWith("eSaH") ||
             lhst.endsWith("mU")  || lhst.endsWith("mI")) &&
            lhs.prop === "pronoun"
        ) {
            if (lhst.endsWith("mU") || lhst.endsWith("mI")) {
                pushjoin(result, prop, lhst + " " + rhst);
            } else if (["e","o","i","I","u","U","c","d","D","h","k","l","m","b","n","p","t","T", "y", "v","A","z"].includes(rhst[0])) {
                // FIX: deduped "h" from original list
                pushjoin(result, prop, lhst.slice(0, -1) + " " + rhst);
            } else if (rhst[0] === "a") {
                pushjoin(result, prop, lhst.slice(0, -2) + "o'" + rhst.slice(1));
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Vocalic R (ṛ) ───────────────────────────────────────────────────
        } else if (lhst.endsWith("R")) {
            if (["a","A","i","I","u","U","o"].includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + "r" + rhst);
            } else if (rhst[0] === "R") {
                pushjoin(result, prop, lhst + rhst);
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -r ────────────────────────────────────────────────────────
        } else if (lhst.endsWith("r")) {
            if (rhst[0] === "r") {
                const elongd = { a: "A", A: "A", i: "I", I: "I", u: "U", U: "U" };
                pushjoin(result, prop, lhst.slice(0, -2) + elongd[lhst.slice(-2, -1)] + rhst);
            } else if (["n","g","j","a","A","i","I","u","U","d","D","m","y","b","l","v","h"].includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + "r" + rhst);
            } else if (rhst[0] === "c") {
                pushjoin(result, prop, lhst.slice(0, -1) + "z" + rhst);
            } else if (rhst[0] === "T") {
                pushjoin(result, prop, lhst.slice(0, -1) + "S" + rhst);
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
            } else if (rhst[0] === "D") {
                pushjoin(result, prop, lhst.slice(0, -1) + "N" + rhst);
            } else if (rhst[0] === "T") {
                pushjoin(result, prop, lhst.slice(0, -1) + "MS" + rhst);
            } else if (rhst[0] === "j") {
                pushjoin(result, prop, lhst.slice(0, -1) + "J" + rhst);
            } else if (rhst[0] === "c") {
                pushjoin(result, prop, lhst.slice(0, -1) + "Mz" + rhst);
            } else if (rhst[0] === "z") {
                pushjoin(result, prop, lhst.slice(0, -1) + "Jch" + rhst.slice(1));
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -ai / -au ─────────────────────────────────────────────────
        } else if (lhst.endsWith("ai") || lhst.endsWith("au")) {
            if (VOWELS.includes(rhst[0])) {
                const aiudict = { ai: "y", au: "v" };
                const ending  = lhst.endsWith("ai") ? "ai" : "au";
                pushjoin(result, prop, lhst.slice(0, -2) + "A " + rhst);
                pushjoin(result, prop, lhst.slice(0, -2) + "A" + aiudict[ending] + rhst); // not used in practice
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -a / -A ───────────────────────────────────────────────────
        } else if (lhst.endsWith("a") || lhst.endsWith("A")) {
            const adict = { a: "A", A: "A", i: "e", I: "e", u: "o", U: "o", R: "ar", e: "ai", o: "u" };
            if (rhst.startsWith("ai") || rhst.startsWith("au")) {
                pushjoin(result, prop, lhst.slice(0, -1) + rhst);
            } else if (Object.hasOwn(adict, rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + adict[rhst[0]] + rhst.slice(1));
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -i / -I ───────────────────────────────────────────────────
        } else if (lhst.endsWith("i") || lhst.endsWith("I")) {
            const vowelarr = ["a", "A", "e", "o", "R", "u", "U"];
            if (vowelarr.includes(rhst[0]) && lhs.prop !== "dual") {
                pushjoin(result, prop, lhst.slice(0, -1) + "y" + rhst);
            } else if ((rhst[0] === "i" || rhst[0] === "I") && lhs.prop !== "dual") {
                pushjoin(result, prop, lhst.slice(0, -1) + "I" + rhst.slice(1));
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -u / -U ───────────────────────────────────────────────────
        } else if (lhst.endsWith("u") || lhst.endsWith("U")) {
            // FIX: declared `jst` inline; was an implicit global in original
            const vowelarr = ["a", "A", "e", "o", "R", "i", "I"];
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
            } else if (rhst.startsWith("au") || rhst.startsWith("ai")) {
                const auieodict = { o: "v", e: "y" };
                pushjoin(result, prop, lhst.slice(0, -1) + "a " + rhst);
                pushjoin(result, prop, lhst.slice(0, -1) + "a" + auieodict[lhst.slice(-1)] + rhst); // not used in practice
            } else if (["i","I","u","U","e","o","R"].includes(rhst[0])) {
                // FIX: removed dead `rhst[0] === "u"` branch that followed this (u already covered here)
                const aiudict = { e: "y", o: "v" };
                pushjoin(result, prop, lhst.slice(0, -1) + "a " + rhst);
                pushjoin(result, prop, lhst.slice(0, -1) + "a" + aiudict[lhst.slice(-1)] + rhst); // not used in practice
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
            } else if (["e","o","i","u","U","A"].includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + " " + rhst);
            } else if (rhst[0] === "c") {
                pushjoin(result, prop, lhst.slice(0, -1) + "z" + rhst);
            } else if (["y","l","r","h","v","m","n","b","g","j","d"].includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -2) + "o " + rhst);
            } else if (rhst[0] === "t" || rhst[0] === "T") {
                // FIX: was an implicit global in original
                const tTvisdict = { t: "s", T: "S" };
                pushjoin(result, prop, lhst.slice(0, -1) + tTvisdict[rhst[0]] + rhst);
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -AH ───────────────────────────────────────────────────────
        } else if (lhst.endsWith("AH")) {
            if (["a","e","o","i","u","U","A"].includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + " " + rhst);
            } else if (["y","l","r","h","v","m","n","b","g","j","d"].includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + " " + rhst);
            } else if (rhst[0] === "c") {
                pushjoin(result, prop, lhst.slice(0, -1) + "z" + rhst);
            } else if (rhst[0] === "t" || rhst[0] === "T") {
                // FIX: was an implicit global in original
                const tTvisdict = { t: "s", T: "S" };
                pushjoin(result, prop, lhst.slice(0, -1) + tTvisdict[rhst[0]] + rhst);
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -H (generic visarga) ──────────────────────────────────────
        } else if (lhst.endsWith("H")) {
            if (rhst[0] === "t" || rhst[0] === "T") {
                const tTvisdict = { t: "s", T: "S" };
                pushjoin(result, prop, lhst.slice(0, -1) + tTvisdict[rhst[0]] + rhst);
            } else if (["a","A","i","I","u","U","o","y","l","h","v","m","n","e","b","g","j","d"].includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + "r" + rhst);
            } else if (["i","u","e"].includes(lhst.slice(-2, -1)) && rhst[0] === "r") {
                const iudict = { i: "I ", u: "U ", e: "e " };
                pushjoin(result, prop, lhst.slice(0, -2) + iudict[lhst.slice(-2, -1)] + rhst);
            } else if (rhst[0] === "c") {
                pushjoin(result, prop, lhst.slice(0, -1) + "z" + rhst);
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -T (retroflex) ─────────────────────────────────────────────
        } else if (lhst.endsWith("T")) {
            if (VOICED_INITIALS.includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + "D" + rhst);
            } else if (rhst[0] === "z") {
                handleZ(result, prop, lhst, rhst);
            } else if (rhst[0] === "h") {
                pushjoin(result, prop, lhst.slice(0, -1) + "DD" + rhst);
                pushjoin(result, prop, lhst.slice(0, -1) + "D " + rhst);
            } else if (rhst.startsWith("nAm") || rhst.startsWith("nagar") || rhst.endsWith("navat")) {
                pushjoin(result, prop, lhst.slice(0, -1) + "NN" + rhst.slice(1));
            } else if (NASALS.includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + "N" + rhst);
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -D (retroflex) ─────────────────────────────────────────────
        } else if (lhst.endsWith("D")) {
            if (rhst[0] === "z") {
                handleZ(result, prop, lhst, rhst);
            } else if (rhst.startsWith("nAm") || rhst.startsWith("nagar") || rhst.endsWith("navat")) {
                pushjoin(result, prop, lhst.slice(0, -1) + "NN" + rhst.slice(1));
            } else if (NASALS.includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + "N" + rhst);
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -th / -dh / -ph / -bh / -gh / -kh / -jh (aspirates) ──────
        // FIX: duplicate "th" branch removed; all share handleAspirate()
        } else if (lhst.endsWith("th")) { handleAspirate(result, prop, lhst, rhst, "N");
        } else if (lhst.endsWith("dh")) { handleAspirate(result, prop, lhst, rhst, "N");
        } else if (lhst.endsWith("ph")) { handleAspirate(result, prop, lhst, rhst, "M");
        } else if (lhst.endsWith("bh")) { handleAspirate(result, prop, lhst, rhst, "M");
        } else if (lhst.endsWith("gh")) { handleAspirate(result, prop, lhst, rhst, "G");
        } else if (lhst.endsWith("kh")) { handleAspirate(result, prop, lhst, rhst, "G");
        } else if (lhst.endsWith("jh")) { handleAspirate(result, prop, lhst, rhst, "J");

        // ── Final -p ────────────────────────────────────────────────────────
        } else if (lhst.endsWith("p")) {
            if (rhst[0] === "z") {
                handleZ(result, prop, lhst, rhst);
            } else if (NASALS.includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + "M" + rhst);
            } else if (rhst[0] === "h") {
                pushjoin(result, prop, lhst.slice(0, -1) + "bb" + rhst);
                pushjoin(result, prop, lhst.slice(0, -1) + "b " + rhst);
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -b ────────────────────────────────────────────────────────
        } else if (lhst.endsWith("b")) {
            if (rhst[0] === "z") {
                handleZ(result, prop, lhst, rhst);
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -d ────────────────────────────────────────────────────────
        } else if (lhst.endsWith("d")) {
            if (rhst[0] === "z") {
                handleZ(result, prop, lhst, rhst);
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
            } else if (rhst[0] === "z") {
                handleZ(result, prop, lhst, rhst);
            } else if (rhst[0] === "l") {
                pushjoin(result, prop, lhst.slice(0, -1) + "l" + rhst);
            } else if (NASALS.includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + "n" + rhst);
            } else if (rhst[0] === "c") {
                pushjoin(result, prop, lhst.slice(0, -1) + "c" + rhst);
            } else if (rhst[0] === "j") {
                pushjoin(result, prop, lhst.slice(0, -1) + "j" + rhst);
            } else if (rhst[0] === "T") {
                pushjoin(result, prop, lhst.slice(0, -1) + "T" + rhst);
            } else if (rhst[0] === "D") {
                pushjoin(result, prop, lhst.slice(0, -1) + "D" + rhst);
            } else if (rhst[0] === "h") {
                pushjoin(result, prop, lhst.slice(0, -1) + "dd" + rhst);
                pushjoin(result, prop, lhst.slice(0, -1) + "d " + rhst);
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -j ────────────────────────────────────────────────────────
        } else if (lhst.endsWith("j")) {
            if (rhst[0] === "z") {
                handleZ(result, prop, lhst, rhst);
            } else if (NASALS.includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + "J" + rhst);
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -g ────────────────────────────────────────────────────────
        } else if (lhst.endsWith("g")) {
            if (rhst[0] === "z") {
                handleZ(result, prop, lhst, rhst);
            } else if (NASALS.includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + "G" + rhst);
            } else {
                pushjoin(result, prop, lhst + " " + rhst);
            }

        // ── Final -k ────────────────────────────────────────────────────────
        } else if (lhst.endsWith("k")) {
            if (VOICED_INITIALS.includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + "g" + rhst);
            } else if (rhst[0] === "z") {
                handleZ(result, prop, lhst, rhst);
            } else if (NASALS.includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + "G" + rhst);
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
                pushjoin(result, prop, lhst.slice(0, -1) + "J" + rhst);
            } else if (rhst[0] === "z") {
                handleZ(result, prop, lhst, rhst);
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
            // FIX: removed duplicate t/T conditions; each appears exactly once
            if (VOWELS.includes(rhst[0])) {
                pushjoin(result, prop, lhst.slice(0, -1) + "nn" + rhst);
            } else if (rhst[0] === "t") {
                pushjoin(result, prop, lhst.slice(0, -1) + "Ms" + rhst);
            } else if (rhst[0] === "T") {
                pushjoin(result, prop, lhst.slice(0, -1) + "MS" + rhst);
            } else if (rhst[0] === "D") {
                pushjoin(result, prop, lhst.slice(0, -1) + "N" + rhst);
            } else if (rhst[0] === "j") {
                pushjoin(result, prop, lhst.slice(0, -1) + "J" + rhst);
            } else if (rhst[0] === "c") {
                pushjoin(result, prop, lhst.slice(0, -1) + "Mz" + rhst);
            } else if (rhst[0] === "z") {
                pushjoin(result, prop, lhst.slice(0, -1) + "Jch" + rhst.slice(1));
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
    // FIX: guard against short arrays (crashed with < 2 elements before)
    if (arrs.length === 0) return [];
    if (arrs.length === 1) return [arrs[0].st];

    // FIX: `resn` was an implicit global; replaced with reduce + flatMap
    return arrs.slice(1)
        .reduce(
            (prev, rhs) => prev.flatMap(lhs => sandhi_join([{ lhs, rhs }])),
            [arrs[0]]
        )
        .map(r => r.st);
}
