import React, { useEffect, useState } from "react";
// import GridLayout from "./GridLayout";
import ResizableHandles from "./GridLayoutResize";

function App() {
  const [layout, setLayout] = useState([]);

  const [mount, setMount] = useState([]);

  useEffect(() => {
    let template;
    template = (
      <>
        <div className="card">
          <h5 className="card-header text-center">Empty Content</h5>
        </div>
      </>
    );

    setMount([...mount, template]);

    return;
  }, []);

  const onLayoutChange = (layout) => {
    setLayout(layout);
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

  return (
    <div className="container-fluid">
      <h1 className="text-center">DEMO</h1>
      <div className="layoutJSON">
        Displayed as <code>[x, y, w, h]</code>:
        <div className="columns">{stringifyLayout()}</div>
      </div>
      {/* <GridLayout onLayoutChange={onLayoutChange} /> */}
      <ResizableHandles onLayoutChange={onLayoutChange} />
    </div>
  );
}

export default App;
