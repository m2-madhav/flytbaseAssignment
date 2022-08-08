import React, { useState, useCallback, useEffect } from "react";
import "./styles.css";

const uid = function () {
  return +new Date();
};

export default function App() {
  const [boxCounter, setBoxcounter] = useState([]);
  const [chosenId, setChosenId] = useState();
  const [top, setTop] = useState(100);
  const [left, setLeft] = useState(50);
  const [keyControl, setKeyControl] = useState(true);
  const pixelDistance = 5;

  const move = useCallback(
    (direction) => {
      switch (direction) {
        case "up":
          setTop((top) => (top - pixelDistance >= 0 ? top - pixelDistance : 0));
          break;
        case "down":
          setTop((top) =>
            top + pixelDistance <= 450 ? top + pixelDistance : 450
          );
          break;
        case "left":
          setLeft((left) =>
            left - pixelDistance >= 0 ? left - pixelDistance : 0
          );
          break;
        case "delete":
          setBoxcounter(boxCounter.filter((item) => item.id !== chosenId));
          break;
        default:
          setLeft((left) =>
            left + pixelDistance <= 450 ? left + pixelDistance : 450
          );
          break;
      }
    },
    [boxCounter, chosenId]
  );

  const handleClick = () => {
    setBoxcounter([...boxCounter, { id: uid() }]);
  };

  const handleKeyboardControl = () => {
    setKeyControl(!keyControl);
  };

  const handleClickDiv = (item) => {
    setChosenId(item.id);
  };

  if (chosenId) {
    document.addEventListener("keydown", function (e) {
      switch (e.keyCode) {
        case 37:
          move("left");
          break;
        case 38:
          move("up");
          break;
        case 39:
          move("right");
          break;
        case 40:
          move("down");
          break;
        case 46:
          move("delete");
          break;
        default:
      }
    });
  }

  return (
    <div className="App">
      <button onClick={handleClick}>Add boxes</button>
      <button style={{ marginLeft: "10px" }} onClick={handleKeyboardControl}>
        Keyboard control {keyControl ? "Enabled" : "Disabled"}
      </button>

      <div
        style={{
          display: "flex",
        }}
        className="move-container"
      >
        {boxCounter.map((item) => (
          <div
            style={{
              backgroundColor: item.id === chosenId ? "red" : "blue",
              zIndex: `${item.id}`,
              top: `${top}px`,
              left: `${left}px`,
              position: chosenId ? "absolute" : "",
            }}
            className="move-div"
            onClick={() => handleClickDiv(item)}
          ></div>
        ))}
      </div>
    </div>
  );
}
