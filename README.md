<!-- @format -->

# Print to Press

## Historically Accurate Game Jam 5 Entry

This was made in the span of 5 days as entry for the [Historically Accurate Game Jam 5](https://itch.io/jam/historically-accurate-5). You can check out the game on [Itch.io](https://iamsebastiandev.itch.io/press-2-print).

The main motivation behind using react to create a game was to deepen and refresh my knowledge in react after using mostly svelte for a while.

## Movable type print

The Jam's theme was _Your Country's History_. Not wanting to use a military theme, I opted to use the invention of the movable type press (in europe) as inspiration, seeing as I grew up close to where Gutenberg lived, in Mainz.

You can read more about [the movable type printing press on wikipedia](https://en.wikipedia.org/wiki/Movable_type).

## Play with other texts

If you want to play the game using a text that diverges from the supplied vulgate, you can change the text in the code itself like this:

-   Clone or download the repo
-   run npm i in the project diretory to install dependencies
-   run npm start to run the development server for react
-   in `./src/assets/texts/playableTexts.js` add a new text and set the activeText constant to the text you'd like to use.

> A textfile must export an array of strings which will become the phrases used by the game.
