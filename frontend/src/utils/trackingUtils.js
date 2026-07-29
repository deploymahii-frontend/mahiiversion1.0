// src/utils/trackingUtils.js

export function calculateETA(
    distanceKm,
    averageSpeed = 30
) {
    const minutes =
        Math.ceil(
            (distanceKm / averageSpeed) * 60
        );

    return `${minutes} min`;
}
