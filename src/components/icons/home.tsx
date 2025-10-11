import Svg, { Path } from 'react-native-svg'

interface HomeIconProps {
  size: number
  color: string
  isFill?: boolean
}

export function HomeIcon({ size, color, isFill = false }: HomeIconProps) {
  if (isFill) {
    return (
      <Svg width={size} height={size} viewBox="0 0 30 31" fill="none">
        <Path
          d="M4 12.05L15 4L26 12.05V24.7C26 25.31 25.7425 25.895 25.284 26.3263C24.8256 26.7577 24.2039 27 23.5556 27H6.44444C5.79614 27 5.17438 26.7577 4.71596 26.3263C4.25754 25.895 4 25.31 4 24.7V12.05Z"
          fill={color}
        />
        <Path d="M11.3333 27V15.5H18.6667V27" fill={color} />
        <Path
          d="M11.3333 27V15.5H18.6667V27M4 12.05L15 4L26 12.05V24.7C26 25.31 25.7425 25.895 25.284 26.3263C24.8256 26.7577 24.2039 27 23.5556 27H6.44444C5.79614 27 5.17438 26.7577 4.71596 26.3263C4.25754 25.895 4 25.31 4 24.7V12.05Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    )
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 30 32" fill="none">
      <Path
        d="M11.3333 27.5V15.5081H18.6667V27.5M4 11.9106L15 4.5L26 11.9106V25.1016C26 25.7377 25.7425 26.3478 25.284 26.7975C24.8256 27.2473 24.2039 27.5 23.5556 27.5H6.44444C5.79614 27.5 5.17438 27.2473 4.71596 26.7975C4.25754 26.3478 4 25.7377 4 25.1016V11.9106Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
