import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import Modal from "react-bootstrap/Modal";

import ModalManager from "./components/common/ModalManager";
import { LayoutData } from "./DummyData";

const ReactGridLayout = WidthProvider(Responsive);

const ResizableHandles = (props) => {
  const [mounted, setMounted] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModal] = useState(false);
  const [getProperties, setProperties] = useState({});
  let [layouts, setLayouts] = useState([]);
  const storageLayout = getFromLS() || [];

  useEffect(() => {
    setMounted(true);
    if (storageLayout.length === 0) {
      saveToLS(LayoutData);
      setLayouts(LayoutData);
    } else {
      setLayouts(storageLayout);
    }

    return;
  }, [props]);

  const closeModal = () => {
    setModal("");
  };

  const openBox = (event, index) => {
    event.preventDefault();
    setModal("box-properties");

    setProperties({
      arrange: event.currentTarget,
      style: layouts.filter((data) => data.i === index.toString()),
    });

    // TODO: BUG, cannot synchron from state and localStorage
    // saveToLS(layouts);
  };

  const handleBoxChange = (event) => {
    event.preventDefault();
    let current = getProperties.style[0];
    switch (event.target.name) {
      case "boxTitle":
        current.content.header.title.text = event.target.value;
        break;
      case "boxSubTitle":
        current.content.header.subTitle.text = event.target.value;
        break;
    }

    var foundIndex = layouts.findIndex((x) => x.i == current.i);
    layouts[foundIndex] = current;
    saveToLS(layouts);
  };

  const generateDOM = () => {
    return _.map(layouts, function (l, i) {
      return (
        <div
          key={i}
          className="card"
          onClick={(e) => openBox(e, i)}
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

          <div className="card-body">
            <h5 className="card-title">Special title treatment</h5>
            <p className="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      );
    });
  };

  const onLayoutChange = (layout) => {
    // pindahkan data dummy/api ke setiap perubahan posisi layout
    const tranform = _.map(_.zip(layout, layouts), function (item) {
      const left = item[0];
      const right = item[1];
      if (left.i === right.i) {
        left.content = right.content;
        return left;
      }
    });
    saveToLS(tranform);
    props.onLayoutChange(tranform);
  };

  // const addLayout = (event) => {
  //   event.preventDefault();

  //   let counter = layouts.length;

  //   let data = {
  //     i: "n" + counter,
  //     x: (layouts.length * 2) % (2 || 12),
  //     y: Infinity, // puts it at the bottom
  //     w: parseInt(event.target.width.value),
  //     h: parseInt(event.target.height.value),
  //     resizeHandles: _.shuffle(availableHandles).slice(
  //       0,
  //       _.random(1, availableHandles.length - 1)
  //     ),
  //   };
  //   setLayouts([...layouts, data]);
  //   console.log(data, layouts);
  //   counter += 1;
  // };

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <button
            onClick={showModal}
            className="btn btn-primary ml-3"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Create New Layout
          </button>
        </div>
      </div>
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
