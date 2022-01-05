import { initialBoard, play, Cell, Board, Row, getWinner, getNextPlayer } from "./tictactoe";

let app = document.getElementById("app") as HTMLDivElement;

function displayBoard(board: Board){
  // Verify if winner
  if(getWinner(board)){
    alert(getWinner(board) + " win!")
  }
  // Delete previous board
  app.innerHTML = ""

  // Display title
  const title = document.createElement('h1')
  title.innerHTML = "Tic Tac Toe"
  app.append(title)
  
  // Create container
  const container = document.createElement("tbody")
  container.setAttribute('id', 'board_container')
  app.append(container)
  
  // Display current player
  const currentPlayer = document.createElement('p')
  currentPlayer.innerHTML = "Player " + getNextPlayer(board).toString() + ", it's your turn"
  app.append(currentPlayer)
  
  // Reset button
  const resetButton = document.createElement('button')
  resetButton.setAttribute('id', 'reset')
  resetButton.innerText = "RESET"
  resetButton.addEventListener('click', ()=> {displayBoard(initialBoard)})
  app.append(resetButton)

  board.map((row:Row, indexRow:number) => {
    const rowElement = document.createElement("tr");
    container.append(rowElement);
    row.map((cel:Cell, indexCel:number) => {
      // document.getElementById('board_container')?.append(document.createElement('li'))
      const cellElement = document.createElement('td')
      rowElement.append(cellElement)
      if(cel){
        switch (cel){
          case 1:
            cellElement.innerHTML = "X"
            cellElement.classList.add("X")
            break;
          case 2:
            cellElement.innerHTML = "O"
            cellElement.classList.add("O")
            break;
        }
      }
      cellElement.addEventListener("click", () => {
        displayBoard(play(board, indexCel, indexRow))
      });
    });
  });
}

app ? displayBoard(initialBoard) : ""
