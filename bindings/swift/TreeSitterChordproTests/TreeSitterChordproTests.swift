import XCTest
import SwiftTreeSitter
import TreeSitterChordpro

final class TreeSitterChordproTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_chordpro())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading ChordPro grammar")
    }
}
