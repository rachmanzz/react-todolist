import { iconType } from "../../interfaces/IconType"

const SortDesc = ({ size = 42, fill = "none", height, width, color, ...props }: iconType) => {
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
        d="M9.6709 13.2447V10.2597C9.6709 9.43586 10.041 9.06572 10.8649 9.06572C11.6888 9.06572 12.0589 9.43586 12.0589 10.2597V13.2447M12.0589 11.4537H9.6709"
        stroke="#16ABF8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0589 6.67773H9.6709L12.0589 2.49873H9.6709"
        stroke="#16ABF8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.104 9.66272L4.895 11.4537L6.686 9.66272"
        stroke="#16ABF8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.89502 4.28973V11.4537"
        stroke="#16ABF8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default SortDesc;