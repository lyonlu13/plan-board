import useAppearance from "hooks/useAppearance";
import useGeo from "hooks/useGeo";
import useViewPort from "hooks/useViewPort";
import styled from "styled-components";

const BaseGrid = styled.div`
  background-color: transparent;
  background-image: ${({ c }: { c: number }) => `repeating-linear-gradient(
      rgb(${c}, ${c}, ${c}) 0 1px,
      transparent 1px 100%
    ),
    repeating-linear-gradient(
      90deg,
      rgb(${c}, ${c}, ${c}) 0 1px,
      transparent 1px 100%
    )`};
  user-select: none;
`;

export default function Grid() {
  const { zoom, offsetX, offsetY } = useGeo();
  const { geoTransition } = useAppearance();
  const { vh } = useViewPort();

  return (
    <BaseGrid
      c={60}
      style={{
        height: vh,
        backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
        backgroundPositionX: `${offsetX}px`,
        backgroundPositionY: `${offsetY}px`,
        transition: geoTransition
          ? "all 0.3s, backgroundSize 0.3s"
          : "backgroundSize 0.3s",
      }}
    >
      <BaseGrid
        c={100}
        style={{
          height: vh,
          backgroundSize: `${200 * zoom}px ${200 * zoom}px`,
          backgroundPositionX: `${offsetX}px`,
          backgroundPositionY: `${offsetY}px`,
          transition: geoTransition
            ? "all 0.3s, backgroundSize 0.3s"
            : "backgroundSize 0.3s",
        }}
      />
    </BaseGrid>
  );
}
