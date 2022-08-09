import { IconType } from "react-icons";
import { MdWarning } from "react-icons/md";
import * as MdIcons from "react-icons/md";
import * as TbIcons from "react-icons/tb";
import * as CgIcons from "react-icons/cg";
import * as VsIcons from "react-icons/vsc";
import * as AiIcons from "react-icons/ai";
import { MouseEventHandler } from "react";

type MdKey = keyof typeof MdIcons;
type TbKey = keyof typeof TbIcons;
type CgKey = keyof typeof CgIcons;
type VsKey = keyof typeof VsIcons;
type AiKey = keyof typeof AiIcons;

export default function Icon({
  icon,
  size = 24,
  color = "gray",
  style,
  onClick,
  className,
}: Props) {
  const Target: IconType | undefined = icon.startsWith("Md")
    ? MdIcons[icon as MdKey]
    : icon.startsWith("Tb")
    ? TbIcons[icon as TbKey]
    : icon.startsWith("Cg")
    ? CgIcons[icon as CgKey]
    : icon.startsWith("Vs")
    ? VsIcons[icon as VsKey]
    : AiIcons[icon as AiKey];

  if (Target)
    return (
      <Target
        className={className}
        style={{
          display: "block",
          fontSize: size,
          color: color,
          ...style,
        }}
        onClick={onClick}
      />
    );
  else return <MdWarning />;
}

interface Props {
  icon: string;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
  onClick?: MouseEventHandler;
  className?: string;
}
