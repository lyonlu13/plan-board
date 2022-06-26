import { DataCtx } from 'components/logical/DataProvider'
import { ObjCtx } from 'components/logical/ObjectProvider'
import { useContext } from 'react'

export default function useObject(id: string) {
  const { select, selectedList, objects, startDrag, stopDrag } = useContext(
    ObjCtx,
  )

  function selectSelf(keep?: boolean) {
    select([id], keep)
  }

  return {
    object: objects[id],
    select: selectSelf,
    startDrag,
    stopDrag,
    selected: selectedList.indexOf(id) !== -1,
    selectedList,
  }
}
