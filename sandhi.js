function pushjoin(result, prop, st) {
    //Putting repetitive code into a function
    let join = { "st": "", "prop": null }
    join["st"] = st
    join["prop"] = prop
    result.push(join)
    return result
}

function sandhi_join(arrs) {
    let nasal_sounds = ["n", "m", "J", "G", "N"]
    let result = []
    for (let i = 0; i < arrs.length; i++) {
        let lhs = arrs[i].lhs
        let rhs = arrs[i].rhs || {'st': ''}
        let lhst = lhs["st"]
        let rhst = rhs["st"]
        if ( ( ( lhst.endsWith('saH') || (lhst.endsWith('eSaH')) || (lhst.endsWith('mU')) || (lhst.endsWith('mI')) ) && (lhs["prop"] == "pronoun") ) ) {
            if ( lhst.endsWith('mU') || lhst.endsWith('mI') ) {
                result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
            }
            else if (["e", "o", "i", "I", "u", "U", "c", "d", "D", "h", "k", "l", "m", "b", "n", "p", "h", "t", "T", "v", "A", "z"].includes(rhs["st"][0])) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + " " + rhst)
            } else if (["a"].includes(rhs["st"][0])) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -2) + "o'" + rhst.slice(1))
            } else {
                result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
            }
        } else if ( lhst.endsWith("r") ) {
            if (rhst.slice(0, 1) == "r") {
                const elongd = {"a": "A", "A": "A", "i": "I", "I": "I", "u": "U", "U": "U"}
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -2) + elongd[lhst.slice(-2,-1)] + rhst)
            } else if ( ["n", "g", "j", "a", "A", "i", "I", "u", "U", "d", "D", "m", "y", "b", "l", "v", "h"].includes( rhst.slice(0, 1) ) ) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "r" + rhst)
            } else if ( ["c"].includes( rhst.slice(0, 1) ) ) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "z" + rhst)
            } else if ( ["T"].includes( rhst.slice(0, 1) ) ) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "S" + rhst)
            } else if ( ["t"].includes( rhst.slice(0, 1) ) ) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "s" + rhst)
            } else {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "H " + rhst)
            }
        } else if (lhst.slice(-2) == "An") {
            if (["a", "A", "e", "o", "i", "I", "u", "U", "R"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst + rhst)
            } else if (["t"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "Ms" + rhst, )
            } else if (["D"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "N" + rhst)
            } else if (["T"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "MS" + rhst)
            } else if (["j"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "J" + rhst)
            } else if (["c"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "Mz" + rhst)
            } else if (["z"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "Jch" + rhst.slice(1))
            } else {
                result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
            }
        } else if (["ai", "au"].includes(lhst.slice(-2))) {

            if ((["a", "A", "i", "I", "u", "U", "e", "o", "R"].includes(rhst.slice(0, 1)))) {
                const aiudict = { "ai": "y", "au": "v" }
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -2) + "A " + rhst)
                // not used in practise
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -2) + "A" + aiudict[lhst.slice(-2)] + rhst)
            } else {
                result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
            }
        } else if (["A", "a"].includes(lhst.slice(-1))) {
            let jst;
            const adict = { "A": "A", "a": "A", "i": "e", "I": "e", "u": "o", "U": "o", "R": "ar", "e": "ai", "o": "u" }
            if (["ai", "au"].includes(rhst.slice(0, 2))) {
                jst = lhst.slice(0, -1) + rhs["st"]
            } else if (Object.keys(adict).includes(rhst.slice(0, 1))) {
                jst = lhst.slice(0, -1) + adict[rhs["st"][0]] + rhst.slice(1)
            } else {
                jst = lhs["st"] + " " + rhs["st"]
            }

            result = pushjoin(result, rhs["prop"], jst)

        } else if (["i", "I"].includes(lhst.slice(-1))) {
            let vowelarr = ["a", "A", "e", "o", "R", "u", "U"]
            let jst;
            if ((vowelarr.includes(rhst.slice(0, 1))) && (lhs["prop"] != "dual")) {
                jst = lhst.slice(0, -1) + "y" + rhs["st"]
            } else if (["i", "I"].includes(rhst.slice(0, 1)) && (lhs["prop"] != "dual")) {
                jst = lhst.slice(0, -1) + "I" + rhst.slice(1)
            } else {
                jst = lhst + " " + rhst
            }

            result = pushjoin(result, rhs["prop"], jst)

        } else if (["u", "U"].includes(lhst.slice(-1))) {
            const vowelarr = ["a", "A", "e", "o", "R", "i", "I"]

            if ((vowelarr.includes(rhst.slice(0, 1))) && (lhs["prop"] != "dual")) {
                jst = lhst.slice(0, -1) + "v" + rhs["st"]
            } else if (["u", "U"].includes(rhst.slice(0, 1)) && (lhs["prop"] != "dual")) {
                jst = lhst.slice(0, -1) + "U" + rhst.slice(1)
            } else {
                jst = lhst + " " + rhst
            }

            result = pushjoin(result, rhs["prop"], jst)
        } else if (["e", "o"].includes(lhst.slice(-1))) {
            if (lhst.slice(-1) == "o" && lhs["prop"] == "interjection") {
                result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
            }
            else if (["au", "ai"].includes(rhst.slice(0, 2))) {
                const auieodict = { "o": "v", "e": "y" }
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "a " + rhst)
                // not used in practise
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "a" + auieodict[lhst.slice(-1)] + rhst)
            } else if (["i", "I", "u", "U", "e", "o", "R"].includes(rhst.slice(0, 1))) {
                const aiudict = { "e": "y", "o": "v" }
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "a " + rhst)
                // not used in practise
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "a" + aiudict[lhst.slice(-1)] + rhst)

            } else if (rhst.slice(0, 1) == "a") {
                result = pushjoin(result, rhs["prop"], lhst + "'" + rhst.slice(1))
            } else if (rhst.slice(0, 1) == "A") {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "a " + rhst)
            } else if (rhst.slice(0, 1) == "u") {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "a " + rhst)
            } else {
                result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
            }
        } else if (lhst.slice(-2) == "aH") {
            if (rhst.slice(0, 1) == "a") {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -2) + "o'" + rhst.slice(1))
            } else if (["e", "o", "i", "u", "U", "A"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + " " + rhst)
            } else if (["c"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "z" + rhst)
            } else if (["y", "l", "r", "h", "v", "m", "n", "b", 'g', "j", "d"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -2) + "o " + rhst)
            } else if (["t", "T"].includes(rhst.slice(0, 1))) {
                tTvisdict = { "t": "s", "T": "S" }
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + tTvisdict[rhst.slice(0, 1)] + rhst)
            }
            else {
                result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
            }
        } else if (lhst.slice(-2) == "AH") {
            if (rhst.slice(0, 1) == "a") {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + " " + rhst)
            } else if (["e", "o", "i", "u", "U", "A"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + " " + rhst)
            } else if (["y", "l", "r", "h", "v", "m", "n", "b", 'g', "j", "d"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + " " + rhst)
            } else if (["c"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "z" + rhst)
            } else if (["t", "T"].includes(rhst.slice(0, 1))) {
                tTvisdict = { "t": "s", "T": "S" }
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + tTvisdict[rhst.slice(0, 1)] + rhst)
            } else {
                result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
            }
        } else if (lhst.slice(-1) == "H") {
            if (["t", "T"].includes(rhst.slice(0, 1))) {
                const tTvisdict = { "t": "s", "T": "S" }
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + tTvisdict[rhst.slice(0, 1)] + rhst)
            } else if (["a", "A", "i", "I", "u", "U", "o", "y", "l", "h", "v", "m", "n", "e", "b", 'g', "j", "d"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "r" + rhst)
            } else if (["i", "u", "e"].includes(lhst.slice(-2,-1)) && ["r"].includes(rhst.slice(0, 1))) {
                const iudict = {"i": "I ", "u":"U ", "e":"e "}
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -2) + iudict[lhst.slice(-2,-1)] + rhst)
            } else if (["c"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "z" + rhst)
            } else {
                result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
            }
        } else if (lhst.slice(-1) == "T") {
            if (["a", "A", "e", "o", "i", "I", "u", "U", "y", "r", "v", "b", 'g', "d", "R"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "D" + rhst)
            } else if (["z"].includes(rhst.slice(0, 1))) {
                if (["a", "A", "i", "I", "u", "U", "e", "o", "R", "y", "r", "l", "v"].includes(rhst.slice(1, 2))) {
                    result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "cch" + rhst.slice(1))
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                } else {
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                }
            } else if (["h"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "DD" + rhst)
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "D " + rhst)
            } else if ( rhst.startsWith("nAm") || rhst.startsWith("nagar") || rhst.endsWith("navat") ) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "NN" + rhst.slice(1))
            } else if (nasal_sounds.includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "N" + rhst)
            } else {
                result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
            }
        } else if (lhst.slice(-1) == "D") {
            if (["z"].includes(rhst.slice(0, 1))) {
                if (["a", "A", "i", "I", "u", "U", "e", "o", "R", "y", "r", "l", "v"].includes(rhst.slice(1, 2))) {
                    result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "cch" + rhst.slice(1))
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                } else {
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                }
            } else if ( rhst.startsWith("nAm") || rhst.startsWith("nagar") || rhst.endsWith("navat") ) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "NN" + rhst.slice(1))
            } else if (nasal_sounds.includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "N" + rhst)
            } else {
                result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
            }
        } else if (lhst.slice(-2) == "th") {
            if (["z"].includes(rhst.slice(0, 1))) {
                if (["a", "A", "i", "I", "u", "U", "e", "o", "R", "y", "r", "l", "v"].includes(rhst.slice(1, 2))) {
                    result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "cch" + rhst.slice(1))
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                } else {
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                }
            } else if (nasal_sounds.includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "N" + rhst)
            } else {
                result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
            }
        } else if (lhst.slice(-2) == "dh") {
            if (["z"].includes(rhst.slice(0, 1))) {
                if (["a", "A", "i", "I", "u", "U", "e", "o", "R", "y", "r", "l", "v"].includes(rhst.slice(1, 2))) {
                    result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "cch" + rhst.slice(1))
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                } else {
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                }
            } else if (nasal_sounds.includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "N" + rhst)

            } else {
                result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
            }
        } else if (lhst.slice(-2) == "th") {
            if (["z"].includes(rhst.slice(0, 1))) {
                if (["a", "A", "i", "I", "u", "U", "e", "o", "R", "y", "r", "l", "v"].includes(rhst.slice(1, 2))) {
                    result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "cch" + rhst.slice(1))
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                } else {
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                }
            } else if (nasal_sounds.includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "N" + rhst)
            } else {
                result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
            }
        } else if (lhst.slice(-2) == "ph") {
            if (["z"].includes(rhst.slice(0, 1))) {
                if (["a", "A", "i", "I", "u", "U", "e", "o", "R", "y", "r", "l", "v"].includes(rhst.slice(1, 2))) {
                    result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "cch" + rhst.slice(1))
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                } else {
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                }
            } else if (nasal_sounds.includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "M" + rhst)
            } else {
                result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
            }
        } else if (lhst.slice(-1) == "p") {
            if (["z"].includes(rhst.slice(0, 1))) {
                if (["a", "A", "i", "I", "u", "U", "e", "o", "R", "y", "r", "l", "v"].includes(rhst.slice(1, 2))) {
                    result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "cch" + rhst.slice(1))
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                } else {
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                }
            } else if (nasal_sounds.includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "M" + rhst)
            } else if (["h"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "bb" + rhst)
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "b " + rhst)
            } else {
                result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
            }
        } else if (lhst.slice(-2) == "bh") {
            if (["z"].includes(rhst.slice(0, 1))) {
                if (["a", "A", "i", "I", "u", "U", "e", "o", "R", "y", "r", "l", "v"].includes(rhst.slice(1, 2))) {
                    result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "cch" + rhst.slice(1))
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                } else {
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                }
            } else if (nasal_sounds.includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "M" + rhst)
            } else {
                result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
            }
        } else if (lhst.slice(-1) == "b") {
            if (["z"].includes(rhst.slice(0, 1))) {
                if (["a", "A", "i", "I", "u", "U", "e", "o", "R", "y", "r", "l", "v"].includes(rhst.slice(1, 2))) {
                    result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "cch" + rhst.slice(1))
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                } else {
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                }
            } else {
                result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
            }
        } else if (lhst.slice(-1) == "d") {
            if (["z"].includes(rhst.slice(0, 1))) {
                if (["a", "A", "i", "I", "u", "U", "e", "o", "R", "y", "r", "l", "v"].includes(rhst.slice(1, 2))) {
                    result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "cch" + rhst.slice(1))
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                } else {
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                }
            } else if (["h"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "dd" + rhst)
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "d " + rhst)
            } else {
                result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
            }
        } else if (lhst.slice(-1) == "t") {
            if (["a", "A", "e", "o", "i", "I", "u", "U", "y", "r", "v", "b", 'g', "d", "R"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "d" + rhst)
            } else if (["z"].includes(rhst.slice(0, 1))) {
                if (["a", "A", "i", "I", "u", "U", "e", "o", "R", "y", "r", "l", "v"].includes(rhst.slice(1, 2))) {
                    result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "cch" + rhst.slice(1))
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                } else {
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                }
            } else if (["l"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "l" + rhst)
            } else if (nasal_sounds.includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "n" + rhst)
            } else if (["c"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "c" + rhst)
            } else if (["j"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "j" + rhst)
            } else if (["T"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "T" + rhst)
            } else if (["D"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "D" + rhst)
            } else if (["h"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "dd" + rhst)
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "d " + rhst)
            } else {
                result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
            }
        } else if (lhst.slice(-2) == "gh") {
            if (nasal_sounds.includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"],lhst.slice(0, -1) + "G" + rhst)
            } else if (["z"].includes(rhst.slice(0, 1))) {
                if (["a", "A", "i", "I", "u", "U", "e", "o", "R", "y", "r", "l", "v"].includes(rhst.slice(1, 2))) {
                    result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "cch" + rhst.slice(1))
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                } else {
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                }
            } else {
                result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
            }
        } else if (lhst.slice(-2) == "kh") {
            if (nasal_sounds.includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "G" + rhst)

            } else if (["z"].includes(rhst.slice(0, 1))) {
                if (["a", "A", "i", "I", "u", "U", "e", "o", "R", "y", "r", "l", "v"].includes(rhst.slice(1, 2))) {
                    result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "cch" + rhst.slice(1))
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                } else {
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                }
            } else {
                result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
            }
        } else if (lhst.slice(-2) == "jh") {
            if (nasal_sounds.includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "J" + rhst)
            } else if (["z"].includes(rhst.slice(0, 1))) {
                if (["a", "A", "i", "I", "u", "U", "e", "o", "R", "y", "r", "l", "v"].includes(rhst.slice(1, 2))) {
                    result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "cch" + rhst.slice(1))
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                } else {
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                }
            } else {
                result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
            }
        } else if (lhst.slice(-1) == "j") {
            if (["z"].includes(rhst.slice(0, 1))) {
                if (["a", "A", "i", "I", "u", "U", "e", "o", "R", "y", "r", "l", "v"].includes(rhst.slice(1, 2))) {
                    result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "cch" + rhst.slice(1))
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                } else {
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                }
            } else if (nasal_sounds.includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "J" + rhst)
            } else {
                result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
            }
        } else if (lhst.slice(-1) == "g") {
            if (["z"].includes(rhst.slice(0, 1))) {
                if (["a", "A", "i", "I", "u", "U", "e", "o", "R", "y", "r", "l", "v"].includes(rhst.slice(1, 2))) {
                    result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "cch" + rhst.slice(1))
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                } else {
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                }
            } else if (nasal_sounds.includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "G" + rhst)
            } else {
                result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
            }
        } else if (lhst.slice(-1) == "k") {
            if (["a", "A", "e", "o", "i", "I", "u", "U", "y", "r", "v", "b", 'g', "d", "D", "R"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "g" + rhst)
            } else if (["z"].includes(rhst.slice(0, 1))) {
                if (["a", "A", "i", "I", "u", "U", "e", "o", "R", "y", "r", "l", "v"].includes(rhst.slice(1, 2))) {
                    result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "cch" + rhst.slice(1))
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                } else {
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                }
            } else if (nasal_sounds.includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "G" + rhst)
            } else if (["l"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "l" + rhst)
            } else if (["h"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "gg" + rhst)
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "g " + rhst)
            } else {
                result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
            }
        } else if (lhst.slice(-1) == "c") {
            if (["a", "A", "e", "o", "i", "I", "u", "U", "y", "r", "v", "b", 'g', "d", "D", "R"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "j" + rhst)
            } else if (nasal_sounds.includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "J" + rhst)
            } else if (["z"].includes(rhst.slice(0, 1))) {
                if (["a", "A", "i", "I", "u", "U", "e", "o", "R", "y", "r", "l", "v"].includes(rhst.slice(1, 2))) {
                    result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "cch" + rhst.slice(1))
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                } else {
                    result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
                }
            } else if (["h"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "jj" + rhst)
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "j " + rhst)
            } else {
                result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
            }
        } else if (lhst.slice(-1) == "m") {
            if (["a", "A", "e", "o", "i", "I", "u", "U", "R", ''].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst + rhst)
            } else if (rhst.slice(0, 1) == ".") {
                result = pushjoin(result, rhs["prop"], lhst + rhst)
            } else {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "M " + rhst)
            }
        } else if (lhst.slice(-1) == "n") {
            if (["a", "A", "e", "o", "i", "I", "u", "U", "R"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "nn" + rhst)
            } else if (["t"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "Ms" + rhst)
            } else if (["T"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "MS" + rhst)
            }  else if (["t"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "Ms" + rhst, )
            } else if (["D"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "N" + rhst)
            } else if (["T"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "MS" + rhst)
            } else if (["j"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "J" + rhst)
            } else if (["c"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "Mz" + rhst)
            } else if (["z"].includes(rhst.slice(0, 1))) {
                result = pushjoin(result, rhs["prop"], lhst.slice(0, -1) + "Jch" + rhst.slice(1))
            } else {
                result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
            }
        } else {
            result = pushjoin(result, rhs["prop"], lhst + " " + rhst)
        }
    }
    return result
}

function join_all_sandhi(arrs) {
    // Do the first one
    let res = sandhi_join(
        [{ "lhs": arrs[0], "rhs": arrs[1] }]
    )
    // Initialize resultant string
    let result_string = []

    // Loop through all the words
    for (let i = 2; i < arrs.length; i++) {
        // initialize new array to store multiple results
        resn = []
        // if results are multiple then iterate once again
        for (let j = 0; j < res.length; j++) {
            //append the new array
            Array.prototype.push.apply(resn, sandhi_join(
                [{ "lhs": res[j], "rhs": arrs[i] }]
            ))
        }
        // next set of results need to be iterated upon
        res = resn
    }
    // Send the string as an array
    for (let i = 0; i < res.length; i++) {
        result_string.push(res[i]["st"])
    }
    return result_string
}
