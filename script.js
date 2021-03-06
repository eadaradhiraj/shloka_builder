function do_sandhi(objl, objr) {

    var retObj = {
        is_dual: objr.is_dual,
        prefix_a: objr.prefix_a,
        r_end: objr.r_end
        //word: objl.word + ' ' + objr.word
    }

    var a = objl.word;
    var b = objr.word;

    var res = objl.word;

    //ai final
    if (a.match(/ai$/)) {
        if (b.match(/^ā/) || b.match(/^a/) ||
            b.match(/^i/) || b.match(/^ī/) ||
            b.match(/^u/) || b.match(/^ū/) ||
            b.match(/^e/) || b.match(/^o/) ||
            b.match(/^ṛ/)) {
            res = a.slice(0, -1) + 'a ' + b
        } else if (b)
            res = a + ' ' + b
    }

    //sa+visarga final
    else if (a.match(/saḥ$/) || a.match(/eṣaḥ$/) &&
        (
            b.match(/^s/) || b.match(/^b/) || b.match(/^d/) || b.match(/^g/) || b.match(/^k/) || b.match(/^i/) || b.match(
                /^t/) || b.match(/^p/)
        )) {
        res = a.slice(0, -1) + ' ' + b
    }

    //a+visarga final
    else if (a.match(/aḥ$/)) {
        if (b.match(/^ai/) || b.match(/^au/) ||
            b.match(/^u/) ||
            b.match(/^ī/) || b.match(/^ū/) ||
            b.match(/^ṛ/) || b.match(/^ṝ/) ||
            b.match(/^e/) || b.match(/^o/)) {

            if (objl.r_end == true) {
                res = a.slice(0, -1) + 'r' + b
            } else if (b) {
                res = a.slice(0, -1) + ' ' + b
            }
        } else if (b.match(/^a/)) {


            if (objl.r_end == true) {
                res = a.slice(0, -1) + 'r' + b
            } else if (b) {
                res = a.slice(0, -2) + 'o\'' + b.slice(1)
            }

        } else if (b.match(/^y/) || b.match(/^r/) || b.match(/^l/) || b.match(/^v/) || b.match(/^h/) ||
            b.match(/^g/) || b.match(/^j/) || b.match(/^ḍ/) ||
            b.match(/^d/) || b.match(/^b/) || b.match(/^n/) || b.match(/^m/)) {

            if (objl.r_end == true) {
                res = a.slice(0, -1) + 'r' + b
            } else if (b) {
                res = a.slice(0, -2) + 'o ' + b
            }
        } else if (b.match(/^c/)) {
            res = a.slice(0, -1) + 'ś' + b
        } else if (b.match(/^ṭ/)) {
            res = a.slice(0, -1) + 'ṣ' + b
        } else if (b.match(/^t/)) {
            res = a.slice(0, -1) + 's' + b
        } else if (b) {
            res = a + ' ' + b
        }
    }

    //āḥ final      
    else if (a.match(/āḥ$/)) {
        if (b.match(/^ā/) || b.match(/^ai/) ||
            b.match(/^au/) ||
            b.match(/^ī/) || b.match(/^ū/) ||
            b.match(/^ṛ/) || b.match(/^ṝ/) ||
            b.match(/^e/) || b.match(/^o/)) {
            res = a.slice(0, -1) + ' ' + b
        } else if (b.match(/^y/) || b.match(/^r/) || b.match(/^l/) || b.match(/^v/) || b.match(/^h/) ||
            b.match(/^g/) || b.match(/^j/) || b.match(/^ḍ/) ||
            b.match(/^d/) || b.match(/^b/) || b.match(/^n/) || b.match(/^m/)) {
            res = a.slice(0, -1) + ' ' + b
        } else if (b.match(/^c/)) {
            res = a.slice(0, -1) + 'ś' + b
        } else if (b.match(/^ṭ/)) {
            res = a.slice(0, -1) + 'ṣ' + b
        } else if (b.match(/^t/)) {
            res = a.slice(0, -1) + 's' + b
        } else if (b) {
            res = a + ' ' + b
        }


    }

    //ḥ final
    else if (a.match(/ḥ$/)) {

        if (b.match(/^ś/) || b.match(/^s/) || b.match(/^ṣ/) || b.match(/^k/) || b.match(/^p/)) {
            res = a + ' ' + b
        } else if (b.match(/^r/)) {
            if (a.match(/iḥ$/))
                res = a.slice(0, -2) + 'ī ' + b
            else if (a.match(/uḥ$/))
                res = a.slice(0, -2) + 'ū ' + b
            else
                res = a.slice(0, -1) + ' ' + b
        } else if (b.match(/^c/)) {
            res = a.slice(0, -1) + 'ś' + b
        } else if (b.match(/^ṭ/)) {
            res = a.slice(0, -1) + 'ṣ' + b
        } else if (b.match(/^t/)) {
            res = a.slice(0, -1) + 's' + b
        } else if (!b.match(/^\s+$/)) {
            res = a.slice(0, -1) + 'r' + b
        } else if (b) {
            res = a + ' ' + b
        }

    }

    //au final
    else if (a.match(/au$/)) {
        if (b.match(/^a/) || b.match(/^ā/) ||
            b.match(/^i/) || b.match(/^ī/) ||
            b.match(/^u/) || b.match(/^ū/) ||
            b.match(/^ṛ/) || b.match(/^ṝ/) ||
            b.match(/^e/) || b.match(/^o/)) {
            res = a.slice(0, -1) + 'av' + b
        } else if (b) {
            res = a + ' ' + b
        }
    }

    //a or ā final
    else if (a.match(/a$/) || a.match(/ā$/)) {

        //starting with ai
        if (b.match(/^a/)) {

            if (b.match(/^ai/) || b.match(/^au/)) {
                res = a.slice(0, -1) + b
            } else if (b) {
                res = a.slice(0, -1) + 'ā' + b.slice(1)
            }
        }

        //starting with i or ī
        else if (b.match(/^i/) || b.match(/^ī/)) {
            res = a.slice(0, -1) + 'e' + b.slice(1)
        }

        //starting with u or ū
        else if (b.match(/^u/) || b.match(/^ū/)) {
            res = a.slice(0, -1) + 'o' + b.slice(1)
        }

        //starting with ṛ or ṝ
        else if (b.match(/^ṛ/) || b.match(/^ṝ/)) {
            res = a.slice(0, -1) + 'r' + b.slice(1)
        }


        //e initial
        else if (b.match(/^e/)) {
            res = a.slice(0, -1) + 'ai' + b.slice(1)
        }

        //o initial
        else if (b.match(/^o/)) {
            res = a.slice(0, -1) + 'au' + b.slice(1)
        } else if (b) {
            res = a + ' ' + b
        }

    }

    //i final
    else if ((a.match(/i$/) || a.match(/ī$/)) && objl.is_dual == false) {
        if (b.match(/^a/) || b.match(/^ā/) ||
            b.match(/^u/) || b.match(/^ū/) ||
            b.match(/^ṛ/) || b.match(/^ṝ/) ||
            b.match(/^e/) || b.match(/^o/)) {
            res = a.slice(0, -1) + 'y' + b
        } else if (b.match(/^i/) || b.match(/^ī/)) {
            res = a.slice(0, -1) + 'ī' + b.slice(1)
        } else if (b) {
            res = a + ' ' + b
        }
    }

    //u final
    else if ((a.match(/u$/) || a.match(/ū$/)) && objl.is_dual == false) {
        if (b.match(/^a/) || b.match(/^ā/) ||
            b.match(/^i/) || b.match(/^ī/) ||
            b.match(/^ṛ/) || b.match(/^ṝ/) ||
            b.match(/^e/) || b.match(/^o/)) {
            res = a.slice(0, -1) + 'v' + b
        } else if (b.match(/^u/) || b.match(/^ū/)) {
            res = a.slice(0, -1) + 'ū' + b.slice(1)
        } else if (b) {
            res = a + ' ' + b
        }
    }

    //ṛ final
    else if (a.match(/ṛ$/) || a.match(/ṝ$/)) {
        if (b.match(/^a/) || b.match(/^ā/) ||
            b.match(/^i/) || b.match(/^ī/) ||
            b.match(/^u/) || b.match(/^ū/) ||
            b.match(/^e/) || b.match(/^o/)) {
            res = a.slice(0, -1) + 'v' + b
        } else if (b.match(/^ṛ/) || b.match(/^ṝ/)) {
            res = a.slice(0, -1) + 'ṝ' + b.slice(1)
        } else if (b) {
            res = a + ' ' + b
        }
    }

    //e final
    else if (a.match(/e$/) && objl.is_dual == false) {
        if (b.match(/^ā/) ||
            b.match(/^i/) || b.match(/^ī/) ||
            b.match(/^u/) || b.match(/^ū/) ||
            b.match(/^ṛ/) || b.match(/^ṝ/) ||
            b.match(/^e/) || b.match(/^o/))
            res = a.slice(0, -1) + 'a ' + b

        else if (b.match(/^a/)) {
            if (b.match(/^ai/) || b.match(/^au/))
                res = a.slice(0, -1) + 'a ' + b
            else
                res = a.slice(0, -1) + 'e\'' + b.slice(1)
        } else if (b) {
            res = a + ' ' + b
        }
    }

    //o final
    else if (a.match(/o$/)) {
        if (b.match(/^ā/) ||
            b.match(/^i/) || b.match(/^ī/) ||
            b.match(/^u/) || b.match(/^ū/) ||
            b.match(/^ṛ/) || b.match(/^ṝ/) ||
            b.match(/^e/) || b.match(/^o/))
            res = a.slice(0, -1) + 'av' + b

        else if (b.match(/^a/)) {
            if (b.match(/^ai/) || b.match(/^au/))
                res = a.slice(0, -1) + 'av' + b
            else
                res = a.slice(0, -1) + 'o\'' + b
        } else if (b) {
            res = a + ' ' + b
        }
    }

    //k final
    else if (a.match(/k$/)) {
        if (b.match(/^ṣ/) ||
            b.match(/^s/) ||
            b.match(/^k/) ||
            b.match(/^c/) ||
            b.match(/^ṭ/) ||
            b.match(/^t/) ||
            b.match(/^p/)) {
            res = a + ' ' + b
        } else if (b.match(/^h/)) {
            res = a.slice(0, -1) + 'ggh' + b.slice(1)
        } else if (b.match(/^n/) || b.match(/^m/)) {
            res = a.slice(0, -1) + 'ṅ' + b
        } else if (b) {
            res = a.slice(0, -1) + 'g' + b
        }
    }

    //ṭ final
    else if (a.match(/ṭ$/)) {
        if (b.match(/^ṣ/) ||
            b.match(/^s/) ||
            b.match(/^ś/) ||
            b.match(/^k/) ||
            b.match(/^c/) ||
            b.match(/^ṭ/) ||
            b.match(/^t/) ||
            b.match(/^p/)) {
            res = a + ' ' + b
        } else if (b.match(/^h/)) {
            res = a.slice(0, -1) + 'ḍḍh' + b.slice(1)
        } else if (b.match(/^n/) || b.match(/^m/)) {
            res = a.slice(0, -1) + 'ṇ' + b
        } else if (b) {
            res = a.slice(0, -1) + 'ḍ' + b
        }
    }

    //t final
    else if (a.match(/t$/)) {
        if (b.match(/^ṣ/) ||
            b.match(/^s/) ||
            b.match(/^k/) ||
            b.match(/^t/) ||
            b.match(/^p/)) {
            res = a + ' ' + b
        } else if (b.match(/^c/)) {
            res = a.slice(0, -1) + 'c' + b
        } else if (b.match(/^l/)) {
            res = a.slice(0, -1) + 'l' + b
        } else if (b.match(/^ṭ/)) {
            res = a.slice(0, -1) + 'ṭ' + b
        } else if (b.match(/^ś/)) {
            res = a.slice(0, -1) + 'cch' + b.slice(1)
        } else if (b.match(/^h/)) {
            res = a.slice(0, -1) + 'ddh' + b.slice(1)
        } else if (b.match(/^n/) || b.match(/^m/)) {
            res = a.slice(0, -1) + 'n' + b
        } else if (b) {
            res = a.slice(0, -1) + 'd' + b
        }
    }

    //p final
    else if (a.match(/p$/)) {
        if (b.match(/^ṣ/) ||
            b.match(/^s/) ||
            b.match(/^ś/) ||
            b.match(/^k/) ||
            b.match(/^c/) ||
            b.match(/^ṭ/) ||
            b.match(/^t/) ||
            b.match(/^p/)) {
            res = a + ' ' + b
        } else if (b.match(/^h/)) {
            res = a.slice(0, -1) + 'bbh' + b.slice(1)
        } else if (b.match(/^n/) || b.match(/^m/)) {
            res = a.slice(0, -1) + 'm' + b
        } else if (b) {
            res = a.slice(0, -1) + 'b' + b
        }
    }

    //ṅ final
    else if (a.match(/ṅ$/)) {
        if (b.match(/^a/) ||
            b.match(/^i/) ||
            b.match(/^u/) ||
            b.match(/^ṛ/)) {
            res = a + 'ṅ' + b
        } else if (b) {
            res = a + " " + b
        }
    }

    //n final
    else if (a.match(/n$/)) {
        if (b.match(/^a/) ||
            b.match(/^i/) ||
            b.match(/^u/) ||
            b.match(/^ṛ/)) {
            res = a + 'n' + b
        } else if (a.match(/^l/)) {
            res = a.slice(0, -1) + "ṃl" + b.slice(1)
        } else if (a.match(/^ś/)) {
            res = a.slice(0, -1) + "ñ" + b
        } else if (a.match(/^c/)) {
            res = a.slice(0, -1) + "ṃś" + b.slice(1)
        } else if (a.match(/^j/)) {
            res = a.slice(0, -1) + "ñ" + b
        } else if (a.match(/^ṭ/)) {
            res = a.slice(0, -1) + "ṃṣ" + b.slice(1)
        } else if (a.match(/^ḍ/)) {
            res = a.slice(0, -1) + "ṇ" + b
        } else if (a.match(/^t/)) {
            res = a.slice(0, -1) + "ṃs" + b.slice(1)
        } else if (b) {
            res = a + ' ' + b
        }
    }

    //m final
    else if (a.match(/m$/)) {
        if (b.match(/^a/) || b.match(/^ā/) ||
            b.match(/^i/) || b.match(/^ī/) ||
            b.match(/^u/) || b.match(/^ū/) ||
            b.match(/^ṛ/) || b.match(/^ṝ/) ||
            b.match(/^e/) || b.match(/^o/)) {
            res = a + b
        } else if (b) {
            res = a.slice(0, -1) + 'ṃ ' + b
        }
    } else {
        res = a + ' ' + b
    }

    retObj.word = res
    //console.log(retObj);
    return retObj
}

