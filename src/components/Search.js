import React from 'react'

const Search = ({ searched }) => {

  

  return (
    <div className="ui search">
      <div className="ui icon input">
        <input onChange={(e) => searched(e.target.value)} className="prompt"/>
        <i className="search icon" />
      </div>
    </div>
  )
}

export default Search
