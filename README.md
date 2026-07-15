# Offline Chess Game ♟️
This project is a simple offline chess game made using React.js.
The purpose of this project is to create a chess game where two players can play on the same computer. Players can move pieces, capture opponent pieces, and the game checks important chess rules like legal moves, check, and checkmate.
I created this project to learn more about React components, state management, and handling complex game logic.

## Features
- Two player offline chess game
- White and Black player turns
- Legal chess move checking
- Check detection
- Checkmate detection
- Player countdown timer
- Move history display
- Captured pieces display
- Undo move option
- Restart game option
- Pawn promotion
- Castling support

## Technologies Used

- React.js
- JavaScript
- HTML
- CSS
- Vite

## Project Folder Structure
-src{app.jsx,app.css,index.css,main.jsx}
-components{chessboard.jsx,timer.jsx,square.jsx}
-utils{checklogic.js,checkmatelogic.js,notation.js,initialboard.js,pawnmoves.js,piecemoves.js}

## How to Run the Project
Follow these steps to run the project on your system.
### 1. Clone the repository
git clone <repository-link>
### 2. Open the project folder
cd chess-game
### 3. Install dependencies
npm install
### 4. Start the development server
npm run dev
After running the command, Vite will provide a local server link.
Open the link in your browser:http://localhost:5173/

## How To Play
1. The game starts with the White player turn.
2. Click on any chess piece.
3. Possible moves will be highlighted.
4. Click on the square where you want to move the piece.
5. After a successful move, the turn changes to the other player.
6. The game continues until checkmate or the timer finishes.

## Problems Faced During Development
While developing this project, I faced some difficulties:
- Managing the board state after every move
- Switching turns between white and black players
- Implementing movement rules for different pieces
- Detecting check and checkmate situations
- Updating captured pieces correctly
- Managing the timer for both players
- Fixing bugs related to React state updates
These problems were solved by separating different logic into different files and improving state handling.

## Future Improvements
Some improvements that can be added in the future:
- Add online multiplayer support
- Add chess AI opponent
- Improve user interface
- Add save and load game feature
- Add better chess notation system

## Conclusion
This project helped me understand React concepts like components, state, and event handling.
Creating a chess game was challenging because many rules have to work together, but it helped me improve my problem-solving and coding skills.
