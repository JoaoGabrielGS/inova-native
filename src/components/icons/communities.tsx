import Svg, { Path } from 'react-native-svg'

interface CommunitiesIconProps {
  size: number
  color: string
  isFill?: boolean
}

export function CommunitiesIcon({
  size,
  color,
  isFill = false
}: CommunitiesIconProps) {
  if (!isFill) {
    return (
      <Svg width={size} height={size} viewBox="0 0 27 24" fill="none">
        <Path
          d="M19.8698 11.5108C22.0463 11.5108 23.8108 9.73856 23.8108 7.55238C23.8108 5.86125 22.7549 4.4178 21.2692 3.85081"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M7.18787 11.5108C5.01131 11.5108 3.24686 9.73856 3.24686 7.55238C3.24686 5.86125 4.30269 4.4178 5.78838 3.85081"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M13.4496 10.6179C15.809 10.6179 17.7216 8.70618 17.7216 6.34793C17.7216 3.98967 15.809 2.07793 13.4496 2.07793C11.0903 2.07793 9.17761 3.98967 9.17761 6.34793C9.17761 8.70618 11.0903 10.6179 13.4496 10.6179Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M19.9932 17.2564C22.0828 18.7087 20.6718 21.5097 18.1611 21.5097H8.7326C6.22188 21.5097 4.81084 18.7087 6.9005 17.2564C8.77487 15.9537 11.0259 15.1945 13.4468 15.1945C15.8678 15.1945 18.1188 15.9537 19.9932 17.2564Z"
          stroke={color}
          strokeWidth="1.5"
        />
        <Path
          d="M17.5867 21.5095H23.5627C25.8788 21.5095 27.1806 18.9255 25.2528 17.5857C24.7205 17.2158 24.1553 16.8934 23.5627 16.6242"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <Path
          d="M9.47107 21.5095H3.49508C1.1789 21.5095 -0.122813 18.9255 1.80493 17.5857C2.33724 17.2158 2.90248 16.8934 3.49508 16.6242"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </Svg>
    )
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 29 24" fill="none">
      <Path
        d="M21.1618 11.3657C23.3478 11.3657 25.1199 9.59355 25.1199 7.40753C25.1199 5.22151 23.3478 3.44939 21.1618 3.44939C18.9757 3.44939 17.2036 5.22151 17.2036 7.40753C17.2036 9.59355 18.9757 11.3657 21.1618 11.3657Z"
        fill={color}
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.16176 11.3657C10.3478 11.3657 12.1199 9.59355 12.1199 7.40753C12.1199 5.22151 10.3478 3.44939 8.16176 3.44939C5.97573 3.44939 4.20361 5.22151 4.20361 7.40753C4.20361 9.59355 5.97573 11.3657 8.16176 11.3657Z"
        fill={color}
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.9496 11.3658C23.1356 11.3658 24.9077 9.59373 24.9077 7.40771C24.9077 5.71669 23.8473 4.27335 22.3552 3.70639"
        stroke="white"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.21265 11.3658C6.02662 11.3658 4.2545 9.59373 4.2545 7.40771C4.2545 5.71669 5.31493 4.27335 6.80707 3.70639"
        stroke="white"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M27.5682 16.926C29.5044 18.2155 28.197 20.7026 25.8707 20.7026H17.135C14.8087 20.7026 13.5014 18.2155 15.4375 16.926C17.1741 15.7694 19.2598 15.0953 21.5029 15.0953C23.7459 15.0953 25.8316 15.7694 27.5682 16.926Z"
        fill={color}
        stroke="white"
      />
      <Path
        d="M13.5682 16.926C15.5044 18.2155 14.197 20.7026 11.8707 20.7026H3.13498C0.80873 20.7026 -0.498641 18.2155 1.43749 16.926C3.17415 15.7694 5.25978 15.0953 7.50286 15.0953C9.74594 15.0953 11.8316 15.7694 13.5682 16.926Z"
        fill={color}
        stroke="white"
      />
      <Path
        d="M14.5015 10.5812C16.8712 10.5812 18.7921 8.66021 18.7921 6.29059C18.7921 3.92096 16.8712 2 14.5015 2C12.1319 2 10.2109 3.92096 10.2109 6.29059C10.2109 8.66021 12.1319 10.5812 14.5015 10.5812Z"
        fill={color}
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21.0735 16.6093C23.1723 18.0071 21.7551 20.7031 19.2335 20.7031H9.764C7.24237 20.7031 5.8252 18.0071 7.92394 16.6093C9.80646 15.3555 12.0673 14.6248 14.4987 14.6248C16.9302 14.6248 19.191 15.3555 21.0735 16.6093Z"
        fill={color}
        stroke="white"
      />
    </Svg>
  )
}
