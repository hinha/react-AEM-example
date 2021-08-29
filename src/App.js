import React, { useEffect, useState } from "react";

import { setupStoryBoard, SendBoard } from "./services/event";
import { LayoutData } from "./DummyData";

import ResizableHandles from "./GridLayoutResize";

const keyAuthLocal = localStorage.getItem("keyAuth") || "";
const secretAuthLocal = localStorage.getItem("secretAuth") || "";
const jwtLocal = localStorage.getItem("jwt") || "";

function App() {
  const [layout, setLayout] = useState([]);
  const [keyAuth, setKeyAuth] = useState("");
  const [secretAuth, setSecretAuth] = useState("");
  const [jwtAuth, setJwtAuth] = useState("");

  const storageLayout = getFromLS() || [];

  useEffect(() => {
    let timeoutId;

    const sendPing = async () => {
      await SendBoard(["onCheck", timeoutId]);
      timeoutId = setTimeout(sendPing, 10000 * 2); // 10 seconds
    };

    const evtSource = setupStoryBoard();

    evtSource.onmessage = function (e) {
      console.log(e.data);
    };
    evtSource.onopen = function () {
      // TODO
      // Reset reconnect frequency upon successful connection
    };
    evtSource.onerror = function () {
      evtSource.close();
    };
    sendPing();

    setKeyAuth(keyAuthLocal);
    setSecretAuth(secretAuthLocal);
    setJwtAuth(jwtLocal);

    if (storageLayout.length === 0) {
      saveToLS(LayoutData);
      setLayout(LayoutData);
    } else {
      setLayout(storageLayout);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const onLayoutChange = (layout) => {
    saveToLS(layout);
    setLayout(layout);

    SendBoard(["onChange", layout]);
  };

  const stringifyLayout = () => {
    return layout.map(function (l) {
      return (
        <div className="layoutItem" key={l.i}>
          <b>{l.i}</b>: [{l.x}, {l.y}, {l.w}, {l.h}]
        </div>
      );
    });
  };

  const saveCredentials = (event) => {
    event.preventDefault();
    localStorage.setItem("keyAuth", keyAuth);
    localStorage.setItem("secretAuth", secretAuth);
    localStorage.setItem("jwt", jwtAuth);
    // save local storage
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center">DEMO</h1>
      <div className="row">
        <div className="col-12">
          <form onSubmit={saveCredentials}>
            <div className="form-group">
              <label>Key</label>
              <input
                type="text"
                className="form-control"
                name="context_key"
                defaultValue={keyAuth}
                onChange={(e) => setKeyAuth(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Secret</label>
              <input
                type="text"
                className="form-control"
                name="secret_key"
                defaultValue={secretAuth}
                onChange={(e) => setSecretAuth(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>JWT secret</label>
              <input
                type="text"
                className="form-control"
                name="jwt_key"
                defaultValue={jwtAuth}
                onChange={(e) => setJwtAuth(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
      <div className="layoutJSON">
        Displayed as <code>[x, y, w, h]</code>:
        <div className="columns">{stringifyLayout()}</div>
      </div>
      {/* <GridLayout onLayoutChange={onLayoutChange} /> */}
      <ResizableHandles onLayoutChange={onLayoutChange} layouts={layout} />
    </div>
  );
}

export default App;

function getFromLS() {
  let ls = [];
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("layouts")) || [];
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls;
}
function saveToLS(value) {
  global.localStorage.setItem("layouts", JSON.stringify(value));
}
