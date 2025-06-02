
## Features

🗃️ Simple flashcards with **#card**  
🎴 Reversed flashcards with **#card-reverse** or **#card/reverse**  
📅 Spaced-only cards with **#card-spaced** or **#card/spaced**  
✍️ Inline style with **Question::Answer**  
✍️ Inline style reversed with **Question:::Answer**  
📃 Cloze with **==Highlight==** or **{Curly brackets}** or  **{2:Cloze}**   
🧠 **Context-aware** mode  
🏷️ Global and local **tags**  

🔢 Support for **LaTeX**  
🖼️ Support for **images**  
🎤 Support for **audios**   
🔗 Support for **Obsidian URI**  
⚓ Support for **reference to note**  
📟 Support for **code syntax highlight**

For other features check the [wiki](https://github.com/reuseman/flashcards-obsidian/wiki).

## How it works?

The following is a demo where the three main operations are shown:

1. **Insertion** of cards;
2. **Update** of cards;
3. **Deletion** of cards.

![Demo image](docs/demo.gif)

## How to use it?

The wiki explains in detail [how to use it](https://github.com/reuseman/flashcards-obsidian/wiki).

## How to install

1. [Install](obsidian://show-plugin?id=flashcards-obsidian) this plugin on Obsidian:

   - Open Settings > Community plugins
   - Make sure Safe mode is off
   - Click Browse community plugins
   - Search for "**Flashcards**"
   - Click Install
   - Once installed, close the community plugins window and activate the newly installed plugin

2. Install [AnkiConnect](https://ankiweb.net/shared/info/2055492159) on Anki
   - Tools > Add-ons -> Get Add-ons...
   - Paste the code **2055492159** > Ok

3. Open the settings of the plugin, and while Anki is opened press "**Grant Permission**"

## Contributing
Contributions via bug reports, bug fixes, are welcome. If you have ideas about features to be implemented, please open an issue so we can discuss the best way to implement it. For more details check [Contributing.md](docs/CONTRIBUTING.md)

## Roadmap
- [ ] Adapting extension core to the Zettelkasten method
   - [ ] Sync whole vault or specific deck to Anki
   - [ ] Delete tag capture logic
   - [ ] Join reverse and spaced card logic
   - [ ] Change cloze card logic capture with changing {cloze} to backlinks
- [ ] Test-Coverage
   - [ ] Core logic
      - [ ] Regex unit tests (src/conf/regex.ts)
      - [ ] Settings defaults/validation
      - [ ] Utility helpers (src/utils.ts)
   - [ ] Card classes (maybe will be changed)
   - [ ] Parser combinations
      - [ ] Context-aware ON / OFF
      - [ ] Source link ON / OFF
      - [ ] Code highlight ON / OFF
      - [ ] Inline-ID ON / OFF
   - [ ] Edge-case fixtures
      - [ ] Deep headings
      - [ ] Math + code blocks
      - [ ] Broken links & huge files
   - [ ] Integration layers
      - [ ] Mock Obsidian API (unit tests)
      - [ ] Mock AnkiConnect HTTP endpoint
   - [ ] UI / command tests
      - [ ] Command-palette registration
      - [ ] Settings change reactions
   - [ ] Performance guard
      - [ ] Fail test if generateFlashcards on 2 MB sample > N ms
   - [ ] Mutation & quality
      - [ ] Add Stryker mutation testing
      - [ ] Gradually raise Jest coverageThreshold
   - [ ] CI & docs
      - [ ] GitHub Actions (Node 18/20 on Linux/Mac/Win)
      - [ ] PR template requires green tests
