import Svg, { Path } from 'react-native-svg'

interface ProfileIconProps {
  size: number
  color: string
  isFill?: boolean
}

export function ProfileIcon({ size, color, isFill = false }: ProfileIconProps) {
  if (isFill) {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M12.7496 10.6179C15.1089 10.6179 17.0216 8.70618 17.0216 6.34793C17.0216 3.98967 15.1089 2.07793 12.7496 2.07793C10.3902 2.07793 8.47754 3.98967 8.47754 6.34793C8.47754 8.70618 10.3902 10.6179 12.7496 10.6179Z"
          fill={color}
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M19.2931 17.2564C21.3828 18.7087 19.9717 21.5097 17.461 21.5097H8.03252C5.52181 21.5097 4.11077 18.7087 6.20043 17.2564C8.0748 15.9537 10.3258 15.1945 12.7468 15.1945C15.1677 15.1945 17.4187 15.9537 19.2931 17.2564Z"
          fill={color}
          stroke={color}
          strokeWidth="2"
        />
      </Svg>
    )
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 18 22" fill="none">
      <Path
        d="M8.74955 9.61793C11.1089 9.61793 13.0216 7.70618 13.0216 5.34793C13.0216 2.98967 11.1089 1.07793 8.74955 1.07793C6.39018 1.07793 4.47754 2.98967 4.47754 5.34793C4.47754 7.70618 6.39018 9.61793 8.74955 9.61793Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.2931 16.2564C17.3828 17.7087 15.9717 20.5097 13.461 20.5097H4.03252C1.52181 20.5097 0.110769 17.7087 2.20043 16.2564C4.0748 14.9537 6.32582 14.1945 8.74676 14.1945C11.1677 14.1945 13.4187 14.9537 15.2931 16.2564Z"
        stroke={color}
        strokeWidth="1.5"
      />
    </Svg>
  )
}
