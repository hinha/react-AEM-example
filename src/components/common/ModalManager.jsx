import { ModalProperties, ModalVisually, ModalTitle } from "./Modal";

const initModalProperties = {
  arrange: {
    clientWidth: 0,
    clientHeight: 0,
  },
  style: {
    content: {
      id: "3",
      header: {
        title: {
          class: "card-title",
          size: "17px",
          text: "Title 3",
          weight: "normal",
        },
        subTitle: {
          text: "",
          size: "0px",
        },
        textAlign: "",
      },
      body: {
        type: "html",
        raw: null,
      },
    },
    h: 0,
    i: "0",
    minH: 2,
    minW: 2,
    w: 0,
    x: 0,
    y: 0,
  },
};

const ModalManager = ({
  closeFn = () => null,
  handleBoxChange = () => null,
  handleBoxCreate = () => null,
  handleBoxRemove = () => null,
  modal = "",
  properties = initModalProperties,
}) => {
  let sendData;
  if (Object.keys(properties).length > 0) {
    sendData = {
      width: properties.arrange.clientWidth,
      height: properties.arrange.clientHeight,
      style: properties.style[0],
    };
  } else {
    sendData = initModalProperties;
  }

  return (
    <>
      <ModalProperties
        closeFn={closeFn}
        handleBoxChange={handleBoxChange}
        handleBoxRemove={handleBoxRemove}
        open={modal === "box-properties"}
        meta={sendData}
      />
      <ModalVisually
        closeFn={closeFn}
        handleBoxCreate={handleBoxCreate}
        open={modal === "box-visualization"}
      />
      <ModalTitle
        closeFn={closeFn}
        handleBoxCreate={handleBoxCreate}
        open={modal === "box-title"}
      />
    </>
  );
};

export default ModalManager;
