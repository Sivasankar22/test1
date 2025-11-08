import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN';

function MapWidget({ coordinates }) {
  const mapRef = useRef(null);
  useEffect(() => {
    if (mapRef.current) {
      new mapboxgl.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: coordinates,
        zoom: 14,
      });
    }
  }, [coordinates]);
  return <div ref={mapRef} className="w-full h-64 rounded"></div>;
}
export default MapWidget;
