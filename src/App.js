import logo from "./logo.svg";
import "./App.css";
import { BottomDrawer } from "./BottomDrawer";
import { useState } from "react";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         The below bottom drawer works only in mobile view.
        </p>
        <p>It uses touchstart, touchmove and touchend event listeners for dragging animation</p>
      </header>
      <button className="trigger" onClick={() => setOpen(!open)}>
        Show drawer
      </button>
      {open && (
        <BottomDrawer setOpen={setOpen} >
          Drawer Content
        </BottomDrawer>
      )}
    </div>
  );
}

export default App;
