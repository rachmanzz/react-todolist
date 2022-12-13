import { iconType } from "../../interfaces/IconType"

const SortSelectionDown = ({ size = 42, fill = "none", height, width, color, ...props }: iconType) => {
  const nextWidth = width || size
  const nextHeight = height || size
  return (
    <svg
      width={nextWidth}
      height={nextHeight}
      fill={fill}
      viewBox="0 0 16 15"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.104 4.11398H8.47699"
        stroke="#16ABF8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.104 7.69598H7.283"
        stroke="#16ABF8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.104 11.278H7.283"
        stroke="#16ABF8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.6709 9.48697L11.4619 11.278L13.2529 9.48697"
        stroke="#16ABF8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.4619 4.11398V11.278"
        stroke="#16ABF8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default SortSelectionDown;