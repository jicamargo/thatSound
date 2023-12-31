import axios from 'axios';
import { SOUNDS_URL, TOKEN } from './apiconfig';

export const convertFilterInput = (input) => {
  if (input === 'created:[NOW-1YEAR TO NOW]') {
    return input;
  }

  // Remove leading and trailing white spaces
  const trimmedInput = input.trim();

  // Split the input by comma, space, or hyphen
  const tags = trimmedInput.split(/[,\s-]+/);

  // Filter out any empty tags
  const validTags = tags.filter((tag) => tag !== '');

  // Add the "tag:" prefix to each valid tag
  const formattedTags = validTags.map((tag) => `tag:${tag}`);

  // Join the formatted tags with a space
  const result = formattedTags.join(' ');

  return result;
};

export const fetchSoundsData = async (query, filter, page) => {
  try {
    const encodedQuery = encodeURIComponent(query);

    let URLAPI = `${SOUNDS_URL}search/text/?query=${encodedQuery}&token=${TOKEN}&fields=id,name,previews,images,username,description,duration,tags,download,created,avg_rating,num_ratings,samplerate`;
    if (filter) {
      const encodedFilter = encodeURIComponent(convertFilterInput(filter));
      URLAPI += `&filter=${encodedFilter}`;
    }
    if (page) {
      URLAPI += `&page=${page}`;
    }
    const response = await axios.get(URLAPI);
    const {
      results, next, previous, count,
    } = response.data;
    const sounds = results.map((sound) => ({
      ...sound,
      selected: false,
    }));
    return {
      sounds, next, previous, count,
    };
  } catch (error) {
    throw new Error('Failed to fetch sounds');
  }
};
