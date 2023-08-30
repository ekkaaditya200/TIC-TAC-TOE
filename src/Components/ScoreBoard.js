import React from "react";
import './ScoreBoard.css';

const ScoreBoard = ({xScore,oScore,draw,playing}) => {
    return(
        <div className="scoreboard">
            <span className={`x-score ${playing?"xplay":""}`}>X - {xScore}</span>
            <span className={`o-score ${!playing?"oplay":""}`}>O - {oScore}</span>
            <span className="draw">Draw - {draw}</span>
        </div>
    )
}
export default ScoreBoard;