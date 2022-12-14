import { iconType } from "../../interfaces/IconType"

const LoadingIcon = ({ size = 42, fill = "none", height, width, color, ...props }: iconType) => {
  const nextWidth = width || size
  const nextHeight = height || size
  return (
    <svg
      className="animate-spin"
      width={nextWidth}
      height={nextHeight}
      fill={fill}
      viewBox="0 0 25 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
            d="M12.2246 4.53341V2.53341C10.9114 2.53341 9.61103 2.79207 8.39777 3.29462C7.18452 3.79717 6.08213 4.53376 5.15354 5.46235C3.27818 7.33771 2.22461 9.88125 2.22461 12.5334H4.22461C4.22461 10.4117 5.06746 8.37685 6.56776 6.87656C8.06805 5.37627 10.1029 4.53341 12.2246 4.53341V4.53341Z"
            fill={color}
          />
    </svg>
  )
}

export default LoadingIcon;