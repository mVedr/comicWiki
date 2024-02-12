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
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent:'flex-start',
          alignItems: 'center'
        }} 
      >{children}</div>
    </div>
  );
}

export default layout;
