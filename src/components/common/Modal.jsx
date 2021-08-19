import Modal from "react-bootstrap/Modal";

const defaultMeta = {
  height: 0,
  width: 0,
};

export const ModalContentResize = ({
  closeFn = () => null,
  handleBoxChange = () => null,
  open = true,
  meta = defaultMeta,
}) => {
  const changeForm = (value, index) => {
    handleBoxChange(value, index);
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
      </Modal.Footer>
    </Modal>
  );
};
