import React from 'react'

export default ( { msgs } ) => {
  return(
    <div>
      { msgs.map(({ attributes }) =>
        <div>{attributes.message}</div>
      )}
    </div>
  )
}
