import styled from "styled-components";
import Icon from "components/common/Icon";

const Root = styled.div`
  display: flex;
  align-items: start;
  gap: 5px;
  font-size: 16px;
  color: white;
  width: 100%;
`;

interface Props {
  icon: string;
  name: string;
  selected: boolean;
}

export default function ObjectInspectorItem({ icon, name, selected }: Props) {
  return (
    <Root
      style={{
        backgroundColor: selected ? "gray" : undefined,
      }}
    >
      <Icon icon={icon} color="white" />
      {name}
    </Root>
  );
}
