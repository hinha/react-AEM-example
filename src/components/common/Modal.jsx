import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ReactECharts from "echarts-for-react";
import { randid } from "./../util/id";

const defaultMeta = {
  height: 0,
  width: 0,
};

export const ModalProperties = ({
  closeFn = () => null,
  handleBoxChange = () => null,
  handleBoxRemove = () => null,
  open = true,
  meta = defaultMeta,
}) => {
  const [aligment, setAligment] = useState(meta.style.content.header.textAlign);

  const changeForm = (event) => {
    event.preventDefault();
    handleBoxChange(event, "eventChange");
  };
  const deleteItem = (event, id) => {
    event.preventDefault();
    handleBoxRemove(id);
    closeFn(event);
  };

  const changeOption = (event) => {
    setAligment(event.target.value);
    handleBoxChange(event, "eventChange");
  };

  return (
    <Modal show={open} onHide={closeFn}>
      <Modal.Header>
        <Modal.Title>Component </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Width: {meta.width}</p>
        <p>Height: {meta.height}</p>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            name="boxTitle"
            onChange={(e) => changeForm(e)}
            defaultValue={meta.style.content.header.title.text}
          />
        </div>
        <div className="form-group">
          <label>Sub Title</label>
          <input
            type="text"
            className="form-control"
            name="boxSubTitle"
            onChange={(e) => changeForm(e)}
            defaultValue={meta.style.content.header.subTitle.text}
          />
        </div>
        <label>Aligment</label>
        <div className="row">
          <div className="col-md-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="textAlign"
                onChange={changeOption}
                value="left"
                checked={aligment === "left"}
              />

              <label className="form-check-label">Left</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="textAlign"
                onChange={changeOption}
                value="center"
                checked={aligment === "center"}
              />

              <label className="form-check-label">Center</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="textAlign"
                onChange={changeOption}
                value="right"
                checked={aligment === "right"}
              />

              <label className="form-check-label">Right</label>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" onClick={closeFn}>
          Close
        </button>
        <button
          type="button"
          onClick={(e) => deleteItem(e, meta.style.content.id)}
        >
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export const ModalVisually = ({
  closeFn = () => null,
  handleBoxCreate = () => null,
  open = true,
}) => {
  const [subTitleForm, setSubTitleForm] = useState("");
  const [descForm, setDescForm] = useState("");

  const dummyChart = {
    title: {
      text: "Income of Germany and France since 1950",
    },
    color: "red", //default color
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
      },
    ],
  };
  const createBox = (event) => {
    event.preventDefault();

    let data = {
      minW: 3,
      minH: 3,
      x: 0,
      y: 2,
      w: 4,
      h: 3,
      moved: false,
      static: false,
      content: {
        id: randid(10),
        color: "red", //default color
        category: "body",
        class: "card",
        header: {
          title: {
            text: dummyChart.title.text,
            size: "17px",
            class: "card-title",
            weight: "normal",
          },
          subTitle: {
            text: subTitleForm,
            size: "9px",
          },
          description: {
            text: descForm,
          },
        },
        body: {
          type: "chart",
          raw: dummyChart,
        },
      },
    };
    handleBoxCreate(event, data);
    closeFn(event);
  };

  return (
    <Modal show={open} onHide={closeFn}>
      <Modal.Header>
        <Modal.Title>Create Visualization</Modal.Title>
      </Modal.Header>
      <form onSubmit={createBox}>
        <Modal.Body>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              name="boxTitle"
              value={dummyChart.title.text}
              disabled={true}
            />
          </div>
          <div className="form-group">
            <label>Sub Title</label>
            <input
              type="text"
              className="form-control"
              name="boxSubTitle"
              value={subTitleForm}
              onChange={(e) => setSubTitleForm(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              type="text"
              className="form-control"
              name="desc"
              value={descForm}
              onChange={(e) => setDescForm(e.target.value)}
            />
          </div>
          <ReactECharts option={dummyChart} />
        </Modal.Body>
        <Modal.Footer>
          <button type="button" onClick={closeFn}>
            Close
          </button>
          <button type="submit">Create</button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export const ModalTitle = ({
  closeFn = () => null,
  handleBoxCreate = () => null,
  open = true,
}) => {
  const createBox = (event) => {
    event.preventDefault();
    let data = {
      minW: 12,
      minH: 1,
      x: 0,
      y: 2,
      w: 12,
      h: 1,
      moved: false,
      static: false,
      content: {
        color: "red", //default color
        id: randid(10),
        category: "title",
        class: "card flex-row",
        header: {
          class: "",
          title: {
            text: "Text title",
            size: "17px",
            class: "card-title",
            weight: "normal",
          },
          subTitle: {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. consectetur adipiscing elit",
            size: "12px",
          },
          textAlign: "center",
        },
        body: {
          type: "image",
          raw: "//placehold.it/100",
        },
      },
    };
    handleBoxCreate(event, data);
    closeFn(event);
  };
  return (
    <Modal show={open} onHide={closeFn}>
      <Modal.Header>
        <Modal.Title>Create Title</Modal.Title>
      </Modal.Header>
      <form onSubmit={createBox}>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <button type="button" onClick={closeFn}>
            Close
          </button>
          <button type="submit">Create</button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
