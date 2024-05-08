'use client';
import { useRouter , useSearchParams} from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';


const Favorites: React.FC = () => {
  const router = useRouter();
    const searchParams = useSearchParams()

    const favoritesParam = searchParams.get('favorites')

  const initialFavorites = favoritesParam ? JSON.parse(favoritesParam) : [];
  const [favorites, setFavorites] = useState<Gif[]>(initialFavorites);
  // Define the Gif type
type Gif = {
  id: string;
  title?: string;
  images: {
    fixed_height: {
      url: string;
    };
    // Add other necessary properties here based on your actual data structure
  };
  // Add other necessary properties here based on your actual data structure
};


  const addToFavorites = (gif: Gif) => {

    // Check if the gif is already in favorites
    const isAlreadyInFavorites = favorites.some((favorite) => favorite.id === gif.id);

    if (!isAlreadyInFavorites) {
      // Add the gif to favorites
      const updatedFavorites = [...favorites, gif];
      setFavorites(updatedFavorites);

      // Update the query parameter in the URL
      const favoritesQueryParam = JSON.stringify(updatedFavorites);
      router.push(`/favorites?favorites=${encodeURIComponent(favoritesQueryParam)}`);
    }
  };

  return (
    <div>
      <h1 className=' text-center '>Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.map((favorite: Gif) => (
          <div key={favorite.id}>
            <Image
              src={favorite.images.fixed_height.url}
              alt={favorite.title || 'GIF'}
              className="w-full h-48 object-cover"
            />
            <p className="text-lg font-semibold mb-2">{favorite.title || 'Untitled'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;