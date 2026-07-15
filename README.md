# React Chess Game
## About Project
This project is made using React JS. It is a browser-based chess game where two players can play chess by following standard chess rules.
The main aim of this project is to understand how React state management works and how complex game logic can be implemented using components and utility functions.
In this project, I created a chess board, implemented piece movements, turn management, check and checkmate detection, timers, captured pieces tracking, move history, undo functionality, and pawn promotion.

## Features

- Complete 8x8 chess board
- Display all chess pieces
- Move pieces according to chess rules
- Turn based gameplay
- Legal move highlighting
- Pawn first double move
- Pawn capture
- En passant support
- Castling support
- Pawn promotion
- Check detection
- Checkmate detection
- Captured pieces display
- Move notation display
- Undo previous move
- Restart game option
- Player timers
- Responsive chess board design

## Technologies Used

- React JS
- JavaScript
- React Hooks (useState, useEffect)
- CSS
- Vite

## Folder Structure

-src{app.jsx,app.css,index.css,main.jsx}
-components{chessboard.jsx,timer.jsx,square.jsx}
-utils{checklogic.js,checkmatelogic.js,notation.js,initialboard.js,pawnmoves.js,piecemoves.js,pathCheck.js}


## How to Run

1. First install all packages:npm install

2. Start the project:npm run dev

3. Open browser and visit:http://localhost:5173/


## What I Learned

While creating this project I learned how to manage complex state in React using useState and useEffect.
I learned how to divide a large application into smaller reusable components like ChessBoard, Square, and Timer.
I also understood how game logic works by creating separate utility files for piece movement, check detection, and checkmate detection.
Another thing I learned was how to handle user interaction, update the board dynamically, and maintain game information like moves, captured pieces, and timers.

## Challenges I Faced

At first I found it difficult to manage the movement rules of different chess pieces because every piece has different conditions.
I faced issues while implementing check and checkmate detection because the program needed to check every possible move before deciding the game status.
Handling special moves like castling, en passant, and pawn promotion also required extra logic.
I also faced some import and file structure errors while connecting different utility files. After organizing the project properly, the errors were fixed.

## Future Improvements

Some features can still be added like:
- Online multiplayer mode
- AI opponent using chess engine
- Move validation with complete FIDE rules
- Game save and load option
- Player profiles
- Chess opening suggestions
- Better animations for piece movement
- Sound effects

## Conclusion

This project helped me understand React concepts in a practical way. I learned how to manage complex application states, create reusable components, and implement logic-heavy applications.
Building this chess game improved my understanding of JavaScript problem solving and React component communication. Overall, it was a challenging but useful project for improving my frontend development skills.
This project helped me understand React concepts like components, state, and event handling.
Creating a chess game was challenging because many rules have to work together, but it helped me improve my problem-solving and coding skills.
