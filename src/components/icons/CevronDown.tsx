import { iconType } from "../../interfaces/IconType"

const CevronDown = ({size=42, fill="none", height, width, color, ...props}: iconType) => {
    const nextWidth = width || size
    const nextHeight = height || size
    return (
        <svg
          width={nextWidth}
          height={nextHeight}
          fill={fill}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path d="M6 9L12 15L18 9" stroke={color||"#111111"} strokeLinecap="square" />
        </svg>
      )
}
  
  export default CevronDown;