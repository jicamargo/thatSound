import axios from 'axios';
import { fetchSoundsData } from '../redux/api';

describe('fetchSoundsData', () => {
  const mockSound = {
    id: 231341,
    url: 'https://freesound.org/people/ValentinSosnitskiy/sounds/231341/',
    name: 'Electric Guitar Etude in Dm',
    tags: ['Etude', 'Experimental', 'Guitar', 'Electric', 'Chorus'],
    description: 'Etude of Electric Guitar in Dm. Used chorus and reverberation effects. ',
    geotag: null,
    created: '2014-03-25T19:37:24',
    license: 'https://creativecommons.org/licenses/by/4.0/',
    type: 'wav',
    channels: 2,
    filesize: 54685642,
    bitrate: 0,
    bitdepth: 32,
    duration: 155.0,
    samplerate: 44100.0,
    username: 'ValentinSosnitskiy',
    pack: 'https://freesound.org/apiv2/packs/14170/',
    pack_name: null,
    download: 'https://freesound.org/apiv2/sounds/231341/download/',
    bookmarks: 'https://freesound.org/apiv2/sounds/231341/bookmark/',
    previews: {
      'preview-hq-mp3': 'https://cdn.freesound.org/previews/231/231341_3908940-hq.mp3',
      'preview-hq-ogg': 'https://cdn.freesound.org/previews/231/231341_3908940-hq.ogg',
      'preview-lq-mp3': 'https://cdn.freesound.org/previews/231/231341_3908940-lq.mp3',
      'preview-lq-ogg': 'https://cdn.freesound.org/previews/231/231341_3908940-lq.ogg',
    },
    images: {
      waveform_m: 'https://cdn.freesound.org/displays/231/231341_3908940_wave_M.png',
      waveform_l: 'https://cdn.freesound.org/displays/231/231341_3908940_wave_L.png',
      spectral_m: 'https://cdn.freesound.org/displays/231/231341_3908940_spec_M.jpg',
      spectral_l: 'https://cdn.freesound.org/displays/231/231341_3908940_spec_L.jpg',
      waveform_bw_m: 'https://cdn.freesound.org/displays/231/231341_3908940_wave_bw_M.png',
      waveform_bw_l: 'https://cdn.freesound.org/displays/231/231341_3908940_wave_bw_L.png',
      spectral_bw_m: 'https://cdn.freesound.org/displays/231/231341_3908940_spec_bw_M.jpg',
      spectral_bw_l: 'https://cdn.freesound.org/displays/231/231341_3908940_spec_bw_L.jpg',
    },
    num_downloads: 8704,
    avg_rating: 4.236111111111111,
    num_ratings: 72,
    rate: 'https://freesound.org/apiv2/sounds/231341/rate/',
    comments: 'https://freesound.org/apiv2/sounds/231341/comments/',
    num_comments: 35,
  }


  it('should fetch and process sounds data correctly', async () => {
    // Mock the axios get function and its response
    const axiosGetMock = jest.spyOn(axios, 'get');
    axiosGetMock.mockResolvedValueOnce({
      data: {
        results: [
          mockSound,
        ],
        next: 'next-url',
        previous: 'previous-url',
        count: 10,
      },
    });

    // Call the fetchSoundsData function with sample input
    const query = 'example-query';
    const filter = '';
    const page = 1;
    const result = await fetchSoundsData(query, filter, page);
    // Assert the expected result
    expect(result.sounds).toHaveLength(1); // Assuming there is one mock sound object
    expect(result.next).toBe('next-url');
    expect(result.previous).toBe('previous-url');
    expect(result.count).toBe(10);

    // Verify that the axios get function was called with the correct URL
    expect(axiosGetMock).toHaveBeenCalledWith(
      expect.stringContaining('example-query'),
    );

    // Restore the axios get function
    axiosGetMock.mockRestore();
  });

  it('should throw an error when fetching sounds fails', async () => {
    // Mock the axios get function to simulate a failed request
    const axiosGetMock = jest.spyOn(axios, 'get');
    axiosGetMock.mockRejectedValueOnce(new Error('Network Error'));

    // Call the fetchSoundsData function with sample input
    const query = 'example-query';
    const filter = 'example-filter';
    const page = 1;

    // Assert that the function throws an error
    await expect(fetchSoundsData(query, filter, page)).rejects.toThrow('Failed to fetch sounds');

    // Restore the axios get function
    axiosGetMock.mockRestore();
  });
});
