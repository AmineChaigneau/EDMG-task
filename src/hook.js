import { useState, useEffect, useRef } from "react";

// export const useMousePosition = () => {
//   const [mousePosition, setMousePosition] = useState([]);

//   const updateMousePosition = ev => {
//     const position = { x: ev.clientX, y: ev.clientY }
//     setMousePosition(mousePosition => [...mousePosition, position]);
//   };

//   useEffect(() => {
//     window.addEventListener("mousemove", updateMousePosition);

//     return () => window.removeEventListener("mousemove", updateMousePosition);
//   }, []);

//   return mousePosition;
// };

export const useMousePosition = (start) => {
  const [mousePosition, setMousePosition] = useState([]);

  const updateMousePosition = ev => {
    const d1 = new Date();
    const position = { time: d1.getTime() - start, x: ev.clientX, y: ev.clientY }
    // console.log(position)
    setMousePosition(mousePosition => [...mousePosition, position]);
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
};

export function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export const useBbox = () => {
  const ref = useRef();
  const [bbox, setBbox] = useState({});

  const set = () =>
    setBbox(ref && ref.current ? ref.current.getBoundingClientRect() : {});

  useEffect(() => {
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, []);

  return [bbox, ref];
};

export function getCurrentTrialCondition(role, nbtrial) {
  const condition = role;

  switch (true) {
    case (nbtrial < 8):
      if (condition) {
        return 'condition 1'
      } else {
        return 'condition 2'
      }
    case (nbtrial >= 8 && nbtrial < 16):
      if (condition) {
        return 'condition 2'
      } else {
        return 'condition 1'
      }
    case (nbtrial >= 16 && nbtrial < 24):
      if (condition) {
        return 'condition 1'
      } else {
        return 'condition 2'
      }
    case (nbtrial >= 24 && nbtrial <= 32):
      if (condition) {
        return 'condition 2'
      } else {
        return 'condition 1'
      }
    case (nbtrial >= 32 && nbtrial <= 40):
      if (condition) {
        return 'condition 1'
      } else {
        return 'condition 2'
      }
    case (nbtrial >= 40 && nbtrial <= 48):
      if (condition) {
        return 'condition 2'
      } else {
        return 'condition 1'
      }
    default:
      return 'condition 1'
  }
}