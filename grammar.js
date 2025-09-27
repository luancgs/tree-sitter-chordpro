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

function default_directive($, name, value) {
  if (!value) {
    return seq("{", name, "}");
  }
  
  return seq("{", name, ":", $.space, value, "}");
}

function default_directive_with_alias($, names, value) {
  return choice(...names.map((name) => default_directive($, name, value)));
}

module.exports = grammar({
  name: "chordpro",
  
  conflicts: $ => [
    [$.content_line]
  ],

  rules: {
    song: ($) => repeat(choice($.directive, $.song_line)),

    song_line: ($) => choice(
      $.content_line,
      $.empty_line
    ),
    
    content_line: ($) => repeat1(choice($.chord, $.lyric)),
    empty_line: ($) => /\s*/,

    chord: ($) => seq("[", /[^\]]+/, "]"),
    lyric: ($) => /[^\[\n]+/,

    directive: ($) =>
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

    title_directive: ($) => default_directive_with_alias($, ["title", "t"], $.directive_arguments),
    subtitle_directive: ($) => default_directive_with_alias($, ["subtitle", "st"], $.directive_arguments),
    artist_directive: ($) => default_directive($, "artist", $.directive_arguments),
    composer_directive: ($) => default_directive($, "composer", $.directive_arguments),
    lyricist_directive: ($) => default_directive($, "lyricist", $.directive_arguments),
    copyright_directive: ($) => default_directive($, "copyright", $.directive_arguments),
    album_directive: ($) => default_directive($, "album", $.directive_arguments),
    year_directive: ($) => default_directive($, "year", $.directive_arguments),
    key_directive: ($) => default_directive($, "key", $.directive_arguments),
    time_directive: ($) => default_directive($, "time", $.directive_arguments),
    tempo_directive: ($) => default_directive($, "tempo", $.directive_arguments),
    duration_directive: ($) => default_directive($, "duration", $.directive_arguments),
    capo_directive: ($) => default_directive($, "capo", $.directive_arguments),
    tag_directive: ($) => default_directive($, "tag", $.directive_arguments),
    meta_directive: ($) => default_directive($, "meta", $.directive_arguments),

    comment_directive: ($) => default_directive_with_alias($, ["comment", "c"], $.directive_arguments),
    highlight_directive: ($) => default_directive($, "highlight", $.directive_arguments),
    comment_italic_directive: ($) => default_directive_with_alias($, ["comment_italic", "ci"], $.directive_arguments),
    comment_box_directive: ($) => default_directive_with_alias($, ["comment_box", "cb"], $.directive_arguments),
    image_directive: ($) => default_directive($, "image", $.directive_arguments),

    chorus_directive: ($) => default_directive($, "chorus", optional($.directive_arguments)),
    start_of_chorus_directive: ($) => default_directive_with_alias($, ["start_of_chorus", "soc"], optional($.directive_arguments)),
    end_of_chorus_directive: ($) => default_directive_with_alias($, ["end_of_chorus", "eoc"]),
    start_of_verse_directive: ($) => default_directive_with_alias($, ["start_of_verse", "sov"], optional($.directive_arguments)),
    end_of_verse_directive: ($) => default_directive_with_alias($, ["end_of_verse", "eov"]),
    start_of_bridge_directive: ($) => default_directive_with_alias($, ["start_of_bridge", "sob"], optional($.directive_arguments)),
    end_of_bridge_directive: ($) => default_directive_with_alias($, ["end_of_bridge", "eob"]),
    start_of_tab_directive: ($) => default_directive_with_alias($, ["start_of_tab", "sot"], optional($.directive_arguments)),
    end_of_tab_directive: ($) => default_directive_with_alias($, ["end_of_tab", "eot"]),
    start_of_grid_directive: ($) => default_directive_with_alias($, ["start_of_grid", "sog"], optional($.directive_arguments)),
    end_of_grid_directive: ($) => default_directive_with_alias($, ["end_of_grid", "eog"]),

    start_of_abc_directive: ($) => default_directive($, "start_of_abc", optional($.directive_arguments)),
    end_of_abc_directive: ($) => default_directive($, "end_of_abc"),
    start_of_ly_directive: ($) => default_directive($, "start_of_ly", optional($.directive_arguments)),
    end_of_ly_directive: ($) => default_directive($, "end_of_ly"),
    start_of_svg_directive: ($) => default_directive($, "start_of_svg"),
    end_of_svg_directive: ($) => default_directive($, "end_of_svg"),
    start_of_textblock_directive: ($) => default_directive($, "start_of_textblock"),
    end_of_textblock_directive: ($) => default_directive($, "end_of_textblock"),

    define_directive: ($) =>  seq("{", "define", ":", $.space, $.chord_name, $.space, "base-fret", $.space, $.fret_number, $.space, "frets", $.space, $.fret_sequence, optional(seq($.space, "fingers", $.space, $.finger_sequence)),"}"),
    chord_directive: ($) => choice(
      seq("{", "chord", ":", $.space, $.chord_name, $.space, "base-fret", $.space, $.fret_number, $.space, "frets", $.space, $.fret_sequence, optional(seq($.space, "fingers", $.space, $.finger_sequence)), "}"),
      seq("{", "chord", ":", $.space, $.chord_name, "}"),
    ),

    transpose_directive: ($) => default_directive($, "transpose", $.directive_arguments),

    chordfont_directive: ($) => default_directive($, "chordfont", $.directive_arguments),
    chordsize_directive: ($) => default_directive($, "chordsize", $.directive_arguments),
    chordcolour_directive: ($) => default_directive_with_alias($, ["chordcolour", "chordcolor"], $.directive_arguments),
    chorusfont_directive: ($) => default_directive($, "chorusfont", $.directive_arguments),
    chorussize_directive: ($) => default_directive($, "chorussize", $.directive_arguments),
    choruscolour_directive: ($) => default_directive_with_alias($, ["choruscolour", "choruscolor"], $.directive_arguments),
    footerfont_directive: ($) => default_directive($, "footerfont", $.directive_arguments),
    footersize_directive: ($) => default_directive($, "footersize", $.directive_arguments),
    footercolour_directive: ($) => default_directive_with_alias($, ["footercolour", "footercolor"], $.directive_arguments),
    gridfont_directive: ($) => default_directive($, "gridfont", $.directive_arguments),
    gridsize_directive: ($) => default_directive($, "gridsize", $.directive_arguments),
    gridcolour_directive: ($) => default_directive_with_alias($, ["gridcolour", "gridcolor"], $.directive_arguments),
    tabfont_directive: ($) => default_directive($, "tabfont", $.directive_arguments),
    tabsize_directive: ($) => default_directive($, "tabsize", $.directive_arguments),
    tabcolour_directive: ($) => default_directive_with_alias($, ["tabcolour", "tabcolor"], $.directive_arguments),
    labelfont_directive: ($) => default_directive($, "labelfont", $.directive_arguments),
    labelsize_directive: ($) => default_directive($, "labelsize", $.directive_arguments),
    labelcolour_directive: ($) => default_directive_with_alias($, ["labelcolour", "labelcolor"], $.directive_arguments),
    tocfont_directive: ($) => default_directive($, "tocfont", $.directive_arguments),
    tocsize_directive: ($) => default_directive($, "tocsize", $.directive_arguments),
    toccolour_directive: ($) => default_directive_with_alias($, ["toccolour", "toccolor"], $.directive_arguments),
    textfont_directive: ($) => default_directive($, "textfont", $.directive_arguments),
    textsize_directive: ($) => default_directive($, "textsize", $.directive_arguments),
    textcolour_directive: ($) => default_directive_with_alias($, ["textcolour", "textcolor"], $.directive_arguments),
    titlefont_directive: ($) => default_directive($, "titlefont", $.directive_arguments),
    titlesize_directive: ($) => default_directive($, "titlesize", $.directive_arguments),
    titlecolour_directive: ($) => default_directive_with_alias($, ["titlecolour", "titlecolor"], $.directive_arguments),

    new_page_directive: ($) => default_directive_with_alias($, ["new_page", "np"]),
    new_physic_page_directive: ($) => default_directive_with_alias($, ["new_physical_page", "npp"]),
    column_break_directive: ($) => default_directive_with_alias($, ["column_break", "colb"]),
    pagetype_directive: ($) => default_directive($, "pagetype", $.directive_arguments),

    diagrams_directive: ($) => default_directive($, "diagrams", $.directive_arguments),
    grid_directive: ($) => default_directive($, "grid"),
    no_grid_directive: ($) => default_directive($, "no_grid"),
    titles_directive: ($) => default_directive($, "titles", $.directive_arguments),
    columns_directive: ($) => default_directive_with_alias($, ["columns", "col"], $.directive_arguments),

    directive_arguments: () => /[^{}]+/,
    space: () => /\s/,
    chord_name: () => /\S+/,
    fret_number: () => /\d+/,
    fret_sequence: () => /[\dxX\-N\s]+/,
    finger_sequence: () => /[\d\-\s]+/,
  },
});
