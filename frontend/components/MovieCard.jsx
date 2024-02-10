import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
function MovieCard({ data, disableVideo }) {
  return (
    <Card style={{ width: "18rem" }}>
      {disableVideo ? (
        <iframe width="300" height="280" src={data.url}></iframe>
      ) : (
        <></>
      )}

      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Text>{data.description}</Card.Text>
        {!disableVideo ? (
          <Button variant="primary">Update</Button>
        ) : (
          <Button variant="primary">Visit</Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
