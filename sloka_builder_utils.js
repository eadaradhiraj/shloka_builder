
function laghu_or_dirgha (sylls, pos, lorg) {
    if (sylls.length < pos) {
        return ""
    } else if (["l"].includes(lorg)) {
        return vowel_type(sylls[pos-1])=="l" ? "text-success" : "text-danger"
    } else if ( ["d"].includes(lorg) ) {
        return vowel_type(sylls[pos-1]) == "d" ? "text-success" : "text-danger"
    } else {
        return ""
    }
}

function create_table(sylls) {
    let metre_dict = {
        "anushtup": {
            5: laghu_or_dirgha(sylls, 5, "l"),
            6: laghu_or_dirgha(sylls, 6, "d"),
            13: laghu_or_dirgha(sylls, 13, "l"),
            14: laghu_or_dirgha(sylls, 14, "d"),
            15: laghu_or_dirgha(sylls, 15, "l"),
        }, 
        "indravajra": {
            //pada 1 or 1st foot
            1: laghu_or_dirgha(sylls, 1, "d"),
            2: laghu_or_dirgha(sylls, 2, "d"),
            3: laghu_or_dirgha(sylls, 3, "l"),
            4: laghu_or_dirgha(sylls, 4, "d"),
            5: laghu_or_dirgha(sylls, 5, "d"),
            6: laghu_or_dirgha(sylls, 6, "l"),
            7: laghu_or_dirgha(sylls, 7, "l"),
            8: laghu_or_dirgha(sylls, 8, "d"),
            9: laghu_or_dirgha(sylls, 9, "l"),
            10: laghu_or_dirgha(sylls, 10, "d"),
            11: laghu_or_dirgha(sylls, 11, "d"),
            //pada 2 or 2nd foot
            12: laghu_or_dirgha(sylls, 12, "d"),
            13: laghu_or_dirgha(sylls, 13, "d"),
            14: laghu_or_dirgha(sylls, 14, "l"),
            15: laghu_or_dirgha(sylls, 15, "d"),
            16: laghu_or_dirgha(sylls, 16, "d"),
            17: laghu_or_dirgha(sylls, 17, "l"),
            18: laghu_or_dirgha(sylls, 18, "l"),
            19: laghu_or_dirgha(sylls, 19, "d"),
            20: laghu_or_dirgha(sylls, 20, "l"),
            21: laghu_or_dirgha(sylls, 21, "d"),
            22: laghu_or_dirgha(sylls, 22, "d"),
        }
    }

    let content = "<table class='table res_table'><tr>"
    for (let i = 0; i < sylls.length; i++) {
        content += `<td class=${metre_dict[$("#metres").val()][i+1]}>` + sylls[i] + '</td>';
    }
    content += '</tr><tr>'
    for (let i = 0; i < sylls.length; i++) {
        content += '<td>' + (i + 1) + '</td>';
    }
    content += "</tr></table>"
    $('#here_table').append(content);
}
function create_textare(it, txt) {
    let sylls = syllabalize(txt)
    create_table(sylls)
    $("#results").append(
        `<input id="result${it}" class="form-control result" value="${txt}" type="text" readonly>`
    )
}
function loop_objs() {
    let arrs = []
    $('.list-group-item').each(function (_, li) {
        arrs.push(
            {
                "st": $(li).find(".word").val(),
                "prop": $(li).find(".prop").val()
            }
        )
    });
    if (arrs.length == 1) {
        alert("You have only one word!! Enter one more at least.")
    }
    let result = join_all_sandhi(arrs)
    $(".result").remove()
    $(".res_table").remove();
    for (let i = 0; i < result.length; i++) {
        create_textare(i, result[i])
    }

}

function del_obj_event() {
    $(".del-item").click(function (el) {
        $(this).closest('.list-group-item').remove();
    })
}

function change_color() {
    $(".list-group-item").click(function(){
        $(".list-group-item").css("background-color", "white");
        $(".list-group-item").removeClass("selected");
        $(this).css("background-color", "blue");
        $(this).addClass("selected")
    });
}

function moveLeft($item) {
    $before = $item.prev();
    $item.insertBefore($before);
}

function moveRight($item) {
    $after = $item.next();
    $item.insertAfter($after);
}

$(function () {
    $("#sortable1").sortable({
        connectWith: ".connectedSortable"
    }).disableSelection();
})

$("#check").click(function () {
    loop_objs()
})

$(document).ready(function () {
    del_obj_event()
    change_color()
}).keydown(function(e) {
    let pressed_key = e.keyCode;
    if (pressed_key == 38) {
        moveLeft($(".selected"))
    } else if (pressed_key == 40) {
        moveRight($(".selected"))
    }
});


$("#add_word").click(function () {
    $("#sortable1").append(`<li class="list-group-item">
        <div class="input-group">
          <input type="text" class="word form-control" placeholder="enter a word" aria-label="Recipient's username with two button addons" aria-describedby="button-addon4">
            <div class="input-group-append word-div" id="button-addon4">
              <input type="text" class="property form-control" placeholder="enter a property if applicable"
              aria-label="Recipient's username with two button addons" aria-describedby="button-addon4">
              <button class="btn del-item btn-outline-secondary" type="button">DEL</button>
            </div>
          </div>
      </li>`);
    del_obj_event();
    change_color();
})

function vowel_type(syll) {
    return (short_vowels.includes(syll.slice(-1))) && (!vowels.includes(syll.slice(-2, -1))) ? "l":"d"
}
