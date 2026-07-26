import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function ExploreMap({ businesses = [] }) {
  return (
    <MapContainer center={[16.705, 74.2433]} zoom={13} className="h-screen w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {businesses.map((shop) => (
        <Marker
          key={shop._id || shop.id}
          position={[shop.location.coordinates[1], shop.location.coordinates[0]]}
        >
          <Popup>{shop.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
