import { iconType } from "../../interfaces/IconType"

const SelectedIcon = ({ size = 42, fill = "none", height, width, color, ...props }: iconType) => {
  const nextWidth = width || size
  const nextHeight = height || size
  return (
    <svg
      width={nextWidth}
      height={nextHeight}
      fill={fill}
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.00098 7.69596L5.98597 10.681L11.956 4.71097"
        stroke={color || "#4A4A4A"}
        strokeLinecap="square"
      />
    </svg>
  )
}

export default SelectedIcon;