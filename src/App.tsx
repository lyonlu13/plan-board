import Block from 'components/Block'
import Grid from 'components/gui/Grid'
import Header from 'components/gui/Header'
import Selection from 'components/overlayer/Selection'
import ZoomIndicator from 'components/gui/ZoomIndicator'
import useGeo from 'hooks/useGeo'
import { AiOutlinePlus } from 'react-icons/ai'
import ReactTooltip from 'react-tooltip'
import DataProvider from 'components/logical/DataProvider'
import useAppearance from 'hooks/useAppearance'

function App() {
  const { offsetX, offsetY, zoom, grab, select } = useGeo()
  const { geoTransition: geoT } = useAppearance()
  return (
    <div
      className="App"
      style={{ position: 'relative', cursor: grab ? 'grabbing' : 'auto' }}
    >
      <Block x={100} y={100} />
      <Header />
      <Grid />
      {<Selection />}
      <AiOutlinePlus
        style={{
          fontSize: 21 * zoom,
          position: 'absolute',
          top: offsetY - 10 * zoom,
          left: offsetX - 10 * zoom,
          color: 'white',
          transition: `${geoT ? '0.3s' : '20ms'} all`,
        }}
      />
      <ZoomIndicator />
      <ReactTooltip effect="solid" />
    </div>
  )
}

export default App
