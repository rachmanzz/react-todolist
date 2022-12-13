import { iconType } from "../../interfaces/IconType"

const SortAsc = ({ size = 42, fill = "none", height, width, color, ...props }: iconType) => {
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
        d="M9.6709 6.2858V3.30081C9.6709 2.47695 10.041 2.10681 10.8649 2.10681C11.6888 2.10681 12.0589 2.47695 12.0589 3.30081V6.2858M12.0589 4.49481H9.6709"
        stroke="#16ABF8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0589 12.8528H9.6709L12.0589 8.6738H9.6709"
        stroke="#16ABF8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.104 9.27081L4.895 11.0618L6.686 9.27081"
        stroke="#16ABF8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.89502 3.8978V11.0618"
        stroke="#16ABF8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default SortAsc;