import { Regex } from "src/conf/regex";
import { defaultSettings } from "src/conf/settings";

describe("Regex Patterns", () => {
  const settings = defaultSettings;
  const regex = new Regex(settings);

  describe("headingsRegex", () => {
    it("should match valid headings", () => {
      const validHeadings = ["# Heading 1", "## Heading 2 #tag", "   ### Heading 3"];

      validHeadings.forEach((heading) => {
        regex.headingsRegex.lastIndex = 0; // Reset regex state for global flag
        expect(regex.headingsRegex.test(heading)).toBeTruthy();
      });
    });

    it("should not match invalid headings", () => {
      const invalidHeadings = [
        "#Invalid", // no space after #
        "    #### Too much indentation",
        "No hash mark",
      ];

      invalidHeadings.forEach((heading) => {
        regex.headingsRegex.lastIndex = 0; // Reset regex state for global flag
        expect(regex.headingsRegex.test(heading)).toBeFalsy();
      });
    });

    it("should correctly capture groups", () => {
      const heading = "## Test Heading #tag1 #tag2";
      const matches = [...heading.matchAll(regex.headingsRegex)][0];

      expect(matches[1]).toBe("##"); // level
      expect(matches[2]).toBe("Test Heading"); // content
      expect(matches[3]).toBe("#tag1 #tag2"); // tags
    });
  });
});
