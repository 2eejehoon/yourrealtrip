/* eslint-disable */
import { useMap, MapMarker } from "react-kakao-maps-sdk";

export default function WishCustomMarker({ position, onClick }) {
  const map = useMap();

  return <MapMarker position={position} onClick={onClick} />;
}
