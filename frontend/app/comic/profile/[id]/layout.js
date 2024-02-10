"use client";
import ComicProfileSidebar from "../../../../components/ComicProfileSidebar";
function layout({ children,params }) {
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'space-around',
       alignItems: 'center'
    }}>
      <ComicProfileSidebar id={params.id} />
      <div>{children}</div>
    </div>
  );
}

export default layout;
