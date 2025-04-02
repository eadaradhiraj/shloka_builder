const non_rom_reg = /[^\u0000-\u024F\u1E00-\u1EFF\u2C60-\u2C7F\uA720-\uA7FF]/g;

function laghu_or_dirgha(sylls, pos, lorg) {
  if (sylls.length < pos) {
    return ""
  } else if (["l"].includes(lorg)) {
    return vowel_type(sylls[pos - 1]) == "l" ? "text-success" : "text-danger"
  } else if (["g"].includes(lorg)) {
    return vowel_type(sylls[pos - 1]) == "g" ? "text-success" : "text-danger"
  } else {
    return ""
  }
}

function create_table(sylls) {
  let metre_dict = {
    "anushtup": {
      //pada 1
      5: laghu_or_dirgha(sylls, 5, "l"),
      6: laghu_or_dirgha(sylls, 6, "g"),
      7: laghu_or_dirgha(sylls, 7, "g"),
      //pada 2
      13: laghu_or_dirgha(sylls, 13, "l"),
      14: laghu_or_dirgha(sylls, 14, "g"),
      15: laghu_or_dirgha(sylls, 15, "l"),
    },
    "upendravajra": {
      // pada 1
      1: laghu_or_dirgha(sylls, 1, "l"),
      2: laghu_or_dirgha(sylls, 2, "g"),
      3: laghu_or_dirgha(sylls, 3, "l"),
      4: laghu_or_dirgha(sylls, 4, "g"),
      5: laghu_or_dirgha(sylls, 5, "g"),
      6: laghu_or_dirgha(sylls, 6, "l"),
      7: laghu_or_dirgha(sylls, 7, "l"),
      8: laghu_or_dirgha(sylls, 8, "g"),
      9: laghu_or_dirgha(sylls, 9, "l"),
      10: laghu_or_dirgha(sylls, 10, "g"),
      11: laghu_or_dirgha(sylls, 11, "g"),
      // pada 2
      12: laghu_or_dirgha(sylls, 12, "l"),
      13: laghu_or_dirgha(sylls, 13, "g"),
      14: laghu_or_dirgha(sylls, 14, "l"),
      15: laghu_or_dirgha(sylls, 15, "g"),
      16: laghu_or_dirgha(sylls, 16, "g"),
      17: laghu_or_dirgha(sylls, 17, "l"),
      18: laghu_or_dirgha(sylls, 18, "l"),
      19: laghu_or_dirgha(sylls, 19, "g"),
      20: laghu_or_dirgha(sylls, 20, "l"),
      21: laghu_or_dirgha(sylls, 21, "g"),
      22: laghu_or_dirgha(sylls, 22, "g"),
    },
    "upajAti": {
      //pada 1
      1: laghu_or_dirgha(sylls, 1, "l"),
      2: laghu_or_dirgha(sylls, 2, "g"),
      3: laghu_or_dirgha(sylls, 3, "l"),
      4: laghu_or_dirgha(sylls, 4, "g"),
      5: laghu_or_dirgha(sylls, 5, "g"),
      6: laghu_or_dirgha(sylls, 6, "l"),
      7: laghu_or_dirgha(sylls, 7, "l"),
      8: laghu_or_dirgha(sylls, 8, "g"),
      9: laghu_or_dirgha(sylls, 9, "l"),
      10: laghu_or_dirgha(sylls, 10, "g"),
      11: laghu_or_dirgha(sylls, 11, "g"),
      //pada 2
      12: laghu_or_dirgha(sylls, 12, "g"),
      13: laghu_or_dirgha(sylls, 13, "g"),
      14: laghu_or_dirgha(sylls, 14, "l"),
      15: laghu_or_dirgha(sylls, 15, "g"),
      16: laghu_or_dirgha(sylls, 16, "g"),
      17: laghu_or_dirgha(sylls, 17, "l"),
      18: laghu_or_dirgha(sylls, 18, "l"),
      19: laghu_or_dirgha(sylls, 19, "g"),
      20: laghu_or_dirgha(sylls, 20, "l"),
      21: laghu_or_dirgha(sylls, 21, "g"),
      22: laghu_or_dirgha(sylls, 22, "g"),
    },
    "shalini": {
      // pada 1
      1: laghu_or_dirgha(sylls, 1, "g"),
      2: laghu_or_dirgha(sylls, 2, "g"),
      3: laghu_or_dirgha(sylls, 3, "g"),
      4: laghu_or_dirgha(sylls, 4, "g"),
      5: laghu_or_dirgha(sylls, 5, "g"),
      6: laghu_or_dirgha(sylls, 6, "l"),
      7: laghu_or_dirgha(sylls, 7, "g"),
      8: laghu_or_dirgha(sylls, 8, "g"),
      9: laghu_or_dirgha(sylls, 9, "l"),
      10: laghu_or_dirgha(sylls, 10, "g"),
      11: laghu_or_dirgha(sylls, 11, "g"),
      // pada 2
      12: laghu_or_dirgha(sylls, 12, "g"),
      13: laghu_or_dirgha(sylls, 13, "g"),
      14: laghu_or_dirgha(sylls, 14, "g"),
      15: laghu_or_dirgha(sylls, 15, "g"),
      16: laghu_or_dirgha(sylls, 16, "g"),
      17: laghu_or_dirgha(sylls, 17, "l"),
      18: laghu_or_dirgha(sylls, 18, "g"),
      19: laghu_or_dirgha(sylls, 19, "g"),
      20: laghu_or_dirgha(sylls, 20, "l"),
      21: laghu_or_dirgha(sylls, 21, "g"),
      22: laghu_or_dirgha(sylls, 22, "g"),
    },
    "bhujangaprayAta": {
      //lgg/lgg/lgg/lgg
      // pada 1
      1: laghu_or_dirgha(sylls, 1, "l"),
      2: laghu_or_dirgha(sylls, 2, "g"),
      3: laghu_or_dirgha(sylls, 3, "g"),
      4: laghu_or_dirgha(sylls, 4, "l"),
      5: laghu_or_dirgha(sylls, 5, "g"),
      6: laghu_or_dirgha(sylls, 6, "g"),
      7: laghu_or_dirgha(sylls, 7, "l"),
      8: laghu_or_dirgha(sylls, 8, "g"),
      9: laghu_or_dirgha(sylls, 9, "g"),
      10: laghu_or_dirgha(sylls, 10, "l"),
      11: laghu_or_dirgha(sylls, 11, "g"),
      12: laghu_or_dirgha(sylls, 12, "g"),
      // pada 2
      13: laghu_or_dirgha(sylls, 13, "l"),
      14: laghu_or_dirgha(sylls, 14, "g"),
      15: laghu_or_dirgha(sylls, 15, "g"),
      16: laghu_or_dirgha(sylls, 16, "l"),
      17: laghu_or_dirgha(sylls, 17, "g"),
      18: laghu_or_dirgha(sylls, 18, "g"),
      19: laghu_or_dirgha(sylls, 19, "l"),
      20: laghu_or_dirgha(sylls, 20, "g"),
      21: laghu_or_dirgha(sylls, 21, "g"),
      22: laghu_or_dirgha(sylls, 22, "l"),
      23: laghu_or_dirgha(sylls, 23, "g"),
      24: laghu_or_dirgha(sylls, 24, "g"),
    },
    "druta-vilambita": {
      //lll-gll-gll-glg
      // pada 1
      1: laghu_or_dirgha(sylls, 1, "l"),
      2: laghu_or_dirgha(sylls, 2, "l"),
      3: laghu_or_dirgha(sylls, 3, "l"),
      4: laghu_or_dirgha(sylls, 4, "g"),
      5: laghu_or_dirgha(sylls, 5, "l"),
      6: laghu_or_dirgha(sylls, 6, "l"),
      7: laghu_or_dirgha(sylls, 7, "g"),
      8: laghu_or_dirgha(sylls, 8, "l"),
      9: laghu_or_dirgha(sylls, 9, "l"),
      10: laghu_or_dirgha(sylls, 10, "g"),
      11: laghu_or_dirgha(sylls, 11, "l"),
      12: laghu_or_dirgha(sylls, 12, "g"),
      // pada 2
      13: laghu_or_dirgha(sylls, 13, "l"),
      14: laghu_or_dirgha(sylls, 14, "l"),
      15: laghu_or_dirgha(sylls, 15, "l"),
      16: laghu_or_dirgha(sylls, 16, "g"),
      17: laghu_or_dirgha(sylls, 17, "l"),
      18: laghu_or_dirgha(sylls, 18, "l"),
      19: laghu_or_dirgha(sylls, 19, "g"),
      20: laghu_or_dirgha(sylls, 20, "l"),
      21: laghu_or_dirgha(sylls, 21, "l"),
      22: laghu_or_dirgha(sylls, 22, "g"),
      23: laghu_or_dirgha(sylls, 23, "l"),
      24: laghu_or_dirgha(sylls, 24, "g"),
    },
    "chandriNI": {
      //lgg/ggg/glg/glg/g
      // pada 1
      1: laghu_or_dirgha(sylls, 1, "l"),
      2: laghu_or_dirgha(sylls, 2, "g"),
      3: laghu_or_dirgha(sylls, 3, "g"),
      4: laghu_or_dirgha(sylls, 4, "g"),
      5: laghu_or_dirgha(sylls, 5, "g"),
      6: laghu_or_dirgha(sylls, 6, "g"),
      7: laghu_or_dirgha(sylls, 7, "g"),
      8: laghu_or_dirgha(sylls, 8, "l"),
      9: laghu_or_dirgha(sylls, 9, "g"),
      10: laghu_or_dirgha(sylls, 10, "g"),
      11: laghu_or_dirgha(sylls, 11, "l"),
      12: laghu_or_dirgha(sylls, 12, "g"),
      13: laghu_or_dirgha(sylls, 13, "g"),
      // pada 2
      14: laghu_or_dirgha(sylls, 14, "l"),
      15: laghu_or_dirgha(sylls, 15, "g"),
      16: laghu_or_dirgha(sylls, 16, "g"),
      17: laghu_or_dirgha(sylls, 17, "g"),
      18: laghu_or_dirgha(sylls, 18, "g"),
      19: laghu_or_dirgha(sylls, 19, "g"),
      20: laghu_or_dirgha(sylls, 20, "g"),
      21: laghu_or_dirgha(sylls, 21, "l"),
      22: laghu_or_dirgha(sylls, 22, "g"),
      23: laghu_or_dirgha(sylls, 23, "g"),
      24: laghu_or_dirgha(sylls, 24, "l"),
      25: laghu_or_dirgha(sylls, 25, "g"),
      26: laghu_or_dirgha(sylls, 26, "g"),
    },
    "mAlinI": {
      //lll/lll/ggg/lgg/lgg
      // pada 1
      1: laghu_or_dirgha(sylls, 1, "l"),
      2: laghu_or_dirgha(sylls, 2, "l"),
      3: laghu_or_dirgha(sylls, 3, "l"),
      4: laghu_or_dirgha(sylls, 4, "l"),
      5: laghu_or_dirgha(sylls, 5, "l"),
      6: laghu_or_dirgha(sylls, 6, "l"),
      7: laghu_or_dirgha(sylls, 7, "g"),
      8: laghu_or_dirgha(sylls, 8, "g"),
      9: laghu_or_dirgha(sylls, 9, "g"),
      10: laghu_or_dirgha(sylls, 10, "l"),
      11: laghu_or_dirgha(sylls, 11, "g"),
      12: laghu_or_dirgha(sylls, 12, "g"),
      13: laghu_or_dirgha(sylls, 13, "l"),
      14: laghu_or_dirgha(sylls, 14, "g"),
      15: laghu_or_dirgha(sylls, 15, "g"),
      // pada 2
      16: laghu_or_dirgha(sylls, 16, "l"),
      17: laghu_or_dirgha(sylls, 17, "l"),
      18: laghu_or_dirgha(sylls, 18, "l"),
      19: laghu_or_dirgha(sylls, 19, "l"),
      20: laghu_or_dirgha(sylls, 20, "l"),
      21: laghu_or_dirgha(sylls, 21, "l"),
      22: laghu_or_dirgha(sylls, 22, "g"),
      23: laghu_or_dirgha(sylls, 23, "g"),
      24: laghu_or_dirgha(sylls, 24, "g"),
      25: laghu_or_dirgha(sylls, 25, "l"),
      26: laghu_or_dirgha(sylls, 26, "g"),
      27: laghu_or_dirgha(sylls, 27, "g"),
      28: laghu_or_dirgha(sylls, 28, "l"),
      29: laghu_or_dirgha(sylls, 29, "g"),
      30: laghu_or_dirgha(sylls, 30, "g"),
    },
    "totakam": {
      //llg/llg/llg/llg
      // pada 1
      1: laghu_or_dirgha(sylls, 1, "l"),
      2: laghu_or_dirgha(sylls, 2, "l"),
      3: laghu_or_dirgha(sylls, 3, "g"),
      4: laghu_or_dirgha(sylls, 4, "l"),
      5: laghu_or_dirgha(sylls, 5, "l"),
      6: laghu_or_dirgha(sylls, 6, "g"),
      7: laghu_or_dirgha(sylls, 7, "l"),
      8: laghu_or_dirgha(sylls, 8, "l"),
      9: laghu_or_dirgha(sylls, 9, "g"),
      10: laghu_or_dirgha(sylls, 10, "l"),
      11: laghu_or_dirgha(sylls, 11, "l"),
      12: laghu_or_dirgha(sylls, 12, "g"),
      // pada 2
      13: laghu_or_dirgha(sylls, 13, "l"),
      14: laghu_or_dirgha(sylls, 14, "l"),
      15: laghu_or_dirgha(sylls, 15, "g"),
      16: laghu_or_dirgha(sylls, 16, "l"),
      17: laghu_or_dirgha(sylls, 17, "l"),
      18: laghu_or_dirgha(sylls, 18, "g"),
      19: laghu_or_dirgha(sylls, 19, "l"),
      20: laghu_or_dirgha(sylls, 20, "l"),
      21: laghu_or_dirgha(sylls, 21, "g"),
      22: laghu_or_dirgha(sylls, 22, "l"),
      23: laghu_or_dirgha(sylls, 23, "l"),
      24: laghu_or_dirgha(sylls, 24, "g"),
    },
    "pancAmaram": {
      //lgl/glg/lgl/glg/lgl/g
      // pada 1
      1: laghu_or_dirgha(sylls, 1, "l"),
      2: laghu_or_dirgha(sylls, 2, "g"),
      3: laghu_or_dirgha(sylls, 3, "l"),
      4: laghu_or_dirgha(sylls, 4, "g"),
      5: laghu_or_dirgha(sylls, 5, "l"),
      6: laghu_or_dirgha(sylls, 6, "g"),
      7: laghu_or_dirgha(sylls, 7, "l"),
      8: laghu_or_dirgha(sylls, 8, "g"),
      9: laghu_or_dirgha(sylls, 9, "l"),
      10: laghu_or_dirgha(sylls, 10, "g"),
      11: laghu_or_dirgha(sylls, 11, "l"),
      12: laghu_or_dirgha(sylls, 12, "g"),
      13: laghu_or_dirgha(sylls, 13, "l"),
      14: laghu_or_dirgha(sylls, 14, "g"),
      15: laghu_or_dirgha(sylls, 15, "l"),
      16: laghu_or_dirgha(sylls, 16, "g"),
      // pada 2
      17: laghu_or_dirgha(sylls, 17, "l"),
      18: laghu_or_dirgha(sylls, 18, "g"),
      19: laghu_or_dirgha(sylls, 19, "l"),
      20: laghu_or_dirgha(sylls, 20, "g"),
      21: laghu_or_dirgha(sylls, 21, "l"),
      22: laghu_or_dirgha(sylls, 22, "g"),
      23: laghu_or_dirgha(sylls, 23, "l"),
      24: laghu_or_dirgha(sylls, 24, "g"),
      25: laghu_or_dirgha(sylls, 25, "l"),
      26: laghu_or_dirgha(sylls, 26, "g"),
      27: laghu_or_dirgha(sylls, 27, "l"),
      28: laghu_or_dirgha(sylls, 28, "g"),
      29: laghu_or_dirgha(sylls, 29, "l"),
      30: laghu_or_dirgha(sylls, 30, "g"),
      31: laghu_or_dirgha(sylls, 31, "l"),
      32: laghu_or_dirgha(sylls, 32, "g"),
    },
    "shikhariNI": {
      //lgg/ggg/lll/llg/gll/lg
      // pada 1
      1: laghu_or_dirgha(sylls, 1, "l"),
      2: laghu_or_dirgha(sylls, 2, "g"),
      3: laghu_or_dirgha(sylls, 3, "g"),
      4: laghu_or_dirgha(sylls, 4, "g"),
      5: laghu_or_dirgha(sylls, 5, "g"),
      6: laghu_or_dirgha(sylls, 6, "g"),
      7: laghu_or_dirgha(sylls, 7, "l"),
      8: laghu_or_dirgha(sylls, 8, "l"),
      9: laghu_or_dirgha(sylls, 9, "l"),
      10: laghu_or_dirgha(sylls, 10, "l"),
      11: laghu_or_dirgha(sylls, 11, "l"),
      12: laghu_or_dirgha(sylls, 12, "g"),
      13: laghu_or_dirgha(sylls, 13, "g"),
      14: laghu_or_dirgha(sylls, 14, "l"),
      15: laghu_or_dirgha(sylls, 15, "l"),
      16: laghu_or_dirgha(sylls, 16, "l"),
      17: laghu_or_dirgha(sylls, 17, "g"),
      // pada 2
      18: laghu_or_dirgha(sylls, 18, "l"),
      19: laghu_or_dirgha(sylls, 19, "g"),
      20: laghu_or_dirgha(sylls, 20, "g"),
      21: laghu_or_dirgha(sylls, 21, "g"),
      22: laghu_or_dirgha(sylls, 22, "g"),
      23: laghu_or_dirgha(sylls, 23, "g"),
      24: laghu_or_dirgha(sylls, 24, "l"),
      25: laghu_or_dirgha(sylls, 25, "l"),
      26: laghu_or_dirgha(sylls, 26, "l"),
      27: laghu_or_dirgha(sylls, 27, "l"),
      28: laghu_or_dirgha(sylls, 28, "l"),
      29: laghu_or_dirgha(sylls, 29, "g"),
      30: laghu_or_dirgha(sylls, 30, "g"),
      31: laghu_or_dirgha(sylls, 31, "l"),
      32: laghu_or_dirgha(sylls, 32, "l"),
      33: laghu_or_dirgha(sylls, 33, "l"),
      34: laghu_or_dirgha(sylls, 34, "g"),
    },
    "mandAkrAntA": {
      //ggg/gll/lll/ggl/ggl/gg
      // pada 1
      1: laghu_or_dirgha(sylls, 1, "g"),
      2: laghu_or_dirgha(sylls, 2, "g"),
      3: laghu_or_dirgha(sylls, 3, "g"),
      4: laghu_or_dirgha(sylls, 4, "g"),
      5: laghu_or_dirgha(sylls, 5, "l"),
      6: laghu_or_dirgha(sylls, 6, "l"),
      7: laghu_or_dirgha(sylls, 7, "l"),
      8: laghu_or_dirgha(sylls, 8, "l"),
      9: laghu_or_dirgha(sylls, 9, "l"),
      10: laghu_or_dirgha(sylls, 10, "g"),
      11: laghu_or_dirgha(sylls, 11, "g"),
      12: laghu_or_dirgha(sylls, 12, "l"),
      13: laghu_or_dirgha(sylls, 13, "g"),
      14: laghu_or_dirgha(sylls, 14, "g"),
      15: laghu_or_dirgha(sylls, 15, "l"),
      16: laghu_or_dirgha(sylls, 16, "g"),
      17: laghu_or_dirgha(sylls, 17, "g"),
      // pada 2
      18: laghu_or_dirgha(sylls, 18, "g"),
      19: laghu_or_dirgha(sylls, 19, "g"),
      20: laghu_or_dirgha(sylls, 20, "g"),
      21: laghu_or_dirgha(sylls, 21, "g"),
      22: laghu_or_dirgha(sylls, 22, "l"),
      23: laghu_or_dirgha(sylls, 23, "l"),
      24: laghu_or_dirgha(sylls, 24, "l"),
      25: laghu_or_dirgha(sylls, 25, "l"),
      26: laghu_or_dirgha(sylls, 26, "l"),
      27: laghu_or_dirgha(sylls, 27, "g"),
      28: laghu_or_dirgha(sylls, 28, "g"),
      29: laghu_or_dirgha(sylls, 29, "l"),
      30: laghu_or_dirgha(sylls, 30, "g"),
      31: laghu_or_dirgha(sylls, 31, "g"),
      32: laghu_or_dirgha(sylls, 32, "l"),
      33: laghu_or_dirgha(sylls, 33, "g"),
      34: laghu_or_dirgha(sylls, 34, "g"),
    },
    "shArdUla-vikrIditam": {
      // ggg-llg-lgl-llg-ggl-ggl-g
      // pada 1
      1: laghu_or_dirgha(sylls, 1, "g"),
      2: laghu_or_dirgha(sylls, 2, "g"),
      3: laghu_or_dirgha(sylls, 3, "g"),
      4: laghu_or_dirgha(sylls, 4, "l"),
      5: laghu_or_dirgha(sylls, 5, "l"),
      6: laghu_or_dirgha(sylls, 6, "g"),
      7: laghu_or_dirgha(sylls, 7, "l"),
      8: laghu_or_dirgha(sylls, 8, "g"),
      9: laghu_or_dirgha(sylls, 9, "l"),
      10: laghu_or_dirgha(sylls, 10, "l"),
      11: laghu_or_dirgha(sylls, 11, "l"),
      12: laghu_or_dirgha(sylls, 12, "g"),
      13: laghu_or_dirgha(sylls, 13, "g"),
      14: laghu_or_dirgha(sylls, 14, "g"),
      15: laghu_or_dirgha(sylls, 15, "l"),
      16: laghu_or_dirgha(sylls, 16, "g"),
      17: laghu_or_dirgha(sylls, 17, "g"),
      18: laghu_or_dirgha(sylls, 18, "l"),
      19: laghu_or_dirgha(sylls, 19, "g"),
      // pada 2
      20: laghu_or_dirgha(sylls, 20, "g"),
      21: laghu_or_dirgha(sylls, 21, "g"),
      22: laghu_or_dirgha(sylls, 22, "g"),
      23: laghu_or_dirgha(sylls, 23, "l"),
      24: laghu_or_dirgha(sylls, 24, "l"),
      25: laghu_or_dirgha(sylls, 25, "g"),
      26: laghu_or_dirgha(sylls, 26, "l"),
      27: laghu_or_dirgha(sylls, 27, "g"),
      28: laghu_or_dirgha(sylls, 28, "l"),
      29: laghu_or_dirgha(sylls, 29, "l"),
      30: laghu_or_dirgha(sylls, 30, "l"),
      31: laghu_or_dirgha(sylls, 31, "g"),
      32: laghu_or_dirgha(sylls, 32, "g"),
      33: laghu_or_dirgha(sylls, 33, "g"),
      34: laghu_or_dirgha(sylls, 34, "l"),
      35: laghu_or_dirgha(sylls, 35, "g"),
      36: laghu_or_dirgha(sylls, 26, "g"),
      37: laghu_or_dirgha(sylls, 37, "l"),
      38: laghu_or_dirgha(sylls, 38, "g"),
    },
    "sragdhaaraa": {
      // ggg glg gll lll lgg lgg lgg
      // pada 1
      1: laghu_or_dirgha(sylls, 1, "g"),
      2: laghu_or_dirgha(sylls, 2, "g"),
      3: laghu_or_dirgha(sylls, 3, "g"),
      4: laghu_or_dirgha(sylls, 4, "g"),
      5: laghu_or_dirgha(sylls, 5, "l"),
      6: laghu_or_dirgha(sylls, 6, "g"),
      7: laghu_or_dirgha(sylls, 7, "g"),
      8: laghu_or_dirgha(sylls, 8, "l"),
      9: laghu_or_dirgha(sylls, 9, "l"),
      10: laghu_or_dirgha(sylls, 10, "l"),
      11: laghu_or_dirgha(sylls, 11, "l"),
      12: laghu_or_dirgha(sylls, 12, "l"),
      13: laghu_or_dirgha(sylls, 13, "l"),
      14: laghu_or_dirgha(sylls, 14, "g"),
      15: laghu_or_dirgha(sylls, 15, "g"),
      16: laghu_or_dirgha(sylls, 16, "l"),
      17: laghu_or_dirgha(sylls, 17, "g"),
      18: laghu_or_dirgha(sylls, 18, "g"),
      19: laghu_or_dirgha(sylls, 19, "l"),
      20: laghu_or_dirgha(sylls, 20, "g"),
      21: laghu_or_dirgha(sylls, 21, "g"),
      // pada 2
      22: laghu_or_dirgha(sylls, 22, "g"),
      23: laghu_or_dirgha(sylls, 23, "g"),
      24: laghu_or_dirgha(sylls, 24, "g"),
      25: laghu_or_dirgha(sylls, 25, "g"),
      26: laghu_or_dirgha(sylls, 26, "l"),
      27: laghu_or_dirgha(sylls, 27, "g"),
      28: laghu_or_dirgha(sylls, 28, "g"),
      29: laghu_or_dirgha(sylls, 29, "l"),
      30: laghu_or_dirgha(sylls, 30, "l"),
      31: laghu_or_dirgha(sylls, 31, "l"),
      32: laghu_or_dirgha(sylls, 32, "l"),
      33: laghu_or_dirgha(sylls, 33, "l"),
      34: laghu_or_dirgha(sylls, 34, "l"),
      35: laghu_or_dirgha(sylls, 35, "g"),
      36: laghu_or_dirgha(sylls, 36, "g"),
      37: laghu_or_dirgha(sylls, 37, "l"),
      38: laghu_or_dirgha(sylls, 38, "g"),
      39: laghu_or_dirgha(sylls, 39, "g"),
      40: laghu_or_dirgha(sylls, 40, "l"),
      41: laghu_or_dirgha(sylls, 41, "g"),
      42: laghu_or_dirgha(sylls, 42, "g"),
    },
    "Vamshastha": {
      // pada 1
      1: laghu_or_dirgha(sylls, 1, "l"),
      2: laghu_or_dirgha(sylls, 2, "g"),
      3: laghu_or_dirgha(sylls, 3, "l"),
      4: laghu_or_dirgha(sylls, 4, "g"),
      5: laghu_or_dirgha(sylls, 5, "g"),
      6: laghu_or_dirgha(sylls, 6, "l"),
      7: laghu_or_dirgha(sylls, 7, "l"),
      8: laghu_or_dirgha(sylls, 8, "g"),
      9: laghu_or_dirgha(sylls, 9, "l"),
      10: laghu_or_dirgha(sylls, 10, "g"),
      11: laghu_or_dirgha(sylls, 11, "l"),
      12: laghu_or_dirgha(sylls, 12, "g"),
      // pada 2
      13: laghu_or_dirgha(sylls, 13, "l"),
      14: laghu_or_dirgha(sylls, 14, "g"),
      15: laghu_or_dirgha(sylls, 15, "l"),
      16: laghu_or_dirgha(sylls, 16, "g"),
      17: laghu_or_dirgha(sylls, 17, "g"),
      18: laghu_or_dirgha(sylls, 18, "l"),
      19: laghu_or_dirgha(sylls, 19, "l"),
      20: laghu_or_dirgha(sylls, 20, "g"),
      21: laghu_or_dirgha(sylls, 21, "l"),
      22: laghu_or_dirgha(sylls, 22, "g"),
      23: laghu_or_dirgha(sylls, 23, "l"),
      24: laghu_or_dirgha(sylls, 24, "g"),
    },
    "vasantatilaka": {
      //ggl/gll/lgl/lgl/gg
      // pada 1
      1: laghu_or_dirgha(sylls, 1, "g"),
      2: laghu_or_dirgha(sylls, 2, "g"),
      3: laghu_or_dirgha(sylls, 3, "l"),
      4: laghu_or_dirgha(sylls, 4, "g"),
      5: laghu_or_dirgha(sylls, 5, "l"),
      6: laghu_or_dirgha(sylls, 6, "l"),
      7: laghu_or_dirgha(sylls, 7, "l"),
      8: laghu_or_dirgha(sylls, 8, "g"),
      9: laghu_or_dirgha(sylls, 9, "l"),
      10: laghu_or_dirgha(sylls, 10, "l"),
      11: laghu_or_dirgha(sylls, 11, "g"),
      12: laghu_or_dirgha(sylls, 12, "l"),
      13: laghu_or_dirgha(sylls, 13, "g"),
      14: laghu_or_dirgha(sylls, 14, "g"),
      // pada 2
      15: laghu_or_dirgha(sylls, 15, "g"),
      16: laghu_or_dirgha(sylls, 16, "g"),
      17: laghu_or_dirgha(sylls, 17, "l"),
      18: laghu_or_dirgha(sylls, 18, "g"),
      19: laghu_or_dirgha(sylls, 19, "l"),
      20: laghu_or_dirgha(sylls, 20, "l"),
      21: laghu_or_dirgha(sylls, 21, "l"),
      22: laghu_or_dirgha(sylls, 22, "g"),
      23: laghu_or_dirgha(sylls, 23, "l"),
      24: laghu_or_dirgha(sylls, 24, "l"),
      25: laghu_or_dirgha(sylls, 25, "g"),
      26: laghu_or_dirgha(sylls, 26, "l"),
      27: laghu_or_dirgha(sylls, 27, "g"),
      28: laghu_or_dirgha(sylls, 28, "g"),
    },
    "rathoddhatA": {
      // pada 1
      1: laghu_or_dirgha(sylls, 1, "g"),
      2: laghu_or_dirgha(sylls, 2, "l"),
      3: laghu_or_dirgha(sylls, 3, "g"),
      4: laghu_or_dirgha(sylls, 4, "l"),
      5: laghu_or_dirgha(sylls, 5, "l"),
      6: laghu_or_dirgha(sylls, 6, "l"),
      7: laghu_or_dirgha(sylls, 7, "g"),
      8: laghu_or_dirgha(sylls, 8, "l"),
      9: laghu_or_dirgha(sylls, 9, "g"),
      10: laghu_or_dirgha(sylls, 10, "l"),
      11: laghu_or_dirgha(sylls, 11, "g"),
      // pada 2
      12: laghu_or_dirgha(sylls, 12, "g"),
      13: laghu_or_dirgha(sylls, 13, "l"),
      14: laghu_or_dirgha(sylls, 14, "g"),
      15: laghu_or_dirgha(sylls, 15, "l"),
      16: laghu_or_dirgha(sylls, 16, "l"),
      17: laghu_or_dirgha(sylls, 17, "l"),
      18: laghu_or_dirgha(sylls, 18, "g"),
      19: laghu_or_dirgha(sylls, 19, "l"),
      20: laghu_or_dirgha(sylls, 20, "g"),
      21: laghu_or_dirgha(sylls, 21, "l"),
      22: laghu_or_dirgha(sylls, 22, "g"),
    },
    "indravajra": {
      //pada 1 or 1st foot
      1: laghu_or_dirgha(sylls, 1, "g"),
      2: laghu_or_dirgha(sylls, 2, "g"),
      3: laghu_or_dirgha(sylls, 3, "l"),
      4: laghu_or_dirgha(sylls, 4, "g"),
      5: laghu_or_dirgha(sylls, 5, "g"),
      6: laghu_or_dirgha(sylls, 6, "l"),
      7: laghu_or_dirgha(sylls, 7, "l"),
      8: laghu_or_dirgha(sylls, 8, "g"),
      9: laghu_or_dirgha(sylls, 9, "l"),
      10: laghu_or_dirgha(sylls, 10, "g"),
      11: laghu_or_dirgha(sylls, 11, "g"),
      //pada 2 or 2nd foot
      12: laghu_or_dirgha(sylls, 12, "g"),
      13: laghu_or_dirgha(sylls, 13, "g"),
      14: laghu_or_dirgha(sylls, 14, "l"),
      15: laghu_or_dirgha(sylls, 15, "g"),
      16: laghu_or_dirgha(sylls, 16, "g"),
      17: laghu_or_dirgha(sylls, 17, "l"),
      18: laghu_or_dirgha(sylls, 18, "l"),
      19: laghu_or_dirgha(sylls, 19, "g"),
      20: laghu_or_dirgha(sylls, 20, "l"),
      21: laghu_or_dirgha(sylls, 21, "g"),
      22: laghu_or_dirgha(sylls, 22, "g"),
    }
  }

  let content = "<table class='table res_table'><tr>"
  for (let i = 0; i < sylls.length; i++) {
    metr_val = document.getElementById('metres').value;
    content += `<td class=${metre_dict[metr_val][i + 1]}>` + vowel_type(sylls[i]) + '</td>';
  }
  content += '</tr><tr>'
  for (let i = 0; i < sylls.length; i++) {
    metr_val = document.getElementById('metres').value;
    content += `<td class=${metre_dict[metr_val][i + 1]}>` + sylls[i] + '</td>';
  }
  content += '</tr><tr>'
  for (let i = 0; i < sylls.length; i++) {
    content += '<td>' + (i + 1) + '</td>';
  }
  content += "</tr></table>"
  targetElement = document.getElementById('here_table');
  targetElement.innerHTML += content
}
function create_textare(it, txt) {
  let sylls = syllabalize(txt)
  create_table(sylls)
  resultsElement = document.getElementById('results');
  resultsElement.innerHTML += `<input id="result${it}" class="form-control result" value="${kh2dev(txt)}" type="text" readonly>`
}
function loop_objs() {
  let arrs = []
  const lis = document.getElementsByClassName('list-group-item');
  for (let i = 0; i < lis.length; i++) {
    // if word in devanagari then convert to kh
    cli = lis[i]
    var word_item = cli.querySelector(".word").value.replace(/\s\s+/g, ' ')
    if (word_item.replace(non_rom_reg, '#').indexOf('#') > -1) {
      word_item = dev2kh(word_item)
    }
    arrs.push(
      {
        "st": word_item,
        "prop": cli.querySelector(".prop").value
      }
    )
  }
  if (arrs.length == 1) {
    alert("You have only one word!! Enter one more at least.")
  }
  let result = join_all_sandhi(arrs)
  // res_sel = document.querySelector(".result")
  document.querySelectorAll('.result').forEach(e => e.remove());
  document.querySelectorAll('.res_table').forEach(e => e.remove());
  // if (res_sel)
  //   res_sel.remove()
  // res_tab = document.querySelector(".res_table")
  // if (res_tab)
  //   res_tab.remove()
  for (let i = 0; i < result.length; i++) {
    create_textare(i, result[i])
  }

}

