import Button from 'react-bootstrap/Button';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
function Socials() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <FloatingLabel
        label="Instagram URL"
        style={{
          margin: 4,
        }}
      >
        <Form.Control type="url"></Form.Control>
      </FloatingLabel>

      <FloatingLabel
        label="Twitter URL"
        style={{
          margin: 4,
        }}
      >
        <Form.Control type="text"></Form.Control>
      </FloatingLabel>
      <FloatingLabel
        label="Wikifeet URL"
        style={{
          margin: 4,
        }}
      >
        <Form.Control type="text"></Form.Control>
      </FloatingLabel>
      <FloatingLabel
        label="Wikifeet Score"
        style={{
          margin: 4,
        }}
      >
        <Form.Control type="number"></Form.Control>
      </FloatingLabel>
      <Button variant="primary">Update</Button>
    </div>
  );
}

export default Socials;
