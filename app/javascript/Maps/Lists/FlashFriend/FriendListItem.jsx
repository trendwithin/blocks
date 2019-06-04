import React from 'react';

const FriendListItem = ({ item }) => {
  return (
    <div>
      <h1>Attributes</h1>
      {item.id}
      {item.attributes.longitude}
    </div>
  );
};

export default FriendListItem;
