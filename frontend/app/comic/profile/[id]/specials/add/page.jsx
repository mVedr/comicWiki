import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function AddSpecial() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: 10,
      }}
    >
      <FloatingLabel
        controlId="floatingInput"
        label="Special Title"
        className="mb-3"
      >
        <Form.Control type="text" />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Youtube URL"
        className="mb-3"
      >
        <Form.Control type="text" />
      </FloatingLabel>
      <FloatingLabel className="mb-3" label="Movie Description">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: "100px" }}
        />
      </FloatingLabel>
      <Button variant="primary">Add Special</Button>
    </div>
  );
}

export default AddSpecial;
