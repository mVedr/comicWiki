import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
function CreateComic() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "5px",
      }}
    >
      <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
        <Form.Control type="text" placeholder="Name" />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="DOB (yyyy-mm-dd)"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="DOB" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="Age" className="mb-3">
        <Form.Control type="number" placeholder="Age" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingTextarea2" label="Decription"  className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Description"
          style={{ height: "120px", width: "420px" }}
        />
      </FloatingLabel>
      <Button variant="primary" >
          Register
        </Button>
    </div>
  );
}

export default CreateComic;
