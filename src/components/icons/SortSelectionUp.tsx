import { iconType } from "../../interfaces/IconType"

const SortSelectionUp = ({ size = 42, fill = "none", height, width, color, ...props }: iconType) => {
  const nextWidth = width || size
  const nextHeight = height || size
  return (
    <svg
      width={nextWidth}
      height={nextHeight}
      fill={fill}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
      d="M3.104 4.50589H7.283"
      stroke="#16ABF8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.104 8.08789H7.283"
      stroke="#16ABF8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.104 11.6699H8.47699"
      stroke="#16ABF8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.6709 6.29689L11.4619 4.50589L13.2529 6.29689"
      stroke="#16ABF8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.4619 4.50589V11.6699"
      stroke="#16ABF8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    </svg>
  )
}

export default SortSelectionUp;