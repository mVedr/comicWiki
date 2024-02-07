import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ComicCard from "./ComicCard";

function ComicGrid({ data }) {
  const numRows = Math.ceil(data.length / 3);

  const rows = Array.from({ length: numRows }, (_, rowIndex) =>
    data.slice(rowIndex * 3, rowIndex * 3 + 3)
  );

  return (
    <Container>
      {rows.map((row, index) => (
        <Row key={index}>
          {row.map((item, colIndex) => (
            <Col key={colIndex}>
              <ComicCard data={item} />
            </Col>
          ))}
          {row.length < 3 &&
            Array.from({ length: 3 - row.length }).map((_, i) => (
              <Col key={`empty-${i}`} />
            ))}
        </Row>
      ))}
    </Container>
  );
}

export default ComicGrid;
