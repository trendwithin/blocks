import React from 'react';

const FriendListItem = ({ item }) => {
  return (
    <div>
      <h1>Attributes</h1>
      {item[0].id}
      {item[0].attributes.longitude}
    </div>
  );
};

export default FriendListItem;
