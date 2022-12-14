import { ReactElement, useEffect, useMemo, useRef, useState } from "react";

type DivWrapperType = {
  children: (size: [number, number]) => ReactElement,
  // top, right, bottom, left
  paddings?: [number, number, number, number],
  className?: string
  style?: React.CSSProperties
}
const DivWrapper = ({children, paddings, ...props}: DivWrapperType) => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<[number, number]>();
  const nextSize: [number,number] | null = useMemo(()=> {
    if (size) {
      const [width, height] = size;
      if (paddings) {
        const [top, right, bottom, left] = paddings;
        return [width - (right + left), height - (top + bottom)];
      }
      return size;
    }
    return null;
  }, [size, paddings]);
  useEffect(()=> {
    let onSubcribe = true;
    if (ref.current && onSubcribe) {
      const current = ref.current
      const resize = () => setSize([current.clientWidth, current.clientHeight]);
      resize();
      current.addEventListener("resize", resize);
      return () => {
        current.removeEventListener("resize", resize);
        onSubcribe = false;
      }
    }
    return () => onSubcribe = false;
  }, [ref]);

  return (<div ref={ref} {...props}>{nextSize && children(nextSize)}</div>)
}

export default DivWrapper;