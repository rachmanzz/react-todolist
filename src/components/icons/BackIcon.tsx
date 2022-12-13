import { iconType } from "../../interfaces/IconType"

const BackIcon = ({ size = 42, fill = "none", height, width, color, ...props }: iconType) => {
  const nextWidth = width || size
  const nextHeight = height || size
  return (
    <svg
      width={nextWidth}
      height={nextHeight}
      fill={fill}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.66675 16L14.6667 24"
        stroke="#111111"
        strokeWidth={5}
        strokeLinecap="square"
      />
      <path
        d="M6.66675 16L14.6667 8"
        stroke="#111111"
        strokeWidth={5}
        strokeLinecap="square"
      />
    </svg>
  )
}

export default BackIcon;