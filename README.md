# Wordle Game

This project is a Wordle game implementation using HTML, CSS, and JavaScript. The game is designed to provide a fun and interactive experience for users to guess a word based on hints and feedback provided by the game.

## Overview

This is a Wordle game where players can guess a word based on hints provided. The game uses a dictionary of words retrieved from an API endpoint. Players can guess the word by inputting letters into boxes, and the game provides feedback on correct and incorrect guesses

## Notes

- The game retrieves a dictionary of words from the following endpoint: [Wordle API Endpoint](https://api.masoudkf.com/v1/wordle).
- The game does not require checking if a word exists in the dictionary; it directly uses the provided dictionary.
- Users can use the Backspace key to remove characters from the word and the Enter key to submit an answer.
- The game provides feedback on the guessed word's correctness using different background colors (green for correct letters in the right spot, yellowish for correct letters in the wrong spot, and gray for incorrect letters).
- Users can request a hint about the word by clicking the "?" icon on the menu.
- The game includes a Light and Dark theme toggle accessible through the Moon icon in the menu.
- Upon winning, users will see a congratulation message, while losing results in a message with a red background indicating the failure to guess the word.
- The i icon in the menu provides game instructions.
- Vanilla JavaScript (without external libraries like React) is used for this assignment.
