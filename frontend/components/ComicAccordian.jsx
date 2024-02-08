import Link from "next/link";
import React from "react";
import Accordion from "react-bootstrap/Accordion";
function ComicAccordian({ data }) {
  return (
    <Accordion defaultActiveKey="0">
      {data.map((cdata, index) => (
        <Accordion.Item eventKey={`${index}`}>
          <Accordion.Header>{cdata.name}</Accordion.Header>
          <Accordion.Body>
            <Link href={`/comic/${cdata.id}`}>Visit</Link>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default ComicAccordian;
