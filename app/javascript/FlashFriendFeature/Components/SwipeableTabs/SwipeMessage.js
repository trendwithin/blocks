import React from 'react'


export default ( { msgs }) => {
  return(
    <div>
      { msgs.map((item) =>
        <div>{item}</div>
      )}
    </div>
  )
}
