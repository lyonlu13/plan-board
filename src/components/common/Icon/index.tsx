import { IconType } from 'react-icons'
import { MdWarning } from 'react-icons/md'
import * as MdIcons from 'react-icons/md'
import { MouseEventHandler } from 'react'

type Key = keyof typeof MdIcons
export default function Icon({
  icon,
  size = 24,
  color = 'gray',
  style,
  onClick,
}: Props) {
  const Target: IconType | undefined = MdIcons[icon as Key]
  if (Target)
    return (
      <Target
        style={{
          fontSize: size,
          color: color,
          ...style,
        }}
        onClick={onClick}
      />
    )
  else return <MdWarning />
}

interface Props {
  icon: string
  size?: number
  color?: string
  style?: StyleSheetList
  onClick?: MouseEventHandler
}
