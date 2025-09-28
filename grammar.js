/**
 * @file Grammar for ChordPro specification
 * @author Luan Carlos <luancgs.dev@pm.me>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

/*
 * This grammar is based on the ChordPro specification version 6.070
 * For more information, please refer to the official documentation:
 * https://www.chordpro.org/chordpro/chordpro-directives/
 */

module.exports = grammar({
  name: "chordpro",

  conflicts: ($) => [
    [$.content_line]
  ],

  rules: {
    song: ($) => repeat(choice($.directive, $.song_line)),

    song_line: ($) => choice($.content_line, $.empty_line),

    content_line: ($) => repeat1(choice($.chord, $.lyric)),
    empty_line: ($) => /\r?\n/,

    chord: ($) => seq("[", /[^\]]+/, "]"),
    lyric: ($) => /[^{}\[\r\n]+/,

    directive: ($) => choice(
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

    title_directive: ($) => choice(
      seq("{", "title", ":", $.space, $.text, "}"),
      seq("{", "t", ":", $.space, $.text, "}"),
    ),
    subtitle_directive: ($) => choice(
      seq("{", "subtitle", ":", $.space, $.text, "}"),
      seq("{", "st", ":", $.space, $.text, "}"),
    ),
    artist_directive: ($) => seq("{", "artist", ":", $.space, $.text, "}"),
    composer_directive: ($) => seq("{", "composer", ":", $.space, $.text, "}"),
    lyricist_directive: ($) => seq("{", "lyricist", ":", $.space, $.text, "}"),
    copyright_directive: ($) => seq("{", "copyright", ":", $.space, $.text, "}"),
    album_directive: ($) => seq("{", "album", ":", $.space, $.text, "}"),
    year_directive: ($) => seq("{", "year", ":", $.space, $.number, "}"),
    key_directive: ($) => seq("{", "key", ":", $.space, $.text, "}"),
    time_directive: ($) => seq("{", "time", ":", $.space, $.text, "}"),
    tempo_directive: ($) => seq("{", "tempo", ":", $.space, $.text, "}"),
    duration_directive: ($) => choice(
      seq("{", "duration", ":", $.space, $.text, "}"),
      seq("{", "duration", ":", $.space, $.number, "}"),
    ),
    capo_directive: ($) => seq("{", "capo", ":", $.space, $.number, "}"),
    tag_directive: ($) => seq("{", "tag", ":", $.space, $.text, "}"),
    meta_directive: ($) => seq("{", "meta", ":", $.space, $.text, "}"),

    comment_directive: ($) => choice(
      seq("{", "comment", ":", $.space, $.text, "}"),
      seq("{", "c", ":", $.space, $.text, "}"),
    ),
    highlight_directive: ($) => seq("{", "highlight", ":", $.space, $.text, "}"),
    comment_italic_directive: ($) => choice(
      seq("{", "comment_italic", ":", $.space, $.text, "}"),
      seq("{", "ci", ":", $.space, $.text, "}"),
    ),
    comment_box_directive: ($) => choice(
      seq("{", "comment_box", ":", $.space, $.text, "}"),
      seq("{", "cb", ":", $.space, $.text, "}"),
    ),
    image_directive: ($) => seq("{", "image", ":", $.space, $.text, "}"),

    chorus_directive: ($) => choice(
      seq("{", "chorus", "}"),
      seq("{", "chorus", ":", $.space, $.text, "}"),
    ),
    start_of_chorus_directive: ($) => choice(
      seq("{", "start_of_chorus", "}"),
      seq("{", "start_of_chorus", ":", $.space, $.text, "}"),
      seq("{", "soc", "}"),
      seq("{", "soc", ":", $.space, $.text, "}"),
    ),
    end_of_chorus_directive: ($) => choice(
      seq("{", "end_of_chorus", "}"),
      seq("{", "eoc", "}"),
    ),
    start_of_verse_directive: ($) => choice(
      seq("{", "start_of_verse", "}"),
      seq("{", "start_of_verse", ":", $.space, $.text, "}"),
      seq("{", "sov", "}"),
      seq("{", "sov", ":", $.space, $.text, "}"),
    ),
    end_of_verse_directive: ($) => choice(
      seq("{", "end_of_verse", "}"),
      seq("{", "eov", "}"),
    ),
    start_of_bridge_directive: ($) => choice(
      seq("{", "start_of_bridge", "}"),
      seq("{", "start_of_bridge", ":", $.space, $.text, "}"),
      seq("{", "sob", "}"),
      seq("{", "sob", ":", $.space, $.text, "}"),
    ),
    end_of_bridge_directive: ($) => choice(
      seq("{", "end_of_bridge", "}"),
      seq("{", "eob", "}"),
    ),
    start_of_tab_directive: ($) => choice(
      seq("{", "start_of_tab", "}"),
      seq("{", "start_of_tab", ":", $.space, $.text, "}"),
      seq("{", "sot", "}"),
      seq("{", "sot", ":", $.space, $.text, "}"),
    ),
    end_of_tab_directive: ($) => choice(
      seq("{", "end_of_tab", "}"),
      seq("{", "eot", "}"),
    ),
    start_of_grid_directive: ($) => choice(
      seq("{", "start_of_grid", "}"),
      seq("{", "start_of_grid", ":", $.space, $.text, "}"),
      seq("{", "sog", "}"),
      seq("{", "sog", ":", $.space, $.text, "}"),
    ),
    end_of_grid_directive: ($) => choice(
      seq("{", "end_of_grid", "}"),
      seq("{", "eog", "}"),
    ),

    start_of_abc_directive: ($) => choice(
      seq("{", "start_of_abc", "}"),
      seq("{", "start_of_abc", ":", $.space, $.text, "}"),
    ),
    end_of_abc_directive: ($) => seq("{", "end_of_abc", "}"),
    start_of_ly_directive: ($) => choice(
      seq("{", "start_of_ly", "}"),
      seq("{", "start_of_ly", ":", $.space, $.text, "}"),
    ),
    end_of_ly_directive: ($) => seq("{", "end_of_ly", "}"),
    start_of_svg_directive: ($) => seq("{", "start_of_svg", "}"),
    end_of_svg_directive: ($) => seq("{", "end_of_svg", "}"),
    start_of_textblock_directive: ($) => seq("{", "start_of_textblock", "}"),
    end_of_textblock_directive: ($) => seq("{", "end_of_textblock", "}"),

    define_directive: ($) => seq("{", "define", ":", $.space, $.chord_name, $.space, "base-fret", $.space, $.number, $.space, "frets", $.space, $.fret_sequence, optional(seq($.space, "fingers", $.space, $.finger_sequence)), "}"),
    chord_directive: ($) => choice(
      seq( "{", "chord", ":", $.space, $.chord_name, $.space, "base-fret", $.space, $.number, $.space, "frets", $.space, $.fret_sequence, optional(seq($.space, "fingers", $.space, $.finger_sequence)), "}"),
      seq("{", "chord", ":", $.space, $.chord_name, "}"),
    ),

    transpose_directive: ($) => seq("{", "transpose", ":", $.space, $.text, "}"),

    chordfont_directive: ($) => seq("{", "chordfont", ":", $.space, $.text, "}"),
    chordsize_directive: ($) => seq("{", "chordsize", ":", $.space, $.number, "}"),
    chordcolour_directive: ($) => choice(
      seq("{", "chordcolour", ":", $.space, $.text, "}"),
      seq("{", "chordcolor", ":", $.space, $.text, "}"),
    ),
    chorusfont_directive: ($) => seq("{", "chorusfont", ":", $.space, $.text, "}"),
    chorussize_directive: ($) => seq("{", "chorussize", ":", $.space, $.number, "}"),
    choruscolour_directive: ($) => choice(
      seq("{", "choruscolour", ":", $.space, $.text, "}"),
      seq("{", "choruscolor", ":", $.space, $.text, "}"),
    ),
    footerfont_directive: ($) => seq("{", "footerfont", ":", $.space, $.text, "}"),
    footersize_directive: ($) => seq("{", "footersize", ":", $.space, $.number, "}"),
    footercolour_directive: ($) => choice(
      seq("{", "footercolour", ":", $.space, $.text, "}"),
      seq("{", "footercolor", ":", $.space, $.text, "}"),
    ),
    gridfont_directive: ($) => seq("{", "gridfont", ":", $.space, $.text, "}"),
    gridsize_directive: ($) => seq("{", "gridsize", ":", $.space, $.number, "}"),
    gridcolour_directive: ($) => choice(
      seq("{", "gridcolour", ":", $.space, $.text, "}"),
      seq("{", "gridcolor", ":", $.space, $.text, "}"),
    ),
    tabfont_directive: ($) => seq("{", "tabfont", ":", $.space, $.text, "}"),
    tabsize_directive: ($) => seq("{", "tabsize", ":", $.space, $.number, "}"),
    tabcolour_directive: ($) => choice(
      seq("{", "tabcolour", ":", $.space, $.text, "}"),
      seq("{", "tabcolor", ":", $.space, $.text, "}"),
    ),
    labelfont_directive: ($) => seq("{", "labelfont", ":", $.space, $.text, "}"),
    labelsize_directive: ($) => seq("{", "labelsize", ":", $.space, $.number, "}"),
    labelcolour_directive: ($) => choice(
      seq("{", "labelcolour", ":", $.space, $.text, "}"),
      seq("{", "labelcolor", ":", $.space, $.text, "}"),
    ),
    tocfont_directive: ($) => seq("{", "tocfont", ":", $.space, $.text, "}"),
    tocsize_directive: ($) => seq("{", "tocsize", ":", $.space, $.number, "}"),
    toccolour_directive: ($) => choice(
        seq("{", "toccolour", ":", $.space, $.text, "}"),
        seq("{", "toccolor", ":", $.space, $.text, "}"),
      ),
    textfont_directive: ($) => seq("{", "textfont", ":", $.space, $.text, "}"),
    textsize_directive: ($) => seq("{", "textsize", ":", $.space, $.number, "}"),
    textcolour_directive: ($) => choice(
      seq("{", "textcolour", ":", $.space, $.text, "}"),
      seq("{", "textcolor", ":", $.space, $.text, "}"),
    ),
    titlefont_directive: ($) => seq("{", "titlefont", ":", $.space, $.text, "}"),
    titlesize_directive: ($) => seq("{", "titlesize", ":", $.space, $.number, "}"),
    titlecolour_directive: ($) => choice(
      seq("{", "titlecolour", ":", $.space, $.text, "}"),
      seq("{", "titlecolor", ":", $.space, $.text, "}"),
    ),

    new_page_directive: ($) => choice(
      seq("{", "new_page", "}"),
      seq("{", "np", "}"),
    ),
    new_physic_page_directive: ($) => choice(
      seq("{", "new_physical_page", "}"),
      seq("{", "npp", "}"),
    ),
    column_break_directive: ($) => choice(
      seq("{", "column_break", "}"),
      seq("{", "colb", "}"),
    ),
    pagetype_directive: ($) => seq("{", "pagetype", ":", $.space, $.text, "}"),

    diagrams_directive: ($) => seq("{", "diagrams", ":", $.space, $.text, "}"),
    grid_directive: ($) => seq("{", "grid", "}"),
    no_grid_directive: ($) => seq("{", "no_grid", "}"),
    titles_directive: ($) => seq("{", "titles", ":", $.space, $.titles_option, "}"),

    columns_directive: ($) => choice(
      seq("{", "columns", ":", $.space, $.number, "}"),
      seq("{", "col", ":", $.space, $.number, "}"),
    ),

    text: () => /[^{}]+/,
    number: () => /\d+/,
    space: () => /\s/,

    chord_name: () => /\S+/,
    fret_sequence: () => /[\dxX\-N\s]+/,
    finger_sequence: () => /[\d\-\s]+/,
    titles_option: () => /left|right|center/,
  },
});
