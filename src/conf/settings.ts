export interface ISettings {
  contextAwareMode: boolean;
  sourceSupport: boolean;
  codeHighlightSupport: boolean;
  inlineID: boolean;
  contextSeparator: string;
  deck: string;
  folderBasedDeck: boolean;
  flashcardsTag: string;
  inlineSeparator: string;
  inlineSeparatorReverse: string;
  defaultAnkiTag: string;
  ankiConnectPermission: boolean;
  zettelkastenCardsIdentificationMode: boolean;
}

export const defaultSettings: ISettings = {
  contextAwareMode: true,
  sourceSupport: false,
  codeHighlightSupport: false,
  inlineID: false,
  contextSeparator: " > ",
  deck: "Default",
  folderBasedDeck: true,
  flashcardsTag: "card",
  inlineSeparator: "::",
  inlineSeparatorReverse: ":::",
  defaultAnkiTag: "obsidian",
  ankiConnectPermission: false,
  zettelkastenCardsIdentificationMode: false,
};
