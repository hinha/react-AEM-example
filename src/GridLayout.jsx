import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const GridLayout = (props) => {
  const [layouts, setLayouts] = useState({ lg: [] });
  const [mounted, setMounted] = useState(false);
  const [stateCompactType, setCompactType] = useState("vertical");
  const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");

  useEffect(() => {
    setMounted(true);
    return;
  }, [props]);

  const generateDOM = () => {
    return _.map(layouts.lg, function (l, i) {
      return (
        <div key={i} className={l.static ? "static" : ""}>
          {l.static ? (
            <span
              className="text"
              title="This item is static and cannot be removed or resized."
            >
              Static - {i}
            </span>
          ) : (
            <>
              <div className="card" style={{ width: "18rem" }}>
                {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
                <div className="card-body">
                  <h5 className="card-title">Card title {i}</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the cards content.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      );
    });
  };

  const onBreakpointChange = (breakpoint) => {
    setCurrentBreakpoint(breakpoint);
  };

  const onCompactTypeChange = () => {
    // const { compactType: oldCompactType } = stateCompactType;
    const compactType =
      stateCompactType === "horizontal"
        ? "vertical"
        : stateCompactType === "vertical"
        ? null
        : "horizontal";
    setCompactType(compactType);
  };

  const onLayoutChange = (layout, layouts) => {
    console.log(props, "change");
    props.onLayoutChange(layout, layouts);
  };

  const onNewLayout = () => {
    setLayouts({ lg: generateLayout() });
  };

  return (
    <>
      <div>Current Breakpoint: {currentBreakpoint}</div>
      <div>
        Compaction type: {_.capitalize(stateCompactType) || "No Compaction"}
      </div>
      <button onClick={onNewLayout}>Generate New Layout</button>
      <button onClick={onCompactTypeChange}>Change Compaction Type</button>
      <ResponsiveReactGridLayout
        {...props}
        layouts={layouts}
        onBreakpointChange={onBreakpointChange}
        onLayoutChange={onLayoutChange}
        // WidthProvider option
        measureBeforeMount={false}
        // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
        // and set `measureBeforeMount={true}`.
        useCSSTransforms={mounted}
        compactType={stateCompactType}
        preventCollision={!stateCompactType}
      >
        {generateDOM()}
      </ResponsiveReactGridLayout>
    </>
  );
};

function generateLayout() {
  return _.map(_.range(0, 10), function (item, i) {
    var y = Math.ceil(Math.random() * 2) + 1;
    return {
      x: (_.random(0, 5) * 2) % 12,
      y: Math.floor(i / 6) * y,
      w: 4,
      h: 2,
      i: i.toString(),
      static: Math.random() < 0.05,
    };
  });
}

export default GridLayout;
