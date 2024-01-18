// pages/index.tsx
'use client'
import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { ModeToggle } from '@/components/ui/toggle-provider';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

const GIPHY_API_KEY = 'AiVFp8u6D7GnSSA1ewx7u5ZlkJ2dn3Y4';
const GIPHY_API_BASE_URL = 'https://api.giphy.com/v1/gifs';

interface Gif {
  id: string;
  images: {
    fixed_height: {
      url: string;
    };
  };
  title: string;
}

const searchGifs = async (query: string): Promise<Gif[]> => {
  try {
    const response = await fetch(
      `${GIPHY_API_BASE_URL}/search?q=${encodeURIComponent(query)}&api_key=${GIPHY_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch GIFs');
    }

    const data = await response.json();
    console.log(JSON.stringify(data));
    return data.data;
  } catch (error) {
    console.error('Error fetching GIFs:', error);
    return [];
  }
};

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [clickedGifs, setClickedGifs] = useState<Gif[]>([]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const searchedGifs = await searchGifs(searchQuery);
      setGifs(searchedGifs);
    } finally {
      setLoading(false);
      setSearchQuery('');
    }
  };

  const addToFavorites = (gif: Gif) => {
    if (!clickedGifs.some((clickedGif) => clickedGif.id === gif.id)) {
      setClickedGifs((prevClickedGifs) => [...prevClickedGifs, gif]);
      toast.success('Added to favorites!', {
        autoClose: 2000,
      });
    } else {
      toast.warning('GIF is already in favorites!', {
        autoClose: 2000,
      });
    }
  };

  const handleClickFavorites = () => {
    const favoriteIds = clickedGifs.map((clickedGif) => clickedGif.id);
    router.push(`/Favorites?favoriteIds=${JSON.stringify(favoriteIds)}`);
  };
const handleClickSignin = () => {
  router.push('/Login')
}
 {/* You can also use Router push method for Next Routing  */}
const handleClickRegister = () => {
  router.push('/Register')
}

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className=' ml-[149px] mr-[149px] m-16 '>
        <nav className='  p-4 mt-4 mb-4'>
          <div className=' flex items-center justify-between'>
            <div className='text-white font-bold text-xl'>Your Logo</div>
            <div className={`lg:flex ${isOpen ? 'block' : 'hidden'}`}>
              <ul className='flex space-x-4'>
                <li>
                  <Link href='/Login'>
                    <p className='text-white cursor-pointer'>Home</p>
                  </Link>
                </li>
                <li>
                  <a onClick={handleClickFavorites} className='text-white cursor-pointer'>
                    Favorites
                  </a>
                </li>
                <li>
                  <a onClick={handleClickSignin} className='text-white cursor-pointer'>
                    Signin
                  </a>
                </li>
                <li>
                  <a onClick={handleClickRegister} className='text-white cursor-pointer'>
                    Register
                  </a>
                </li>
                <li>
                  <ModeToggle />
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <h1 className=' text-center text-lime-300 font-semibold '>GIPHY GIF Gallery</h1>
        <div className='flex justify-around items-center'>
          <input
            type='text'
            className='w-2/3 p-2 border border-gray-300 rounded-md mt-4 text-black ml-14'
            placeholder='Enter your search...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <button
            className='p-2 pl-4 pr-4 mt-2 bg-slate-400 text-white rounded-md mr-8'
            onClick={handleSearch}
            disabled={loading} // Disable the button when loading
          >
            Search
          </button>
        </div>

        {loading && <div>Loading...</div>}

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 ml-14'>
          {gifs.map((gif) => (
            <div key={gif.id} className='flex justify-center'>
              <div className='rounded overflow-hidden shadow-lg'>
                <img
                  src={gif.images.fixed_height.url}
                  alt={gif.title || 'GIF'}
                  className='w-full h-48 object-cover'
                />
                <div className='p-4 flex flex-row justify-between'>
                  <p className='text-lg font-semibold mb-2'>{gif.title || 'Untitled'}</p>
                  <FaHeart
                    className='cursor-pointer text-red-500 font-medium'
                    onClick={() => addToFavorites(gif)}
                  />
                  <ToastContainer position='top-right' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
