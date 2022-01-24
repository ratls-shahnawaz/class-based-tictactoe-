import React, { Component } from "react";
import SquareR from "./SquareR";
import styles from "../styles/Board.module.css";

export class BoardR extends Component {
  render() {
    const colBox = this.props.colBox;
    const rowBox = this.props.rowBox;
    const squares = this.props.squares;
    const onClick = this.props.onClick;
    const playerX = this.props.playerX;
    const playerY = this.props.playerY;

    return (
      <>
        {/* <div className="row d-flex align-items-center mb-3">
        <div className="col-md-3">
          <label for="colorpicker">Select Board Color :</label>
          <input
            onChange={(e) => setColor(e.target.value)}
            type="color"
            name=""
            id=""
          />
        </div>
      </div> */}

        <div className="text-center">
          <div
            style={{
              // backgroundColor: color,
              gridTemplate: `repeat(${rowBox}, 0fr) / repeat(${colBox}, 0fr)`,
            }}
            className={`${styles.board}`}
          >
            {squares.map((ele, i) => (
              <SquareR
                playerX={playerX}
                playerY={playerY}
                key={i}
                value={ele}
                onClick={() => onClick(i)}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default BoardR;
