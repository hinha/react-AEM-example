import { ModalContentResize } from "./Modal";

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
      },
      body: "",
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
  modal = "",
  properties = initModalProperties,
}) => {
  let sendData;
  if (Object.keys(properties).length) {
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
      <ModalContentResize
        closeFn={closeFn}
        handleBoxChange={handleBoxChange}
        open={modal === "box-properties"}
        meta={sendData}
      />
    </>
  );
};

export default ModalManager;
