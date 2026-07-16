# React Chess Game
## About the Project

This project is a Chess Game developed using React JS. The main aim of this project is to understand React components, state management, event handling, and implementing chess game logic using JavaScript.
The game follows the basic rules of chess and includes features such as legal move validation, check detection, checkmate detection, castling, en passant, pawn promotion, move history, captured pieces, timers, and undo functionality.

## Objectives

- Learn React component-based development.
- Understand state management using React Hooks.
- Implement chess rules using JavaScript.
- Display game status using a responsive user interface.
- Improve problem-solving by implementing real game logic.

## Features

- Interactive 8 × 8 chess board
- All standard chess pieces
- Legal move validation
- Check detection
- Checkmate detection
- Castling (King Side and Queen Side)
- En Passant
- Pawn Promotion using an in-game selection window
- Move History panel
- Captured Pieces display
- Player Timer
- Undo Last Move
- Restart Game
- Active Player Highlight
- Responsive Design

## Technologies Used

- React JS
- JavaScript (ES6)
- HTML5
- CSS3

## Project Structure

- components{chessboard.jsx,square.jsx,timer.jsx}
- utils{piecemoves.js,pawnmoves.js,pathcheck.js,checklogic.js,checkmatelogic.js,notation.js,initialboard.js}
- src{app.css,app.jsx,index.css,main.jsx}

## How to Run

1. Clone or download the project.
2. Install the required packages:npm install
3. Start the development server:npm run dev
4. Open the browser and visit:http://localhost:5173

## Chess Rules Implemented

- Normal piece movement
- Pawn first move
- Pawn diagonal capture
- En Passant
- Castling
- Pawn Promotion
- Check
- Checkmate
- Move validation
- Turn switching
- Capture handling

## Learning Outcomes

Through this project, I learned:

- How React components work together.
- Managing application state using useState and useEffect.
- Implementing chess rules using JavaScript.
- Handling user interactions.
- Creating reusable utility functions.
- Maintaining move history and game state.
- Designing a responsive user interface.

## Future Improvements

- Stalemate detection
- Draw by repetition
- Fifty-move rule
- PGN file export
- Sound effects
- Multiplayer mode
- AI opponent
- Online gameplay
