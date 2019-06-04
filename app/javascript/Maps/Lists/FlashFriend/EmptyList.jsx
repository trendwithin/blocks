import React from 'react';

const EmptyList = (toggled) => {
  if (toggled.toggled) {
    return (
      <div>
        No one near your location matches.  Try broadcasting your location to others.
      </div>
    );
  } else {
    return (
      <div>
        Find Friends
      </div>
    );
  }
};

export default EmptyList;
