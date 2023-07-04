import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSounds, saveQuery, saveFilter } from '../redux/sounds/soundsSlice';

const SearchSounds = () => {
  const dispatch = useDispatch();
  const {
    next, previous, query, filter,
  } = useSelector((state) => state.sounds);
  const [userQuery, setUserQuery] = useState(query);
  const [userFilter, setUserFilter] = useState(filter);

  const handleQueryChange = (event) => {
    setUserQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setUserFilter(event.target.value);
  };

  const getNextPageNumber = (nextUrl) => {
    const urlParams = new URLSearchParams(nextUrl);
    return Number(urlParams.get('page'));
  };

  const getPreviousPageNumber = (previousUrl) => {
    const urlParams = new URLSearchParams(previousUrl);
    return Number(urlParams.get('page'));
  };

  const handleSearch = () => {
    if (userQuery.trim() !== '') {
      dispatch(saveQuery(userQuery));
      dispatch(saveFilter(userFilter));
      dispatch(fetchSounds({ page: 1 }));
    }
  };

  const handleNextPage = () => {
    if (next) {
      dispatch(fetchSounds({ page: getNextPageNumber(next) }));
    }
  };

  const handlePreviousPage = () => {
    if (previous) {
      dispatch(fetchSounds({ page: getPreviousPageNumber(previous) }));
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your search query"
        value={userQuery}
        onChange={handleQueryChange}
        onKeyDown={handleKeyPress}
      />
      <input
        type="text"
        placeholder="Enter your filter criteria"
        value={userFilter}
        onChange={handleFilterChange}
        onKeyDown={handleKeyPress}
      />
      <button type="button" onClick={handleSearch}>
        Search
      </button>
      <button type="button" onClick={handlePreviousPage} disabled={!previous}>
        Previous
      </button>
      <button type="button" onClick={handleNextPage} disabled={!next}>
        Next
      </button>
    </div>
  );
};

export default SearchSounds;