function updateResult() {

    var arrObj = [];

    $(".flex-item").each(function () {
        arrObj.push({
            is_dual: $(this).find('#is_dual').prop('checked') == true,
            prefix_a: $(this).find('#prefix_a').prop('checked') == true,
            r_end: $(this).find('#r_end').prop('checked') == true,
            word: Sanscript.t($(this).find('#word').val(), 'devanagari', 'iast')
            //word: $(this).find('#word').val()
        });
    });
    //console.log(arrObj);

    var obj = arrObj[0];
    for (i = 1; i < arrObj.length; i++) {
        obj = do_sandhi(obj, arrObj[i]);
    }

    var res_text = Sanscript.t(obj.word, 'iast', 'devanagari');

    $('#result_text').val(res_text);
    sylls = syllabalise(res_text);
    $('#number').html(sylls.length);

    var $table = $('#syllables');

    $table.empty();
    var $row = $('<tr></tr>').appendTo($table);
    $(sylls).each(function (index, value) {
        if (index == 4 || index == 12 || index == 14 || index > 15) {
            if (short_sounds.contains(value) && index < 15) {
                $('<td></td>').attr({
                    class: "col-md-1",
                    bgcolor: "#00FF00"
                }).text(value).appendTo($row);
            } else {
                $('<td></td>').attr({
                    class: "col-md-1",
                    bgcolor: "#FF0000"
                }).text(value).appendTo($row);
            }
        } else {
            $('<td></td>').attr({
                class: "col-md-1"
            }).text(value).appendTo($row);
        }
    });
};

$("#add_item").click(function () {
    $(".flex-container").append(
        `<div class='flex-item'>
        <button id='del'>X</button>
        <br><input type='checkbox' id='is_dual' value='is_dual'>is-dual
        <br><input type='checkbox' id='prefix_a' value='prefix_a'>prefix-a
        <br><input type='checkbox' id='r_end' value='r_end'>r-end
        <br><input id='word' type='text' value=''>
      </div>`
    );

    $(".flex-item").draggable({
        connectToSortable: ".flex-container",
        axis: 'x'
    });
});

$(function () {
    $('.flex-container').sortable({
        update: function (event, ui) {
            updateResult();
        },
        revert: false
    });
});

$('.flex-container').on('keyup', "input[type='text']", function () {
    updateResult();
});

$('.flex-container').on('click', "input[type='checkbox']", function () {
    updateResult();
});

$('.flex-container').on('click', '#del', function () {
    $(this).parent().remove();
    updateResult();
});