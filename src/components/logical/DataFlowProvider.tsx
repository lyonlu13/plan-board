import { DataFlowContextInterface, DataFlowDefault } from 'Contexts'
import { Position } from 'interObjects/define/interObject'
import { SketchTextInfo } from 'interObjects/define/info'
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import useGeo from 'hooks/useGeo'
import { cloneDeep, filter, uniq } from 'lodash'
import DataLine from 'components/overlayer/DataLine'
import styled from 'styled-components'
import useViewPort from 'hooks/useViewPort'
import { DataCtx } from './DataProvider'
import makeId from 'utils/makeId'

export const DFCtx = createContext<DataFlowContextInterface>(DataFlowDefault)

const SVG = styled.svg`
  position: absolute;
  z-index: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  fill: none;
`

const avg = (a: number, b: number) => (a + b) / 2

export default function DataFlowProvider({ children }: Props) {
  const [lines, setLines] = useState<
    {
      id: string
      in: string
      inPort: number
      out: string
      outPort: number
    }[]
  >([])

  const { vw, vh } = useViewPort()
  const { x, y } = useGeo()

  const { datas, setDatas } = useContext(DataCtx)

  const [upd, setUpd] = useState<number>(0)

  const memoryDatas = useRef<any>(null)
  const memoryLines = useRef<any>(null)

  const [lineInfo, setLineInfo] = useState<{
    out: string
    outPort: number
  } | null>(null)

  useEffect(() => {
    const update = setInterval(() => {
      setUpd((upd + 1) % 20)
    }, 10)
    return () => clearInterval(update)
  }, [lines, upd])

  useEffect(() => {
    if (memoryDatas.current === datas && memoryLines.current === lines) return
    const lineSel = cloneDeep(lines)
    const nDatas = cloneDeep(datas)
    const hash: { [key: string]: boolean } = {}
    const candidates: string[] = []
    const parsed: { [key: string]: { deps: string[]; ports: number[] } } = {}
    lineSel.forEach((line) => {
      if (!hash[line.in]) {
        hash[line.in] = true
        candidates.push(line.in)
      }
      if (!parsed[line.in]) parsed[line.in] = { deps: [], ports: [] }
      parsed[line.in].deps[line.inPort] = line.out
      parsed[line.in].ports[line.inPort] = line.outPort
    })
    let loopDetect = 0
    while (candidates.length && loopDetect < 100) {
      loopDetect++
      for (let j = 0; j < candidates.length; j++) {
        let flag = 1
        parsed[candidates[j]].deps.forEach((dep, i) => {
          if (candidates.indexOf(dep) !== -1) flag = 0
        })
        if (flag) {
          const cand = parsed[candidates[j]]
          const parameters: any[] = []
          cand.deps.forEach((dep, i) => {
            parameters.push(nDatas[dep].output()[cand.ports[i]])
          })
          nDatas[candidates[j]].input(parameters)
          candidates.splice(j, 1)
        }
      }
    }
    if (loopDetect >= 100) alert('Loop')
    memoryLines.current = lines
    memoryDatas.current = nDatas
    setDatas(nDatas)
  }, [datas])

  useEffect(() => {
    function mousedown() {
      setLineInfo(null)
    }
    document.addEventListener('mousedown', mousedown)
    return () => {
      document.removeEventListener('mousedown', mousedown)
    }
  }, [])

  function removeLine(id: string) {
    const tar = lines.find((l) => l.id === id)
    if (tar) {
      const nDatas = cloneDeep(datas)
      nDatas[tar.in].ports.in[tar.inPort] = false
      setDatas(nDatas)
      setLines(filter(lines, (l) => l.id !== id))
    }
  }

  function buildLine(id: string, port: number) {
    if (!lineInfo) setLineInfo({ out: id, outPort: port })
    else {
      if (lineInfo.out === id) {
        //self connection
        setLineInfo(null)
        return
      }
      const nLines = cloneDeep(lines)
      nLines.push({
        id: makeId(),
        out: lineInfo.out,
        outPort: lineInfo.outPort,
        in: id,
        inPort: port,
      })
      const nDatas = cloneDeep(datas)
      nDatas[id].ports.in[port] = true
      setDatas(nDatas)
      setLines(nLines)
      setLineInfo(null)
    }
  }

  return (
    <DFCtx.Provider value={{ buildLine, lining: !!lineInfo }}>
      <>
        {children}
        <SVG width={vw} height={vh}>
          <>
            {(() => {
              if (lineInfo) {
                const ele1 = document.querySelector(
                  `#inter-obj-${lineInfo.out} #out${lineInfo.outPort}`,
                )
                if (!ele1) return null
                const b1 = ele1.getBoundingClientRect()
                let pos1 = {
                  x: avg(b1.left, b1.right),
                  y: avg(b1.top, b1.bottom),
                }
                return (
                  <DataLine
                    onClick={() => {}}
                    pos1={pos1}
                    pos2={{ x: x, y: y }}
                  />
                )
              }

              return null
            })()}
            {lines.map((line) => {
              const ele1 = document.querySelector(
                `#inter-obj-${line.out} #out${line.outPort}`,
              )
              const ele2 = document.querySelector(
                `#inter-obj-${line.in} #in${line.inPort}`,
              )
              if (!ele1 || !ele2) return null

              const b1 = ele1.getBoundingClientRect()
              const b2 = ele2.getBoundingClientRect()
              let pos1 = {
                x: avg(b1.left, b1.right),
                y: avg(b1.top, b1.bottom),
              }
              let pos2 = {
                x: avg(b2.left, b2.right) - 2,
                y: avg(b2.top, b2.bottom),
              }
              return (
                <DataLine
                  key={line.id}
                  onClick={() => {
                    removeLine(line.id)
                  }}
                  pos1={pos1}
                  pos2={pos2}
                />
              )
            })}
          </>
        </SVG>
      </>
    </DFCtx.Provider>
  )
}

interface Props {
  children: React.ReactNode
}
