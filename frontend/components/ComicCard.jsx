import { carlin } from "@/constants";
import Link from 'next/link';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
function ComicCard({data}) {
  return (
    <Card style={{width:"15rem" ,padding:"1rem"}}>
      <Card.Img variant="top" src={carlin} height={160} width={120} />
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Subtitle>{data.dob}</Card.Subtitle>
        <Card.Text>
          {data.desc}
        </Card.Text>
        <Link href={`/comic/${data.id}`}><Button variant="primary">Read more...</Button></Link>
        
      </Card.Body>
    </Card>
  );
}

export default ComicCard;
