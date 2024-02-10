import Button from 'react-bootstrap/Button';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
function PersonalInfo() {
  return (
    <div
      style={{
        "display":"flex",
        "flexDirection":"column",
        "alignContent":"center",
        "justifyContent":"center",
        "margin": 12
      }}
    >
      <FloatingLabel label="Name" className="mb-3">
        <Form.Control type="text" />
      </FloatingLabel>
      <FloatingLabel label="Date Of Birth (YYYY-MM-DD)" className="mb-3">
        <Form.Control type="text" />
      </FloatingLabel>
      <FloatingLabel label="Age" className="mb-3">
        <Form.Control type="number" />
      </FloatingLabel>
      <Form.Select className="mb-3">
        <option value={1}>Alive</option>
        <option value={2}>Dead</option>
      </Form.Select>
      <FloatingLabel label="Date Of Birth (YYYY-MM-DD)" className="mb-3">
        <Form.Control type="text" />
      </FloatingLabel>
      <Button variant="primary">Update</Button>
    </div>
  );
}

export default PersonalInfo;
