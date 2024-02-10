import Link from "next/link";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { carlin } from "../constants";
function ComicCard({ data }) {
  return (
    <div style={{
      margin: 3,
      padding: 3
    }}>
      <Card style={{ width: "15rem", padding: "1rem" }}>
        <Card.Img variant="top" src={carlin} height={160} width={120} />
        <Card.Body>
          <Card.Title>{data.name}</Card.Title>
          <Card.Subtitle>{data.dob}</Card.Subtitle>
          <Link href={`/comic/${data.id}`}>
            <Button variant="primary">Read more...</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ComicCard;
