import React from 'react';
import FriendListItem from './FriendListItem';
import EmptyList from './EmptyList';

const FlashFriendList = ({ list, userClicked }) => {
  let renderedList;
  if (list.length == 0) {
    renderedList = <EmptyList toggled={userClicked}/>;
  } else {
    renderedList = list.map(data => {
      return <FriendListItem key={data.id} item={data} />;
    });
  }

  return (
    <div>
      <div className='pin-container'>
        <div className="pin-id">
          {renderedList}
        </div>
      </div>
    </div>
  );
};

export default FlashFriendList;
