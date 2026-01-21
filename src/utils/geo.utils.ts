/* eslint-disable @typescript-eslint/no-unused-vars */

export type Coordinates = {
  lat: number;
  lng: number;
};

const LOCATION_COORDINATES: Record<string, Coordinates> = {
  //KIGALI
  NYABUGOGO: { lat: -1.9398, lng: 30.0445 },
  REMERA: { lat: -1.9577, lng: 30.1127 },
  KIMIRONKO: { lat: -1.9366, lng: 30.1305 },
  KACYIRU: { lat: -1.9441, lng: 30.0864 },
  GISOZI: { lat: -1.9355, lng: 30.0731 },
  KICUKIRO: { lat: -1.9716, lng: 30.1044 },
  KANOMBE: { lat: -1.976, lng: 30.1345 },

  // Southern Province
  HUYE: { lat: -2.5967, lng: 29.7394 },
  NYANZA: { lat: -2.3516, lng: 29.7509 },
  NYAMAGABE: { lat: -2.4655, lng: 29.5564 },
  GISAGARA: { lat: -2.5851, lng: 29.8329 },

  // Northern Province
  MUSANZE: { lat: -1.4991, lng: 29.6347 },
  GICUMBI: { lat: -1.5763, lng: 30.0685 },
  RULINDO: { lat: -1.7085, lng: 29.9986 },

  // Eastern Province
  RWAMAGANA: { lat: -1.9487, lng: 30.4347 },
  KAYONZA: { lat: -1.9445, lng: 30.5079 },
  NGOMA: { lat: -2.1701, lng: 30.5316 },
  KIREHE: { lat: -2.2606, lng: 30.709 },

  // Western Province
  RUBAVU: { lat: -1.6792, lng: 29.2594 },
  KARONGI: { lat: -2.0629, lng: 29.3496 },
  RUSIZI: { lat: -2.4846, lng: 28.9075 },
  NYAMASHEKE: { lat: -2.3336, lng: 29.1315 },
};

const toRad = (x: number): number => (x * Math.PI) / 180;

export function getCoordinates(locationName: string): Coordinates {
  const key = locationName.trim().toUpperCase();
  const coords = LOCATION_COORDINATES[key];

  if (!coords) {
    throw new Error(`Unknown location: ${locationName}`);
  }

  return coords;
}

export function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export function estimateETA(distanceKm: number, speedKmh: number): number {
  if (speedKmh <= 0) {
    throw new Error('Speed must be greater than zero');
  }

  return (distanceKm / speedKmh) * 60;
}
