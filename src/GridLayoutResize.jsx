import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import Modal from "react-bootstrap/Modal";
import ReactECharts from "echarts-for-react";

import ModalManager from "./components/common/ModalManager";
import { LayoutData } from "./DummyData";

const ReactGridLayout = WidthProvider(Responsive);

const ResizableHandles = (props) => {
  const [mounted, setMounted] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModal] = useState(false);
  const [getProperties, setProperties] = useState({});
  const [layouts, setLayouts] = useState([]);
  const [colorScheme, setColorScheme] = useState("red");
  const storageLayout = getFromLS() || [];
  useEffect(() => {
    setMounted(true);
    if (storageLayout.length === 0) {
      saveToLS(LayoutData);
      setLayouts(LayoutData);
    } else {
      setLayouts(storageLayout);
    }

    setColorScheme("#69C0FF");

    return;
  }, [props]);

  const closeModal = () => {
    setModal("");
  };

  const openBox = (event, index, modalName) => {
    event.preventDefault();
    setModal(modalName);

    // ignore undifined value
    if (index)
      setProperties({
        arrange: event.currentTarget,
        style: layouts.filter((data) => data.i === index.toString()),
      });
  };

  const handleBoxChange = (event, eventType) => {
    if (eventType === "eventChange") {
      let current = getProperties.style[0];
      switch (event.target.name) {
        case "boxTitle":
          current.content.header.title.text = event.target.value;
          break;
        case "boxSubTitle":
          current.content.header.subTitle.text = event.target.value;
          break;
        case "textAlign":
          current.content.header.textAlign = event.target.value;
          break;
      }

      var foundIndex = layouts.findIndex((x) => x.i == current.i);
      layouts[foundIndex] = current;
      saveToLS(layouts);
    }
  };

  const handleBoxCreate = (event, payload) => {
    event.preventDefault();

    // change color in chart
    switch (payload.content.body.type) {
      case ("text", "image"):
        payload.content.color = colorScheme;
        break;
      case "chart":
        payload.content.body.raw.color = colorScheme;
        break;
    }

    const id = (layouts.length + 1).toString();
    const data = {
      i: id,
      ...payload,
    };
    // LayoutData.push(data);
    let newData = [...layouts, data];
    setLayouts(newData);
  };

  const onRemoveItemLayout = (id) => {
    setLayouts(_.reject(layouts, { i: id }));
  };

  const generateDOM = () => {
    return _.map(layouts, function (l) {
      let raw;
      switch (l.content.body.type) {
        case ("text", "image"):
          raw = l.content.body.raw;
          break;
        case "chart":
          raw = <ReactECharts option={l.content.body.raw} />;
          break;
      }

      if (l.content.category === "body") {
        return (
          <div
            key={l.i}
            className={l.content.class}
            onClick={(e) => openBox(e, l.i, "box-properties")}
            data-modal="box-properties"
            data-grid={{
              w: l.w,
              h: l.h,
              x: l.x,
              y: l.y,
              minW: l.minW,
              minH: l.minH,
            }}
          >
            {/* {l.content.header} */}
            <div className="card-header">
              <div
                className={l.content.header.title.class}
                style={{
                  fontSize: l.content.header.title.size,
                  fontWeight: l.content.header.title.weight,
                }}
              >
                {l.content.header.title.text}
              </div>
              <p>{l.content.header.subTitle.text}</p>
            </div>

            <div className="card-body">{raw}</div>
          </div>
        );
      } else {
        return (
          <div
            key={l.i}
            className={l.content.class}
            onClick={(e) => openBox(e, l.i, "box-properties")}
            data-modal="box-properties"
            data-grid={{
              w: l.w,
              h: l.h,
              x: l.x,
              y: l.y,
              minW: l.minW,
              minH: l.minH,
            }}
          >
            <div
              className="card-header no-bgcolor"
              style={{ padding: "1.35rem 1rem" }}
            >
              <img src={raw} className="rounded" alt="." />
            </div>
            <div
              className="card-block pr-3 py-3"
              style={{
                textAlign: l.content.header.textAlign,
              }}
            >
              <h4 className="card-title" style={{ color: l.content.color }}>
                {l.content.header.title.text}
              </h4>
              <p className="card-text">{l.content.header.subTitle.text}</p>
            </div>
          </div>
        );
      }
    });
  };

  const onLayoutChange = (layout) => {
    // pindahkan data dummy/api ke setiap perubahan posisi layout
    const state = _.map(_.zip(layout, layouts), function (item) {
      const left = item[0];
      const right = item[1];
      if (left.i === right.i) {
        left.content = right.content;
        return left;
      } else {
        left.content = right.content;
        return left;
      }
    });
    saveToLS(state);
    props.onLayoutChange(state);
  };

  const hideModal = () => {
    setIsOpen(false);
  };
  const onChangeColorScheme = (event) => {
    event.preventDefault();
    layouts.forEach(function (item) {
      item.content.color = event.target.value;
      // change color in chart
      if (item.content.body.type === "chart") {
        item.content.body.raw.color = event.target.value;
      }
    });
    onLayoutChange(layouts);
  };

  return (
    <>
      <div className="form-group">
        <label>Color Scheme</label>
        <input
          type="text"
          className="form-control"
          name="color"
          onChange={onChangeColorScheme}
          defaultValue={colorScheme}
        />
      </div>
      <button
        className="btn btn-primary ml-3"
        data-modal="modal-three"
        onClick={(e) => openBox(e, undefined, "box-visualization")}
      >
        Create Visualization
      </button>
      <button
        className="btn btn-primary ml-3"
        data-modal="modal-three"
        onClick={(e) => openBox(e, undefined, "box-title")}
      >
        Create Title
      </button>

      <div className="row">
        <div className="col-md-12">
          <ReactGridLayout
            layout={layouts}
            onLayoutChange={onLayoutChange}
            measureBeforeMount={false}
            useCSSTransforms={mounted}
          >
            {generateDOM()}
          </ReactGridLayout>
        </div>
      </div>

      <Modal show={isOpen} onHide={hideModal}>
        <form onSubmit={layouts}>
          <Modal.Header>
            <Modal.Title>Hi</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label>Width</label>
              <input
                type="text"
                className="form-control"
                id="text"
                name="width"
              />
            </div>
            <div className="form-group">
              <label>Height</label>
              <input
                type="text"
                className="form-control"
                id="text"
                name="height"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={hideModal}>Cancel</button>
            <button>Save</button>
          </Modal.Footer>
        </form>
      </Modal>

      <ModalManager
        closeFn={closeModal}
        handleBoxChange={handleBoxChange}
        handleBoxCreate={handleBoxCreate}
        handleBoxRemove={onRemoveItemLayout}
        modal={modalOpen}
        properties={getProperties}
      />
    </>
  );
};

export default ResizableHandles;

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
