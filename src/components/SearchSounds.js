import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSounds, saveQuery, saveFilter } from '../redux/sounds/soundsSlice';
import '../css/SearchSounds.css';
import logoIcon from '../assets/wave-sound.png';

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
    <div className="search-sounds">
      <div className="search-tags-inputs-container">
        <div className="search-input-group">
          <span className="search-sounds__label">Which sound are you looking for?</span>
          <input
            type="text"
            placeholder="Enter your search query"
            value={userQuery}
            onChange={handleQueryChange}
            onKeyDown={handleKeyPress}
            className="search-sounds__input"
          />
        </div>
        <div className="tags-input-group">
          <span className="tags-sounds__label">Enter tags for filtering (comma separated)</span>
          <input
            type="text"
            placeholder="Enter your filter criteria"
            value={userFilter}
            onChange={handleFilterChange}
            onKeyDown={handleKeyPress}
            className="search-sounds__input"
          />
        </div>
      </div>
      <div className="search-next-previous-buttons">
        <button type="button" onClick={handleSearch} className="search-sounds__button search-button">
          <img className="search-sounds__button-img" src={logoIcon} alt="Search" />
          Search
        </button>
        <div className="search-sounds__pagination">
          <button type="button" onClick={handlePreviousPage} disabled={!previous} className="search-sounds__button">
            {'<<'}
            Previous
          </button>
          <button type="button" onClick={handleNextPage} disabled={!next} className="search-sounds__button">
            Next
            {'>>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchSounds;
