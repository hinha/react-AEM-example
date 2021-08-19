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

  const clone = (obj) => {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, attr))
        copy[attr] = obj[attr];
    }
    return copy;
  };

  const clickCopy = () => {
    setMount([...mount, clone(mount[0])]);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {mount.map((item, index) => {
          return (
            <div key={index} className="col-2" id={("id", index)}>
              {item}
            </div>
          );
        })}
        <div className="col-1">
          <div className="card">
            <p className="card-header text-center" onClick={clickCopy}>
              +
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 pt-1">
          <div className="card">
            <h5 className="card-header text-center">Add</h5>
          </div>
        </div>
      </div>
      <div className="col-12 layoutJSON">
        Displayed as <code>[x, y, w, h]</code>:
        <div className="columns">{stringifyLayout()}</div>
      </div>
      {/* <GridLayout onLayoutChange={onLayoutChange} /> */}
      <ResizableHandles onLayoutChange={onLayoutChange} />
    </div>
  );
}

export default App;
