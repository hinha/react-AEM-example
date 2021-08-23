import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ReactECharts from "echarts-for-react";

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
  const changeForm = (value) => {
    handleBoxChange(value, "eventChange");
  };
  const deleteItem = (event, id) => {
    event.preventDefault();
    handleBoxRemove(id);
    closeFn(event);
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