function move(button, direction) {
  const listItem = button.parentNode.parentNode; // Get the parent li element
  if (direction == 'down') {
    nextItem = listItem.nextElementSibling;
    if (nextItem) {
      listItem.parentNode.insertBefore(nextItem, listItem);
    }
  }
  else if (direction == 'up') {
    previousItem = listItem.previousElementSibling;
    if (previousItem) {
      listItem.parentNode.insertBefore(listItem, previousItem);
    }
  }
}


function addWord(button) {
  // Create a new list item element
  var listItem = document.createElement('li');
  listItem.className = 'list-group-item';

  // Create inner elements for the list item
  var innerDiv = document.createElement('div');
  innerDiv.className = 'input-group word-div';

  // Create and append the move-up button
  var moveUpButton = document.createElement('button');
  moveUpButton.className = 'btn move-up';
  moveUpButton.textContent = '↑';
  moveUpButton.onclick = function () {
    move(this, 'up');
  };
  innerDiv.appendChild(moveUpButton);

  // Create and append the input element for word
  var wordInput = document.createElement('input');
  wordInput.type = 'text';
  wordInput.className = 'word form-control';
  wordInput.placeholder = 'enter a word';
  innerDiv.appendChild(wordInput);

  // Create a nested div for property input and delete button
  var nestedDiv = document.createElement('div');
  nestedDiv.className = 'input-group-append';
  nestedDiv.id = 'button-addon4';

  // Create and append the input element for property
  var propInput = document.createElement('input');
  propInput.type = 'text';
  propInput.className = 'prop form-control';
  propInput.placeholder = 'enter a property if applicable';
  nestedDiv.appendChild(propInput);

  // Create and append the delete button
  var deleteButton = document.createElement('button');
  deleteButton.className = 'btn btn-outline-secondary del-item';
  deleteButton.type = 'button';
  deleteButton.textContent = 'delete';
  deleteButton.onclick = function () {
    del_word(this);
  };
  nestedDiv.appendChild(deleteButton);

  // Append the nested div to the main div
  innerDiv.appendChild(nestedDiv);

  // Create and append the move-down button
  var moveDownButton = document.createElement('button');
  moveDownButton.className = 'btn move-down';
  moveDownButton.textContent = '↓';
  moveDownButton.onclick = function () {
    move(this, 'down');
  };
  innerDiv.appendChild(moveDownButton);

  // Append the inner div to the list item
  listItem.appendChild(innerDiv);

  // Append the newly created list item to the sortable1 element
  var sortable1 = document.getElementById('sortable1');
  sortable1.appendChild(listItem);

  change_color();
}

function del_word(el) {
  el.closest('.list-group-item').remove();
}

function change_color() {
  document.querySelector('.list-group-item').onclick = function (el) {
    document.querySelector('.list-group-item').style.backgroundColor = "white";
    document.querySelector('.list-group-item').classList.toggle("selected");
    if(typeof el.style != 'undefined')
      el.style.backgroundColor = "blue";
    if(typeof el.classList != 'undefined')
      el.classList.toggle('selected');
  }
}

// document.addEventListener("DOMContentLoaded", function() {
//     del_obj_event()
//     change_color()
// })
// .addEventListener('keydown', function(e) {
//     let pressed_key = e.keyCode;
//     if (pressed_key == 38) {
//         moveLeft(document.querySelector(".selected"))
//     } else if (pressed_key == 40) {
//         moveRight(document.querySelector(".selected"))
//     }
// });

function vowel_type(syll) {
  return (short_vowels.includes(syll.slice(-1))) && (!vowels.includes(syll.slice(-2, -1))) ? "l" : "g"
}
