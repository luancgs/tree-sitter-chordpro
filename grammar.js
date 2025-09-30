/**
 * @file Grammar for ChordPro specification - Optimized for performance
 * @author Luan Carlos <luancgs.dev@pm.me>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

/*
 * This grammar is based on the ChordPro specification version 6.070
 * For more information, please refer to the official documentation:
 * https://www.chordpro.org/chordpro/chordpro-directives/
 *
 * Optimized for performance and robustness:
 * - Bounded text matching to prevent OOM
 * - Error recovery for incomplete constructs
 * - Reduced backtracking potential
 * - Line-based parsing boundaries
 */

module.exports = grammar({
  name: "chordpro",

  extras: ($) => [/[ \t]/],

  rules: {
    song: ($) => repeat($.line),

    line: ($) => choice(seq($.content, /\r?\n/), /\r?\n/),

    content: ($) => choice($.directive, $.song_content),

    song_content: ($) => repeat1(choice($.chord, $.text_segment)),

    chord: ($) =>
      choice(seq("[", optional($.chord_content), "]"), $.incomplete_chord),

    chord_content: ($) => token(prec(1, /[^\]\r\n]{1,8}/)),
    incomplete_chord: ($) => seq("[", token(prec(-1, /[^\]\r\n]{0,8}/))),

    text_segment: ($) => token(prec(1, /[^{}\[\r\n]+/)),

    directive: ($) => choice($.complete_directive, $.incomplete_directive),

    complete_directive: ($) =>
      seq(
        "{",
        choice(
          $.title_directive,
          $.subtitle_directive,
          $.artist_directive,
          $.composer_directive,
          $.lyricist_directive,
          $.copyright_directive,
          $.album_directive,
          $.year_directive,
          $.key_directive,
          $.time_directive,
          $.tempo_directive,
          $.duration_directive,
          $.capo_directive,
          $.tag_directive,
          $.meta_directive,

          $.comment_directive,
          $.highlight_directive,
          $.comment_italic_directive,
          $.comment_box_directive,
          $.image_directive,

          $.chorus_directive,
          $.start_of_chorus_directive,
          $.end_of_chorus_directive,
          $.start_of_verse_directive,
          $.end_of_verse_directive,
          $.start_of_bridge_directive,
          $.end_of_bridge_directive,
          $.start_of_tab_directive,
          $.end_of_tab_directive,
          $.start_of_grid_directive,
          $.end_of_grid_directive,

          $.start_of_abc_directive,
          $.end_of_abc_directive,
          $.start_of_ly_directive,
          $.end_of_ly_directive,
          $.start_of_svg_directive,
          $.end_of_svg_directive,
          $.start_of_textblock_directive,
          $.end_of_textblock_directive,

          $.define_directive,
          $.chord_directive,

          $.transpose_directive,

          $.chordfont_directive,
          $.chordsize_directive,
          $.chordcolour_directive,
          $.chorusfont_directive,
          $.chorussize_directive,
          $.choruscolour_directive,
          $.footerfont_directive,
          $.footersize_directive,
          $.footercolour_directive,
          $.gridfont_directive,
          $.gridsize_directive,
          $.gridcolour_directive,
          $.tabfont_directive,
          $.tabsize_directive,
          $.tabcolour_directive,
          $.labelfont_directive,
          $.labelsize_directive,
          $.labelcolour_directive,
          $.tocfont_directive,
          $.tocsize_directive,
          $.toccolour_directive,
          $.textfont_directive,
          $.textsize_directive,
          $.textcolour_directive,
          $.titlefont_directive,
          $.titlesize_directive,
          $.titlecolour_directive,

          $.new_page_directive,
          $.new_physic_page_directive,
          $.column_break_directive,
          $.pagetype_directive,

          $.diagrams_directive,
          $.grid_directive,
          $.no_grid_directive,
          $.titles_directive,
          $.columns_directive,
        ),
        "}",
      ),

    incomplete_directive: ($) =>
      seq("{", optional(token(prec(-1, /[^}\r\n]{0,100}/)))),

    title_directive: ($) =>
      choice(seq("title", ":", $.bounded_text), seq("t", ":", $.bounded_text)),
    subtitle_directive: ($) =>
      choice(
        seq("subtitle", ":", $.bounded_text),
        seq("st", ":", $.bounded_text),
      ),
    artist_directive: ($) => seq("artist", ":", $.bounded_text),
    composer_directive: ($) => seq("composer", ":", $.bounded_text),
    lyricist_directive: ($) => seq("lyricist", ":", $.bounded_text),
    copyright_directive: ($) => seq("copyright", ":", $.bounded_text),
    album_directive: ($) => seq("album", ":", $.bounded_text),
    year_directive: ($) => seq("year", ":", $.number),
    key_directive: ($) => seq("key", ":", $.bounded_text),
    time_directive: ($) => seq("time", ":", $.bounded_text),
    tempo_directive: ($) => seq("tempo", ":", $.bounded_text),
    duration_directive: ($) =>
      choice(
        seq("duration", ":", $.bounded_text),
        seq("duration", ":", $.number),
      ),
    capo_directive: ($) => seq("capo", ":", $.number),
    tag_directive: ($) => seq("tag", ":", $.bounded_text),
    meta_directive: ($) => seq("meta", ":", $.bounded_text),

    comment_directive: ($) =>
      choice(
        seq("comment", ":", $.bounded_text),
        seq("c", ":", $.bounded_text),
      ),
    highlight_directive: ($) => seq("highlight", ":", $.bounded_text),
    comment_italic_directive: ($) =>
      choice(
        seq("comment_italic", ":", $.bounded_text),
        seq("ci", ":", $.bounded_text),
      ),
    comment_box_directive: ($) =>
      choice(
        seq("comment_box", ":", $.bounded_text),
        seq("cb", ":", $.bounded_text),
      ),
    image_directive: ($) => seq("image", ":", $.bounded_text),

    chorus_directive: ($) =>
      choice("chorus", seq("chorus", ":", $.bounded_text)),
    start_of_chorus_directive: ($) =>
      choice(
        "start_of_chorus",
        seq("start_of_chorus", ":", $.bounded_text),
        "soc",
        seq("soc", ":", $.bounded_text),
      ),
    end_of_chorus_directive: ($) => choice("end_of_chorus", "eoc"),

    start_of_verse_directive: ($) =>
      choice(
        "start_of_verse",
        seq("start_of_verse", ":", $.bounded_text),
        "sov",
        seq("sov", ":", $.bounded_text),
      ),
    end_of_verse_directive: ($) => choice("end_of_verse", "eov"),

    start_of_bridge_directive: ($) =>
      choice(
        "start_of_bridge",
        seq("start_of_bridge", ":", $.bounded_text),
        "sob",
        seq("sob", ":", $.bounded_text),
      ),
    end_of_bridge_directive: ($) => choice("end_of_bridge", "eob"),

    start_of_tab_directive: ($) =>
      choice(
        "start_of_tab",
        seq("start_of_tab", ":", $.bounded_text),
        "sot",
        seq("sot", ":", $.bounded_text),
      ),
    end_of_tab_directive: ($) => choice("end_of_tab", "eot"),

    start_of_grid_directive: ($) =>
      choice(
        "start_of_grid",
        seq("start_of_grid", ":", $.bounded_text),
        "sog",
        seq("sog", ":", $.bounded_text),
      ),
    end_of_grid_directive: ($) => choice("end_of_grid", "eog"),

    start_of_abc_directive: ($) =>
      choice("start_of_abc", seq("start_of_abc", ":", $.bounded_text)),
    end_of_abc_directive: ($) => token("end_of_abc"),
    start_of_ly_directive: ($) =>
      choice("start_of_ly", seq("start_of_ly", ":", $.bounded_text)),
    end_of_ly_directive: ($) => token("end_of_ly"),
    start_of_svg_directive: ($) => token("start_of_svg"),
    end_of_svg_directive: ($) => token("end_of_svg"),
    start_of_textblock_directive: ($) => token("start_of_textblock"),
    end_of_textblock_directive: ($) => token("end_of_textblock"),

    define_directive: ($) =>
      seq(
        "define",
        ":",
        $.chord_name,
        "base-fret",
        $.number,
        "frets",
        $.fret_sequence,
        optional(seq("fingers", $.finger_sequence)),
      ),
    chord_directive: ($) =>
      choice(
        seq(
          "chord",
          ":",
          $.chord_name,
          "base-fret",
          $.number,
          "frets",
          $.fret_sequence,
          optional(seq("fingers", $.finger_sequence)),
        ),
        seq("chord", ":", $.chord_name),
      ),

    transpose_directive: ($) => seq("transpose", ":", $.bounded_text),

    chordfont_directive: ($) => seq("chordfont", ":", $.bounded_text),
    chordsize_directive: ($) => seq("chordsize", ":", $.number),
    chordcolour_directive: ($) =>
      choice(
        seq("chordcolour", ":", $.bounded_text),
        seq("chordcolor", ":", $.bounded_text),
      ),
    chorusfont_directive: ($) => seq("chorusfont", ":", $.bounded_text),
    chorussize_directive: ($) => seq("chorussize", ":", $.number),
    choruscolour_directive: ($) =>
      choice(
        seq("choruscolour", ":", $.bounded_text),
        seq("choruscolor", ":", $.bounded_text),
      ),
    footerfont_directive: ($) => seq("footerfont", ":", $.bounded_text),
    footersize_directive: ($) => seq("footersize", ":", $.number),
    footercolour_directive: ($) =>
      choice(
        seq("footercolour", ":", $.bounded_text),
        seq("footercolor", ":", $.bounded_text),
      ),
    gridfont_directive: ($) => seq("gridfont", ":", $.bounded_text),
    gridsize_directive: ($) => seq("gridsize", ":", $.number),
    gridcolour_directive: ($) =>
      choice(
        seq("gridcolour", ":", $.bounded_text),
        seq("gridcolor", ":", $.bounded_text),
      ),
    tabfont_directive: ($) => seq("tabfont", ":", $.bounded_text),
    tabsize_directive: ($) => seq("tabsize", ":", $.number),
    tabcolour_directive: ($) =>
      choice(
        seq("tabcolour", ":", $.bounded_text),
        seq("tabcolor", ":", $.bounded_text),
      ),
    labelfont_directive: ($) => seq("labelfont", ":", $.bounded_text),
    labelsize_directive: ($) => seq("labelsize", ":", $.number),
    labelcolour_directive: ($) =>
      choice(
        seq("labelcolour", ":", $.bounded_text),
        seq("labelcolor", ":", $.bounded_text),
      ),
    tocfont_directive: ($) => seq("tocfont", ":", $.bounded_text),
    tocsize_directive: ($) => seq("tocsize", ":", $.number),
    toccolour_directive: ($) =>
      choice(
        seq("toccolour", ":", $.bounded_text),
        seq("toccolor", ":", $.bounded_text),
      ),
    textfont_directive: ($) => seq("textfont", ":", $.bounded_text),
    textsize_directive: ($) => seq("textsize", ":", $.number),
    textcolour_directive: ($) =>
      choice(
        seq("textcolour", ":", $.bounded_text),
        seq("textcolor", ":", $.bounded_text),
      ),
    titlefont_directive: ($) => seq("titlefont", ":", $.bounded_text),
    titlesize_directive: ($) => seq("titlesize", ":", $.number),
    titlecolour_directive: ($) =>
      choice(
        seq("titlecolour", ":", $.bounded_text),
        seq("titlecolor", ":", $.bounded_text),
      ),

    new_page_directive: ($) => choice("new_page", "np"),
    new_physic_page_directive: ($) => choice("new_physical_page", "npp"),
    column_break_directive: ($) => choice("column_break", "colb"),
    pagetype_directive: ($) => seq("pagetype", ":", $.bounded_text),

    diagrams_directive: ($) => seq("diagrams", ":", $.bounded_text),
    grid_directive: ($) => "grid",
    no_grid_directive: ($) => "no_grid",
    titles_directive: ($) => seq("titles", ":", $.titles_option),
    columns_directive: ($) =>
      choice(seq("columns", ":", $.number), seq("col", ":", $.number)),

    bounded_text: ($) => token(prec(1, /[^{}\r\n]{1,200}/)),
    number: ($) => token(/\d+/),

    chord_name: ($) => token(/[^\s{}]{1,10}/),
    fret_sequence: ($) => token(/[\dxX\-N\s]{1,50}/),
    finger_sequence: ($) => token(/[\d\-\s]{1,20}/),
    titles_option: ($) => token(choice("left", "right", "center")),
  },
});
