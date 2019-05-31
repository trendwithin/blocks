import React from 'react';
import FriendListItem from './FriendListItem';

const FlashFriendList = ({ list }) => {
  const renderedList = list.map(data => {
    return <FriendListItem key={data.id} item={list} />;
  });

  return (
    <div>
      <div className='pin-container'>
        <div className="pin-id">
          Pin
          {renderedList}
        </div>
      </div>
    </div>
  );
};

export default FlashFriendList;
