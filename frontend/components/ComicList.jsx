import React, { useRef, useState } from 'react';
import ComicCard from './ComicCard';
const ComicCardList = ({ data }) => {
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef(null);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!startX) return;
    const x = e.touches[0].clientX;
    const distance = startX - x;
    containerRef.current.scrollLeft = scrollLeft + distance;
  };

  const handleTouchEnd = () => {
    setStartX(null);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  return (
    <div
      ref={containerRef}
      style={{
        height: '350px',
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {data.map((data, index) => (
        <div key={index} style={{ marginRight: 10 }}>
          <ComicCard data={data} />
        </div>
      ))}

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginLeft: 20,
        }}
      >
        <h2>Read More...</h2>
      </div>
    </div>
  );
};

export default ComicCardList