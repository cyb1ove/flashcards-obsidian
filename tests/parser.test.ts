import { Parser } from "src/services/parser";
import { Regex } from "src/conf/regex";
import { defaultSettings } from "src/conf/settings";

describe("Flashcard Parser", () => {
  let parser: Parser;
  let regex: Regex;
  const settings = { ...defaultSettings };
  const testVault = "TestVault";
  const testNote = "test-note";
  const testDeck = "TestDeck";

  beforeEach(() => {
    regex = new Regex(settings);
    parser = new Parser(regex, settings);
  });

  describe("Basic Text Formatting", () => {
    it("should handle basic markdown formatting", () => {
      const input = `What is **bold1** or __bold2__ text? #card
                     *Italic1* or _Italic2_ text with ~~strikethrough~~ `;

      const cards = parser.generateFlashcards(input, testDeck, testVault, testNote);

      expect(cards).toHaveLength(1);
      expect(cards[0].fields.Front).toContain("<strong>bold1</strong>");
      expect(cards[0].fields.Front).toContain("<strong>bold2</strong>");
      expect(cards[0].fields.Back).toContain("<em>Italic1</em>");
      expect(cards[0].fields.Back).toContain("<em>Italic2</em>");
      expect(cards[0].fields.Back).toContain("<del>strikethrough</del>");
    });

    it("should handle inline code", () => {
      const input = `What is \`console.log()\`? #card
A JavaScript function for logging`;

      const cards = parser.generateFlashcards(input, testDeck, testVault, testNote);

      expect(cards).toHaveLength(1);
      expect(cards[0].fields.Front).toContain("<code>console.log()</code>");
    });

    it("should handle code blocks", () => {
      const input = `What is this code? #card
\`\`\`javascript
function hello() {
  console.log("Hello World");
}
\`\`\``;

      const cards = parser.generateFlashcards(input, testDeck, testVault, testNote);

      expect(cards).toHaveLength(1);
      expect(cards[0].fields.Back).toContain("<pre><code");
      expect(cards[0].containsCode).toBe(true);
    });

    it("should handle line breaks and paragraphs", () => {
      const input = `What is a paragraph? #card
First line

Second paragraph
With multiple lines`;

      const cards = parser.generateFlashcards(input, testDeck, testVault, testNote);

      expect(cards).toHaveLength(1);
      expect(cards[0].fields.Back).toContain("<p>");
    });
  });

  describe("Lists", () => {
    it("should handle unordered lists", () => {
      const input = `What are fruits? #card
- Apple
- Banana
- Orange`;

      const cards = parser.generateFlashcards(input, testDeck, testVault, testNote);

      expect(cards).toHaveLength(1);
      expect(cards[0].fields.Back).toContain("<ul>");
      expect(cards[0].fields.Back).toContain("<li>Apple</li>");
    });

    it("should handle ordered lists", () => {
      const input = `What are steps? #card
1. First step
2. Second step
3. Third step`;

      const cards = parser.generateFlashcards(input, testDeck, testVault, testNote);

      expect(cards).toHaveLength(1);
      expect(cards[0].fields.Back).toContain("<ol>");
      expect(cards[0].fields.Back).toContain("<li>First step</li>");
    });

    it("should handle nested lists", () => {
      const input = `What is hierarchy? #card
- Level 1
  - Level 2
    - Level 3`;

      const cards = parser.generateFlashcards(input, testDeck, testVault, testNote);

      expect(cards).toHaveLength(1);
      expect(cards[0].fields.Back).toContain("<ul>");
    });
  });

  describe("Tables", () => {
    it("should handle markdown tables", () => {
      const input = `What is a table? #card
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |`;

      const cards = parser.generateFlashcards(input, testDeck, testVault, testNote);

      expect(cards).toHaveLength(1);
      expect(cards[0].fields.Back).toContain("<table>");
      expect(cards[0].fields.Back).toContain("<th>Header 1</th>");
      expect(cards[0].fields.Back).toContain("<td>Cell 1</td>");
    });
  });

  describe("Images", () => {
    it("should handle markdown images", () => {
      const input = `What is this image? #card
![Alt text](image.png)`;

      const cards = parser.generateFlashcards(input, testDeck, testVault, testNote);

      expect(cards).toHaveLength(1);
      expect(cards[0].fields.Back).toContain("<img");
      expect(cards[0].fields.Back).toContain("src='image.png'");
      expect(cards[0].mediaNames).toContain("image.png");
    });

    it("should handle wiki-style images", () => {
      const input = `What is this image? #card
![[diagram.jpg]]`;

      const cards = parser.generateFlashcards(input, testDeck, testVault, testNote);

      expect(cards).toHaveLength(1);
      expect(cards[0].mediaNames).toContain("diagram.jpg");
    });

    it("should handle images with different formats", () => {
      const input = `What are image formats? #card
![[image.png]]
![JPEG](photo.jpeg)
![[vector.svg]]`;

      const cards = parser.generateFlashcards(input, testDeck, testVault, testNote);

      expect(cards).toHaveLength(1);
      expect(cards[0].mediaNames).toContain("image.png");
      expect(cards[0].mediaNames).toContain("photo.jpeg");
      expect(cards[0].mediaNames).toContain("vector.svg");
    });
  });

  describe("Audio", () => {
    it("should handle wiki-style audio", () => {
      const input = `What is this audio? #card
![[pronunciation.mp3]]`;

      const cards = parser.generateFlashcards(input, testDeck, testVault, testNote);

      expect(cards).toHaveLength(1);
      expect(cards[0].mediaNames).toContain("pronunciation.mp3");
    });

    it("should handle different audio formats", () => {
      const input = `What are audio formats? #card
![[sound.wav]]
![[music.ogg]]
![[voice.m4a]]`;

      const cards = parser.generateFlashcards(input, testDeck, testVault, testNote);

      expect(cards).toHaveLength(1);
      expect(cards[0].mediaNames).toContain("sound.wav");
      expect(cards[0].mediaNames).toContain("music.ogg");
      expect(cards[0].mediaNames).toContain("voice.m4a");
    });
  });

  describe("Links", () => {
    it("should handle markdown links", () => {
      const input = `What is a link? #card
[Google](https://google.com)`;

      const cards = parser.generateFlashcards(input, testDeck, testVault, testNote);

      expect(cards).toHaveLength(1);
      expect(cards[0].fields.Back).toContain('<a href="https://google.com">Google</a>');
    });

    it("should handle Obsidian wiki links", () => {
      const input = `What is a note? #card
[[Other Note]]`;

      const cards = parser.generateFlashcards(input, testDeck, testVault, testNote);

      expect(cards).toHaveLength(1);
      expect(cards[0].fields.Back).toContain("obsidian://open?vault=");
      expect(cards[0].fields.Back).toContain("Other%20Note");
    });

    it("should handle wiki links with aliases", () => {
      const input = `What is an alias? #card
[[Actual Note|Display Name]]`;

      const cards = parser.generateFlashcards(input, testDeck, testVault, testNote);

      expect(cards).toHaveLength(1);
      expect(cards[0].fields.Back).toContain("Display Name");
      expect(cards[0].fields.Back).toContain("Actual%20Note");
    });
  });

  describe("Backlink", () => {
    it("should handle backlinks", () => {
      const input = `What is a backlink? #card
[[Other Note]]`;

      const cards = parser.generateFlashcards(input, testDeck, testVault, testNote);

      expect(cards).toHaveLength(1);
      expect(cards[0].fields.Back).toContain("<a href=");
      expect(cards[0].fields.Back).toContain("obsidian://open?vault=");
      expect(cards[0].fields.Back).toContain("Other%20Note.md");
    });
  });

  describe("Math/LaTeX", () => {
    it("should handle inline math", () => {
      const input = `What is inline math? #card
The formula $E = mc^2$ is famous`;

      const cards = parser.generateFlashcards(input, testDeck, testVault, testNote);

      expect(cards).toHaveLength(1);
      // Anki has  its own tag with styling for math
      expect(cards[0].fields.Back).toContain("<anki-mathjax>E = mc^2</anki-mathjax>");
    });

    it("should handle block math", () => {
      const input = `What is block math? #card
$$\\sum_{i=1}^{n} x_i = x_1 + x_2 + \\cdots + x_n$$`;

      const cards = parser.generateFlashcards(input, testDeck, testVault, testNote);

      expect(cards).toHaveLength(1);
      expect(cards[0].fields.Back).toContain("<anki-mathjax block='true'>");
    });

    it("should not create cards inside math blocks", () => {
      const input = `$$
Some equation with {braces} that look like cloze
$$
What is outside math? #card
Answer outside`;

      const cards = parser.generateFlashcards(input, testDeck, testVault, testNote);

      // Should only find the card outside the math block
      expect(cards).toHaveLength(1);
      expect(cards[0].fields.Front).toContain("What is outside math?");
    });
  });

  describe("Tags and Metadata", () => {
    it("should parse local tags", () => {
      const input = `What is a tag? #card #important #review
This has tags`;

      const cards = parser.generateFlashcards(input, testDeck, testVault, testNote);

      expect(cards).toHaveLength(1);
      expect(cards[0].tags).toContain("important");
      expect(cards[0].tags).toContain("review");
    });

    it("should handle hierarchical tags", () => {
      const input = `What is hierarchy? #card #subject/math/algebra
Hierarchical tagging`;

      const cards = parser.generateFlashcards(input, testDeck, testVault, testNote);

      expect(cards).toHaveLength(1);
      expect(cards[0].tags).toContain("subject::math::algebra");
    });

    it("should include global tags", () => {
      const globalTags = ["global", "test"];
      const input = `What is global? #card
Global tagging`;

      const cards = parser.generateFlashcards(input, testDeck, testVault, testNote, globalTags);

      expect(cards).toHaveLength(1);
      expect(cards[0].tags).toContain("global");
      expect(cards[0].tags).toContain("test");
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty lines", () => {
      const input = `What is empty? #card


Answer with empty lines


`;

      const cards = parser.generateFlashcards(input, testDeck, testVault, testNote);

      expect(cards).toHaveLength(1);
      expect(cards[0].fields.Back).toContain("Answer with empty lines");
    });

    it("should handle special characters", () => {
      const input = `What are special chars? #card
Émile's naïve résumé with $100 & 50% markup`;

      const cards = parser.generateFlashcards(input, testDeck, testVault, testNote);

      expect(cards).toHaveLength(1);
      expect(cards[0].fields.Back).toContain("Émile's naïve résumé");
    });

    it("should handle malformed markdown", () => {
      const input = `What is malformed? #card
**Unclosed bold
*Mixed* **formatting** test`;

      const cards = parser.generateFlashcards(input, testDeck, testVault, testNote);

      expect(cards).toHaveLength(1);
      // Showdown should handle malformed markdown gracefully
      expect(cards[0].fields.Back).toBeDefined();
    });

    it("should handle very long content", () => {
      const longText = "Very long text ".repeat(100);
      const input = `What is long? #card
${longText}`;

      const cards = parser.generateFlashcards(input, testDeck, testVault, testNote);

      expect(cards).toHaveLength(1);
      expect(cards[0].fields.Back).toContain("Very long text");
    });
  });

  describe("Mixed Content", () => {
    it("should handle complex mixed content", () => {
      const input = `# Study Guide
## Mathematics
What is the **Pythagorean theorem**? #card #math
$a^2 + b^2 = c^2$ where:
- $a$ and $b$ are legs
- $c$ is the hypotenuse
![Diagram](triangle.png)
[More info](https://example.com)

## Programming  
Explain \`Array.map()\` #card #javascript
\`\`\`javascript
const doubled = [1,2,3].map(x => x * 2);
\`\`\`
Returns new array with transformed elements.`;

      const cards = parser.generateFlashcards(input, testDeck, testVault, testNote);

      expect(cards).toHaveLength(2);

      // Math card
      expect(cards[0].fields.Front).toContain("Pythagorean theorem");
      expect(cards[0].fields.Back).toContain("<anki-mathjax>a^2 + b^2 = c^2</anki-mathjax>");
      expect(cards[0].fields.Back).toContain("<ul>");
      expect(cards[0].mediaNames).toContain("triangle.png");
      expect(cards[0].tags).toContain("math");

      // Programming card
      expect(cards[1].fields.Front).toContain("Array.map()");
      expect(cards[1].fields.Back).toContain("const doubled");
      expect(cards[1].containsCode).toBe(true);
      expect(cards[1].tags).toContain("javascript");
    });
  });
});
