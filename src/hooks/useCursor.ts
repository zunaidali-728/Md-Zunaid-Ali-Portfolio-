import { useEffect, useRef } from 'react';

/**
 * Custom JS Split Text to emulate basic SplitText "chars" or "words"
 * Used as a fallback when GSAP premium SplitText is not available
 */
export const splitTextElements = (
  element: HTMLElement | null,
  splitType: 'chars' | 'words' | 'lines' = 'chars'
) => {
  if (!element) return [];

  const text = element.innerText;
  element.innerHTML = '';
  element.style.opacity = '1'; // prevent flash of unstyled text if was hidden
  
  const nodes: HTMLElement[] = [];

  if (splitType === 'chars') {
    text.split('').forEach((char) => {
      const span = document.createElement('span');
      // preserving html spaces
      span.innerHTML = char === ' ' ? '&nbsp;' : char;
      span.style.display = 'inline-block';
      element.appendChild(span);
      nodes.push(span);
    });
  } else if (splitType === 'words') {
    text.split(/(\s+)/).forEach((word) => {
      if (word.trim().length === 0) {
        element.appendChild(document.createTextNode(word));
      } else {
        const span = document.createElement('span');
        span.innerText = word;
        span.style.display = 'inline-block';
        element.appendChild(span);
        nodes.push(span);
      }
    });
  } else if (splitType === 'lines') {
    // Simple line splitter wrapping each "word" setup in inline-block, 
    // then detecting Y-offset changes. For simplicity, just words.
    // A robust robust line splitter requires measuring offsets.
    // For now we'll just handle basic line breaks if text has \n.
    text.split('\n').forEach((line) => {
      const lineWrap = document.createElement('div');
      lineWrap.style.overflow = 'hidden';
      const innerSpan = document.createElement('span');
      innerSpan.innerText = line;
      innerSpan.style.display = 'inline-block';
      lineWrap.appendChild(innerSpan);
      element.appendChild(lineWrap);
      nodes.push(innerSpan);
    });
  }

  return nodes;
};

// Hook for Custom Cursor
export const useCursor = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouse = { x: 0, y: 0 };
    let outer = { x: 0, y: 0 };
    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Instantly move inner
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea')) {
        isHovering = true;
      } else {
        isHovering = false;
      }
    };

    const handleMouseDown = () => {
      outerRef.current?.style.setProperty('--scale', '0.8');
      innerRef.current?.style.setProperty('--scale', '0.8');
    };
    
    const handleMouseUp = () => {
      outerRef.current?.style.setProperty('--scale', isHovering ? '2' : '1');
      innerRef.current?.style.setProperty('--scale', '1');
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation loop for outer lag
    let reqId: number;
    const animate = () => {
      // Lerp outer cursor
      outer.x += (mouse.x - outer.x) * 0.12;
      outer.y += (mouse.y - outer.y) * 0.12;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${outer.x}px, ${outer.y}px, 0) scale(var(--scale, 1))`;
        
        if (isHovering) {
          outerRef.current.style.setProperty('--scale', '2');
          outerRef.current.style.backgroundColor = 'rgba(200, 169, 110, 0.1)';
        } else {
          outerRef.current.style.setProperty('--scale', '1');
          outerRef.current.style.backgroundColor = 'transparent';
        }
      }
      reqId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(reqId);
    };
  }, []);

  return { outerRef, innerRef };
};
