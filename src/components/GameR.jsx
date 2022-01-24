import React, { Component } from "react";
import BoardR from "./BoardR";
import styles from "../styles/Game.module.css";
import { calculateCustomWinner } from "../calculatecustomdynamicwin";

export class GameR extends Component {
  constructor() {
    super();
    this.state = {
      customWin: 0,
      rowInputVal: 3,
      columnInputVal: 3,
      board: Array(9).fill(null),
      history: [],
      xIsNext: true,
      playerXColor: "grey",
      playerYColor: "pink",
    };
  }

  rowHandler = (e) => {
    this.setState({
      rowInputVal: Number(e.target.value),
    });
  };

  columnHandler = (e) => {
    this.setState({
      columnInputVal: Number(e.target.value),
    });
  };

  customWinInputHandler = (e) => {
    this.setState({
      customWin: Number(e.target.value),
    });
  };

  handleBoxClick = (i) => {
    // audio.play()
    let winner = calculateCustomWinner(
      this.state.rowInputVal,
      this.state.board,
      this.state.customWin
    );
    const boardCopy = [...this.state.board];
    // If user click an occupied square or if game is won, return
    if (winner || boardCopy[i]) return;
    // Put an X or an O in the clicked square
    boardCopy[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      board: boardCopy,
      xIsNext: !this.state.xIsNext,
      history: [...this.state.history, boardCopy],
    });
  };

  handleHistoryClick = (arr, index) => {
    this.setState({
      board: arr,
      history: this.state.history.splice(this.state.history, index + 1),
      xIsNext: !this.state.xIsNext,
    });
  };

  resetButtonHandler = () => {
    this.setState({
      customWin: 0,
      columnInputVal: 3,
      rowInputVal: 3,
      board: Array(9).fill(null),
      history: Array(9).fill(null),
      xIsNext: !this.state.xIsNext,
    });
  };

  applyClickHandler = () => {
    this.setState({
      board: Array(this.state.rowInputVal * this.state.columnInputVal).fill(
        null
      ),
    });
  };

  render() {
    let audio = new Audio("/music/Ting.mp3");
    let winnerMusic = new Audio("/music/winner.mp3");

    let winner = calculateCustomWinner(
      this.state.rowInputVal,
      this.state.board,
      this.state.customWin
    );

    const moves = this.state.history.map((ele, index) => {
      if (ele !== null) {
        return (
          <li key={index}>
            <button
              onClick={() => this.handleHistoryClick(ele, index)}
              className="btn btn-sm btn-dark mb-2"
            >
              go to move
            </button>
            {ele}
          </li>
        );
      }
    });

    return (
      <>
        <div className="container bg-light">
          <h3 className="text-center bg-dark text-warning py-2">
            Welcome !! Tic Tac Toe Game
          </h3>
          <div className="py-3 row  text-start">
            <div className="col-md-6 offset-3">
              <label for="cars">Choose Number of Rows:</label>
              <input
                min={0}
                name="row"
                // ref={refs}
                onChange={this.rowHandler}
                type="number"
                className="form-control"
              />

              <label className="mt-2" for="cars">
                Choose Number of Columns:
              </label>
              <input
                min={0}
                name="column"
                // ref={refs1}
                onChange={this.columnHandler}
                type="number"
                className="form-control"
              />

              <label htmlFor="">Select Custom Win :</label>

              <input
                min={0}
                name="column"
                // ref={refs2}
                onChange={this.customWinInputHandler}
                type="number"
                className="form-control"
              />

              <button
                className="btn btn-sm btn-primary me-3 mt-3"
                onClick={this.applyClickHandler}
              >
                Apply
              </button>

              <button
                className="btn btn-sm btn-danger mt-3"
                onClick={this.resetButtonHandler}
              >
                Reset
              </button>
            </div>
          </div>

          <br />

          <BoardR
            playerX={this.state.playerXColor}
            playerY={this.state.playerYColor}
            colBox={this.state.columnInputVal}
            rowBox={this.state.rowInputVal}
            squares={this.state.board}
            onClick={this.handleBoxClick}
          />
          <div className="d-flex my-2">
            <label className="mx-2">Player X:</label>
            <input
              onChange={(e) =>
                this.setState({
                  playerXColor: e.target.value,
                })
              }
              type="color"
            />

            <label className="mx-2">Player Y:</label>
            {/* <input onChange={(e) => setPlayerYColor(e.target.value)} type="color" /> */}
            <input
              onChange={(e) =>
                this.setState({
                  playerYColor: e.target.value,
                })
              }
              type="color"
            />
          </div>

          <div>
            <p
              className={winner ? styles.heartbeatPara : styles.nextplayerDiv}
              style={{
                backgroundColor: this.state.xIsNext
                  ? this.state.playerXColor
                  : this.state.playerYColor,
              }}
            >
              {winner
                ? winnerMusic.play() && winner == "Draw"
                  ? winner
                  : "Winner: " + winner
                : "Next Player: " + (this.state.xIsNext ? "X" : "O")}
            </p>
          </div>

          <br />
          <br />

          {this.state.history ? <ol>{moves}</ol> : null}
        </div>
      </>
    );
  }
}

export default GameR;
