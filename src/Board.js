import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    return Array.from({length: nrows}).map(
      row => Array.from({length: ncols}).map (
        cell => Math.random() < chanceLightStartsOn
      )
    );
    // TODO: create array-of-arrays of true/false values
  
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(row => row.every(cell => !cell));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let newBoard = oldBoard.map(row => [...row]);
      
      // TODO: in the copy, flip this cell and the cells around it
      
      flipCell(y, x, newBoard);
      flipCell(y, x - 1, newBoard);
      flipCell(y, x + 1, newBoard);
      flipCell(y -1, x, newBoard);
      flipCell(y + 1, x, newBoard);
      // TODO: return the copy

      return newBoard;
    });
  }

  
  // if the game is won, just show a winning msg & render nothing else
  if (hasWon ()) {
    // TODO: Check the board in every state to determine whether the player has won
    return <div>YOu WON!!!</div>
  }
  
  // make table board
  const makeTable = (board) => {
    // TODO: Generate the table based on current state of the board.
    let tblBoard = [];
    for ( let y = 0; y < nrows; y++) {
      let row = []
      for ( let x = 0; x < ncols; x ++) {
        let coord = `${y} - ${x}`;
        row.push (
          <Cell 
          key={coord}
          isLit={board[y][x]}
          flipCellsAroundMe={() => flipCellsAround(coord)}
          />
        )
      }
      tblBoard.push( <tr key={y}>{row}</tr>);
    }
    return (
      <table className="Board">
        <tbody>{tblBoard}</tbody>
      </table>
    );
    
  }
  return <div> {makeTable(board)}</div>
};

export default Board;
