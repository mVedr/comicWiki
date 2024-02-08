import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function ComicTable({ data }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Comic</th>
          <th>Timeline</th>
          <th>Profile</th>
        </tr>
      </thead>
      <tbody>
        {data.map((data, ind) => {
          return (
            <tr key={ind}>
              <td>{data.name}</td>
              <td>
                <Button variant="primary" href={`/timeline/${data.id}`}>
                  Visit
                </Button>
              </td>
              <td>
                <Button variant="secondary" href={`/comic/${data.id}`}>
                  Visit
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default ComicTable;
