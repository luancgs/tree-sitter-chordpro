package tree_sitter_chordpro_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_chordpro "github.com/luancgs/tree-sitter-chordpro/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_chordpro.Language())
	if language == nil {
		t.Errorf("Error loading ChordPro grammar")
	}
}
