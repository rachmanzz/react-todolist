import { iconType } from "../../interfaces/IconType"

const UnfinishedIcon = ({ size = 42, fill = "none", height, width, color, ...props }: iconType) => {
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
        d="M2.50684 5.47264L4.89483 3.08464M4.89483 3.08464L7.28283 5.47264M4.89483 3.08464V11.4426"
        stroke="#16ABF8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.253 9.05463L10.865 11.4426M10.865 11.4426L8.47705 9.05463M10.865 11.4426V3.08464"
        stroke="#16ABF8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default UnfinishedIcon;