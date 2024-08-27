document.addEventListener("DOMContentLoaded", () => {
    const cells = [...document.querySelectorAll(".cell")];
    const puzzle = document.querySelector(".lvl-1");
    const shuffleButton = document.getElementById("shuffle-button");
    const restartButton = document.querySelector(".retry");
    const initialConfiguration = ["1", "2", "3", "4", "5", "6", "7", "8", ""];


    const isAdjacent = (index1,index2) => {
        const [row1,col1] = [Math.floor(index1 / 3), index1 % 3];
        const [row2, col2] = [Math.floor(index2 / 3), index2 % 3];
        return (Math.abs(row1 - row2) + Math.abs(col1 - col2)) ===1;
    } 

    const swapCells = (cell1,cell2) => {
        [cell1.innerHTML,cell2.innerHTML] = [cell2.innerHTML,cell1.innerHTML];
        cell1.classList.toggle("empty");
        cell2.classList.toggle("empty");
    }

    const getAdjacentIndices = index => {
        const [row,col] = [Math.floor(index / 3), index % 3];
        return [
          row > 0 ? index - 3 : null,
          row < 2 ? index + 3 : null,
          row > 0 ? index - 1 : null,
          row < 2 ? index + 1 : null,
        ].filter(n => n!==null);
    };
    const isSolved = () => {
        return cells.slice(0,-1).every((cell,i) => cell.innerHTML === (i+1).toString());
    }

    const shufflePuzzle = () => {

        for (let i = 0; i <= 100; i++){
            const emptyCell = cells.find(cell => cell.classList.contains("empty"));
            const emptyIndex = cells.indexOf(emptyCell);
            const neighbors = getAdjacentIndices(emptyIndex)
            const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
            swapCells(cells[randomNeighbor],emptyCell);
        }
    };
    const showWin = () => {
        const winEl = document.querySelector("#win");
        winEl.classList.add("shown");
    };

    const resetPuzzle = () => {
        cells.forEach((cell, i) => {
          cell.innerHTML = initialConfiguration[i];
          cell.classList.toggle("empty", cell.innerHTML === "");
        });
    };

    

    puzzle.addEventListener("click", e=> {
        const cell = e.target;
        if(!cell.classList.contains("empty")){
            const emptyCell = cells.find(cell=> cell.classList.contains("empty"));
            const cellIndex = cells.indexOf(cell);
            const emptyIndex = cells.indexOf(emptyCell);

            if(isAdjacent(cellIndex, emptyIndex)){
                swapCells(cell,emptyCell);
            if(isSolved()) {
                showWin();
            }
            }
        }

    });
    shuffleButton.addEventListener("click", shufflePuzzle);
    restartButton.addEventListener("click", () => {
        resetPuzzle();
        document.querySelector("#win").classList.remove("shown");
    });

});