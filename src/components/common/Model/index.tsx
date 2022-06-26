import { MouseEventHandler, ReactNode } from 'react'
import { MdClose } from 'react-icons/md'
import styled from 'styled-components'
import Icon from '../Icon'

const Root = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transition: 0.2s;
  z-index: 4;
  color: white;
`

const Panel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40vw;
  min-width: 300px;
  background-color: #3d3d3d;
  min-height: 20px;
  border-radius: 5px;
`
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 24px;
  padding: 5px 10px;
  border-bottom: 1px solid white;
`

const Button = styled.div`
  cursor: pointer;
  transform: rotate(0deg);
  transition: 0.2s;
  &:hover {
    transform: rotate(90deg);
  }
`

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

const Body = styled.div`
  padding: 10px;
`

export default function Model({ setShow, show, children, title, icon }: Props) {
  return (
    <Root
      onMouseDown={(e) => {
        setShow(false)
      }}
      style={{
        opacity: show ? 1 : 0,
        pointerEvents: show ? 'auto' : 'none',
      }}
    >
      <Panel
        onMouseDown={(e) => {
          e.stopPropagation()
        }}
      >
        <Header>
          <Title>
            <Icon style={{ display: 'block' }} icon={icon} color="white" />
            {title}
          </Title>
          <Button onClick={() => setShow(false)}>
            <MdClose />
          </Button>
        </Header>
        <Body>{children}</Body>
      </Panel>
    </Root>
  )
}

interface Props {
  setShow: (val: boolean) => void
  show: boolean
  children: ReactNode
  title: string
  icon: string
}
