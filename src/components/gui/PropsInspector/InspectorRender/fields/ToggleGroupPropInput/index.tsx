import { ToggleGroupPropField } from 'interObjects/define/propField'
import Icon from 'components/common/Icon'
import { cloneDeep } from 'lodash'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'

const List = styled.span`
  display: flex;
  gap: 5px;
`

const Button = styled.span`
  cursor: pointer;
  padding: 2px;
  border-radius: 2px;
  transition: 0.2s;
`

export interface ToggleGroupValue {
  [castTo: string]: boolean
}

export default function ToggleGroupPropInput({
  toggleGroupField,
  values,
  onChange,
}: Props) {
  const casting = toggleGroupField.caseTo.split('|')
  return (
    <List>
      <ReactTooltip effect="solid" place="bottom" />
      {toggleGroupField.items.map((item, i) => (
        <Button
          data-tip={item.tip}
          key={casting[i]}
          style={{
            backgroundColor: values[casting[i]] ? 'gray' : '',
          }}
          onClick={() => {
            const newValues: ToggleGroupValue = cloneDeep(values)
            if (toggleGroupField.unique) {
              Object.keys(newValues).forEach((key) => (newValues[key] = false))
              newValues[casting[i]] = true
            } else {
              newValues[casting[i]] = !newValues[casting[i]]
            }
            onChange(newValues)
          }}
        >
          <Icon
            style={{
              display: 'block',
              transition: '0.2s',
            }}
            color={values[casting[i]] ? 'white' : 'gray'}
            icon={item.icon}
            size={18}
          />
        </Button>
      ))}
    </List>
  )
}

interface Props {
  toggleGroupField: ToggleGroupPropField
  values: ToggleGroupValue
  onChange: (values: ToggleGroupValue) => void
}
