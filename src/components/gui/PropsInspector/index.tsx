import { AprcCtx, GeoCtx } from 'components/logical/StateProvider'
import useViewPort from 'hooks/useViewPort'
import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import { HiMenu } from 'react-icons/hi'
import { MdControlCamera, MdInfo, MdZoomIn, MdZoomOut } from 'react-icons/md'
import AutosizeInput from 'react-input-autosize'
import ReactTooltip from 'react-tooltip'
import useGeo from 'hooks/useGeo'
import useAppearance from 'hooks/useAppearance'
import Icon from 'components/common/Icon'
import { TextSketchInfo } from 'interObjects/sketch/SketchText/Text'
import { InterObjectInfo } from 'interObjects/define/interObject'
import {
  NumberPropField,
  PropFieldType,
  SelectPropField,
  TextPropField,
} from 'interObjects/define/propField'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 5px;
  font-size: 16px;
  background-color: #464646;
  color: white;
  padding: 10px;
  z-index: 2;
  border-radius: 10px;
  transition: 0.3s;
`

const Title = styled.div`
  fontsize: 16px;
`

const HR = styled.hr`
  width: 100%;
  border-color: white;
  margin: 0px 0px 5px 0px;
`

const FieldFrame = styled.div`
  text-align: left;
  fontsize: 16px;
  margin-bottom: 5px;
`

const Input = styled.input`
  border-radius: 5px;
  outline: none;
  border: none;
  width: 120px;
  margin-right: 5px;
  padding: 5px;
`

export default function PropsInspector() {
  const info: InterObjectInfo = TextSketchInfo
  return (
    <Root onMouseDown={(e) => e.stopPropagation()}>
      <Title>
        <MdInfo /> Property
      </Title>
      <HR />
      {info.propFields.map((field) => (
        <FieldFrame>
          <div>{field.label}</div>
          {(() => {
            switch (field.type) {
              case PropFieldType.Text:
                const textField = field as TextPropField
                return <Input type="text" placeholder={textField.placeholder} />
              case PropFieldType.Number:
                const numberField = field as NumberPropField
                return (
                  <div>
                    <Input type="number" />
                    {numberField.unit}
                  </div>
                )
              case PropFieldType.Select:
                const selectField = field as SelectPropField
                return (
                  <select name="" id="">
                    {selectField.items?.map((item) => (
                      <option value={item.value}>{item.text}</option>
                    ))}
                  </select>
                )
              case PropFieldType.Check:
                return <input type="checkbox" />
            }
            return <></>
          })()}
        </FieldFrame>
      ))}
    </Root>
  )
}
