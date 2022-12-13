import { iconType } from "../../interfaces/IconType"

const SampleIcon = ({size=42, fill="none", height, width, color, ...props}: iconType) => {
    const nextWidth = width || size
    const nextHeight = height || size
    return (
        <svg
          width={nextWidth}
          height={nextHeight}
          fill={fill}
          viewBox="0 0 42 42"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d=""
            fill={color || "#F39508"}
          />
        </svg>
      )
}
  
  export default SampleIcon;