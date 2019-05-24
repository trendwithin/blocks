import React from 'react';

export const DeviceLocation = () => {
  let pos = {};

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        };
      });
    }

  return navigator.geolocation ? pos : false;
};
