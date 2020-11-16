import React from 'react';

import SearchIcon from '@material-ui/icons/Search';

const SearchBar = ({keyword,setKeyword}) => {
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
  return (
    <input 
     style={BarStyling}
     key="random1"
     value={keyword}
     placeholder={"Search your Style DNA"}/>
    
    
  );
}

export default SearchBar