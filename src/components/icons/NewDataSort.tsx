import { iconType } from "../../interfaces/IconType"

const NewDataSort = ({ size = 42, fill = "none", height, width, color, ...props }: iconType) => {
  const nextWidth = width || size
  const nextHeight = height || size
  return (
    <svg
      width={nextWidth}
      height={nextHeight}
      fill={fill}
      viewBox="0 0 54 54"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18 24L22 20M22 20L26 24M22 20V34"
        stroke="#888888"
        strokeWidth={1.5}
        strokeLinecap="square"
      />
      <path
        d="M36 30L32 34M32 34L28 30M32 34V20"
        stroke="#888888"
        strokeWidth={1.5}
        strokeLinecap="square"
      />
      <rect x={0.5} y={0.5} width={53} height={53} rx={26.5} stroke="#E5E5E5" />
    </svg>
  )
}

export default NewDataSort;