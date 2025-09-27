/**
 * @file Grammar for ChordPro specification
 * @author Luan Carlos <luancgs.dev@pm.me>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "chordpro",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
