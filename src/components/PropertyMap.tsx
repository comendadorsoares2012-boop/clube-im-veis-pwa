import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "react-router-dom";
import { Home, MapPin } from "lucide-react";

// Fix for default Leaflet icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProperty {
  id: string;
  title: string;
  price: number;
  latitude: number;
  longitude: number;
  neighborhood: string;
  image: string;
}

interface PropertyMapProps {
  properties: MapProperty[];
  center?: [number, number];
}

export default function PropertyMap({ properties, center = [-22.75, -43.45] }: PropertyMapProps) {
  return (
    <div className="h-full w-full rounded-2xl overflow-hidden border shadow-sm ring-4 ring-background">
      <MapContainer 
        center={center} 
        zoom={13} 
        scrollWheelZoom={true} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties.map((p) => (
          p.latitude && p.longitude && (
            <Marker key={p.id} position={[p.latitude, p.longitude]}>
              <Popup className="property-popup">
                <div className="p-1 w-48">
                  <div className="h-24 w-full rounded-md overflow-hidden mb-2">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-sm tracking-tight truncate">{p.title}</h3>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-0.5">
                    <MapPin className="h-2 w-2" />
                    <span>{p.neighborhood}</span>
                  </div>
                  <p className="text-primary font-bold text-xs mt-1">R$ {p.price.toLocaleString("pt-BR")}</p>
                  <Link to={`/imovel/${p.id}`} className="block mt-2 text-center text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground py-1.5 rounded-md">
                    Ver detalhes
                  </Link>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
}
