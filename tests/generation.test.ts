// const sum = require('./sum');
import { Parser } from "src/services/parser";
import { Regex } from "src/conf/regex";
import { readFileSync } from "fs";
import { join } from "path";
import { defaultSettings } from "src/conf/settings";

describe("Flashcard generation from markdown notes", () => {
  const mockSettings = defaultSettings;
  const regex = new Regex(mockSettings);
  const parser = new Parser(regex, mockSettings);

  // Mock the browser-dependent methods
  parser["getEmbedMap"] = jest.fn().mockReturnValue(new Map());
  parser["getEmbedWrapContent"] = jest.fn().mockImplementation((map, content) => content);

  test("generates basic flashcards with tag", () => {
    // Read test file
    const filePath = join(__dirname, "obsidian_vault", "test_flashcard_1.md");
    const fileContent = readFileSync(filePath, "utf8");
    // Process file
    const cards = parser.generateFlashcards(
      fileContent,
      "Test Deck",
      "Test Vault",
      "basic_flashcards",
      [],
    );
    // Assertions
    expect(cards.length).toBeGreaterThan(0);
    expect(cards[0].fields.Front).toContain("<p>Question</p>");
    expect(cards[0].fields.Back).toContain("<p>Answer</p>");
  });
});
