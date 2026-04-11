import React from 'react';
import { useCursor } from '../../hooks/useCursor';

const CustomCursor: React.FC = () => {
  const { outerRef, innerRef } = useCursor();

  return (
    <div className="pointer-events-none hidden md:block z-[10000]">
      {/* Outer Circle */}
      <div
        ref={outerRef}
        className="fixed left-0 top-0 w-10 h-10 border border-gold rounded-full mix-blend-difference"
        style={{
          transform: 'translate3d(0, 0, 0)',
          marginLeft: '-20px',
          marginTop: '-20px',
          transition: 'background-color 0.2s',
        }}
      />
      {/* Inner Dot */}
      <div
        ref={innerRef}
        className="fixed left-0 top-0 w-1.5 h-1.5 bg-gold rounded-full mix-blend-difference"
        style={{
          transform: 'translate3d(0, 0, 0)',
          marginLeft: '-3px',
          marginTop: '-3px',
        }}
      />
    </div>
  );
};

export default CustomCursor;
