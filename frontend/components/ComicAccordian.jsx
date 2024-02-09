import Link from "next/link";
import Accordion from "react-bootstrap/Accordion";
function ComicAccordian({ data }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "lightblue"
      }}
    >
      <Accordion defaultActiveKey="0">
        {data.map((cdata, index) => (
          <Accordion.Item eventKey={`${index}`} style={{background:""}}>
            <Accordion.Header>{cdata.name}</Accordion.Header>
            <Accordion.Body>
              <Link href={`/comic/${cdata.id}`}>Visit</Link>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}

export default ComicAccordian;
