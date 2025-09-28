# Tree-sitter ChordPro

A [Tree-sitter](https://tree-sitter.github.io/) grammar for the [ChordPro](https://www.chordpro.org/) specification, providing syntax highlighting and parsing capabilities for chord sheets and lyrics.

## About ChordPro

ChordPro is a simple text format for writing chord sheets. It uses chord names enclosed in square brackets `[C]` placed above lyrics, along with various directives enclosed in curly braces `{title: Song Title}` for metadata and formatting.

Example ChordPro file:
```chordpro
{title: Amazing Grace}
{artist: Traditional}
{key: G}

{start_of_verse}
[G]Amazing [G7]grace how [C]sweet the [G]sound
That [G]saved a [Em]wretch like [D]me
[G]I [G7]once was [C]lost but [G]now I'm [Em]found
Was [G]blind but [D]now I [G]see
{end_of_verse}

{start_of_chorus}
'Twas [G]grace that [G7]taught my [C]heart to [G]fear
And [G]grace my [Em]fears re[D]lieved
[G]How [G7]precious [C]did that [G]grace ap[Em]pear
The [G]hour I [D]first be[G]lieved
{end_of_chorus}
```

## Features

This grammar supports the full ChordPro specification version 6.070, including:

- **Chords**: `[Am]`, `[C7]`, `[F#dim]` - chord notation in square brackets
- **Lyrics**: Plain text lyrics intermixed with chords
- **Metadata directives**: `{title}`, `{artist}`, `{key}`, etc.
- **Formatting directives**: `{comment}`, `{highlight}`, `{new_page}`, etc.
- **Environment directives**: `{start_of_verse}`, `{start_of_chorus}`, etc.
- **Chord definitions**: `{define}` and `{chord}` directives
- **Typography directives**: Font, size, and color specifications
- **Mixed content lines**: Lines containing both chords and lyrics
- **Empty lines**: Proper handling of whitespace and line breaks

## Building

```bash
# Generate parser
tree-sitter generate

# Run tests
tree-sitter test

# Test parsing on a file
tree-sitter parse examples/example.chordpro
```

## Grammar Structure

The grammar defines these main node types:

- `song` - Root node containing all content
- `song_line` - Individual lines (content or empty)
- `content_line` - Lines with chords and/or lyrics
- `chord` - Chord notation in square brackets
- `lyric` - Plain text lyrics
- `directive` - Various ChordPro directives
- `empty_line` - Whitespace-only lines

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Related Projects

- [ChordPro](https://www.chordpro.org/) - The official ChordPro implementation
- [Tree-sitter](https://tree-sitter.github.io/) - The parsing framework

## References

- [odelljl's ChordPro Parser](https://github.com/odelljl/tree-sitter-chordpro)
- [ChordPro Directives](https://www.chordpro.org/chordpro/chordpro-directives/)
- [Tree-sitter Documentation](https://tree-sitter.github.io/tree-sitter/creating-parsers/)
