import React from "react";

export const generateCoordinates = (devices: DetectedDevice[]) => {
  return devices.map((device) => {
    let x, y;
    let attempts = 0;
    const maxAttempts = 100;

    do {
      x = Math.floor(Math.random() * 81) + 10; // Random x between 10 and 100
      y = Math.floor(Math.random() * 81) + 10; // Random y between 10 and 100
      attempts++;
    } while (
      (x > 50 && y >= 50) || // If x is above 50, y should be less than 50
      (x <= 50 && y < 50) || // If x is 50 or below, y should be above 50
      attempts < maxAttempts
    );

    return { id: device.id, data: { ...device }, coords: { x, y } };
  });
};

const generateCoordinates = (devices: DetectedDevice[]) => {
  const directions = [
    { x: 0, y: -1 }, // North
    { x: 1, y: -1 }, // North-East
    { x: 1, y: 0 }, // East
    { x: 1, y: 1 }, // South-East
    { x: 0, y: 1 }, // South
    { x: -1, y: 1 }, // South-West
    { x: -1, y: 0 }, // West
    { x: -1, y: -1 }, // North-West
  ];

  return devices
    .filter((device) => device.id !== socket.id)
    .map((device) => {
      const centerX = 40; // Center x-coordinate
      const centerY = 40; // Center y-coordinate
      const radius = 25; // Distance from center to points

      const coords = directions.map(({ x, y }) => ({
        x: centerX + x * radius,
        y: centerY + y * radius,
      }));

      // Randomly select one of the coordinates
      const { x, y } = coords[Math.floor(Math.random() * coords.length)];

      return { id: device.id, data: { ...device }, coords: { x, y } };
    });
};
