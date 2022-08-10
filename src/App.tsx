import Grid from "components/gui/Grid";
import Header from "components/gui/Header";
import Selection from "components/overlayer/Selection";
import ZoomIndicator from "components/gui/ZoomIndicator";
import useGeo from "hooks/useGeo";
import { AiOutlinePlus } from "react-icons/ai";
import ReactTooltip from "react-tooltip";
import useAppearance from "hooks/useAppearance";
import RightPanel from "components/gui/RightPanel";
import PropsInspector from "components/gui/PropsInspector";
import ObjectRenderer from "components/logical/ObjectRenderer";
import ObjectInspector from "components/gui/ObjectInspector";
import urlToBlob from "utils/urlToBlob";

(window as unknown as any).urlToBlob = urlToBlob;

function App() {
  const { offsetX, offsetY, zoom, grab, x, y } = useGeo();
  const { geoTransition: geoT } = useAppearance();

  return (
    <div
      className="App"
      style={{ position: "relative", cursor: grab ? "grabbing" : "auto" }}
    >
      <ObjectRenderer />
      <Header />
      <RightPanel>
        <PropsInspector />
        <ObjectInspector />
      </RightPanel>
      <Grid />
      {<Selection />}
      <AiOutlinePlus
        style={{
          fontSize: 21 * zoom,
          position: "absolute",
          top: offsetY - 10 * zoom,
          left: offsetX - 10 * zoom,
          color: "white",
          transition: `${geoT ? "0.3s" : "20ms"} all`,
        }}
      />
      <ZoomIndicator />
      <ReactTooltip effect="solid" />
    </div>
  );
}

export default App;
