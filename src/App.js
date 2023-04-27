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
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
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
