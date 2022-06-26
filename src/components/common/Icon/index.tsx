import { IconType } from 'react-icons'
import { MdWarning } from 'react-icons/md'
import * as MdIcons from 'react-icons/md'
import * as TbIcons from 'react-icons/tb'
import * as CgIcons from 'react-icons/cg'
import { MouseEventHandler } from 'react'

type MdKey = keyof typeof MdIcons
type TbKey = keyof typeof TbIcons
type CgKey = keyof typeof CgIcons

export default function Icon({
  icon,
  size = 24,
  color = 'gray',
  style,
  onClick,
  className,
}: Props) {
  const Target: IconType | undefined = icon.startsWith('Md')
    ? MdIcons[icon as MdKey]
    : icon.startsWith('Tb')
    ? TbIcons[icon as TbKey]
    : CgIcons[icon as CgKey]
  if (Target)
    return (
      <Target
        className={className}
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
  style?: React.CSSProperties
  onClick?: MouseEventHandler
  className?: string
}
