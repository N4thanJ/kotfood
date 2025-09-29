'use client';

import RecipeService from '@/service/RecipeService';
import { Category, Difficulty, RecipeBody, User } from '@/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { useRouter } from 'next/navigation';
import CloudinaryService from '@/service/CloudService';
import { Trash } from 'lucide-react';

interface Props {
  user: Pick<User, 'id' | 'email' | 'username' | 'role'> | null;
}

export function getAllCategories(): Category[] {
  return Object.values(Category) as Category[];
}

export function getAllDifficulties(): Difficulty[] {
  return Object.values(Difficulty) as Difficulty[];
}

export default function CreateComponent({ user }: Props) {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RecipeBody>({
    name: '',
    description: '',
    imageUrl: '',
    category: Category.Dessert,
    difficulty: Difficulty.Makkelijk,
  });

  const difficulties = getAllDifficulties();
  const categories = getAllCategories();

  const { trigger, isMutating, error } = useSWRMutation(
    '/api/recipes',
    RecipeService.createRecipe,
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const target = e.target as HTMLInputElement;
    setFormData({ ...formData, [target.name]: target.value });

    if (target.type === 'file') {
      if (!target.files || target.files.length === 0) {
        setSelectedFile(undefined);
        return;
      }
      setSelectedFile(target.files[0]);
    }
  };

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      let imageUrl = formData.imageUrl;

      // Upload image if a file is selected
      if (selectedFile) {
        const data = new FormData();
        data.append('file', selectedFile);

        const uploadRes = await CloudinaryService.uploadImage(data);
        if (!uploadRes.ok) throw new Error('Image upload failed');

        const uploadJson = await uploadRes.json();
        imageUrl = uploadJson.secure_url;
      }

      // Post recipe with imageUrl
      const response = await trigger({ ...formData, imageUrl });
      mutate('/api/recipes');

      const createdRecipe = await response.json();

      if (createdRecipe?.id) {
        router.push(`/recipes/${createdRecipe.id}`);
      }

      setStep(1);
      setFormData({
        name: '',
        description: '',
        imageUrl: '',
        category: Category.Dessert,
        difficulty: Difficulty.Makkelijk,
      });
      setSelectedFile(undefined);
      setPreview(undefined);
      setIsLoading(false);
    } catch (err: unknown) {
      console.error('Failed to create recipe:', err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  if (!user) {
    return (
      <div className='mx-auto flex max-w-[1200px] px-6 pt-32'>
        <p className='text-center'>
          <Link href='/login'>
            <span className='font-bold text-red-500'>Log in</span>
          </Link>{' '}
          voordat je een recept publiceert!
        </p>
      </div>
    );
  }

  return (
    <div className='mx-auto flex max-w-[1200px] px-6 pt-32'>
      <form
        onSubmit={handleSubmit}
        className='flex w-full flex-col gap-6 rounded-lg bg-white p-10 shadow-lg'
      >
        <h1 className='text-center text-3xl font-bold text-gray-900'>
          Nieuw recept maken
        </h1>

        {step === 1 && (
          <>
            <div className='flex flex-col gap-2'>
              <label htmlFor='name' className='font-medium text-gray-700'>
                Wat is de naam van je recept?
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='rounded-md border border-gray-300 bg-gray-100 px-3 py-2'
                required
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label
                htmlFor='description'
                className='font-medium text-gray-700'
              >
                Hoe beschrijf je dit recept?
              </label>
              <textarea
                id='description'
                name='description'
                value={formData.description}
                onChange={handleChange}
                className='rounded-md border border-gray-300 bg-gray-100 px-3 py-2'
                required
              />
            </div>

            <button
              type='button'
              onClick={handleNext}
              className='hover:bg-lime-600:bg-lime-500 rounded-md bg-lime-500 px-4 py-2 font-medium text-white transition-colors'
            >
              Volgende
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className='flex flex-col gap-2'>
              <label htmlFor='imageUrl' className='font-medium text-gray-700'>
                Heb je een foto of afbeelding van het recept?
              </label>

              <div className='flex flex-col gap-2'>
                <input
                  type='file'
                  id='imageUrl'
                  name='imageUrl'
                  accept='image/*'
                  onChange={handleChange}
                  className='rounded-md border border-gray-300 bg-gray-100 px-3 py-2 file:mr-4 file:rounded-md file:border-0 file:bg-lime-500 file:px-4 file:py-2 file:font-medium file:text-white file:transition-colors file:hover:bg-lime-600'
                  required
                />
                {selectedFile && (
                  <div className='relative mt-2 inline-block'>
                    <button
                      type='button'
                      aria-label='Verwijder afbeelding'
                      onClick={() => {
                        setSelectedFile(undefined);
                        setPreview(undefined);
                      }}
                      className='absolute top-2 left-2 z-10 cursor-pointer rounded-full bg-white p-2 shadow-md hover:text-red-500'
                    >
                      {/* Trash icon from lucide-react */}
                      <Trash />
                    </button>
                    <button
                      type='button'
                      onClick={() => {
                        const img = document.createElement('img');
                        img.src = preview as string;
                        img.style.position = 'fixed';
                        img.style.top = '0';
                        img.style.left = '0';
                        img.style.width = '100vw';
                        img.style.height = '100vh';
                        img.style.objectFit = 'contain';
                        img.style.background = 'rgba(0,0,0,0.95)';
                        img.style.zIndex = '9999';
                        img.style.cursor = 'zoom-out';
                        img.onclick = () => document.body.removeChild(img);
                        document.body.appendChild(img);
                      }}
                      className='focus:outline-none'
                      tabIndex={-1}
                    >
                      <img
                        src={preview}
                        alt='Preview'
                        className='max-h-64 w-auto cursor-zoom-in rounded-lg border border-gray-200 object-cover shadow'
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className='flex justify-between'>
              <button
                type='button'
                onClick={handleBack}
                className='cursor-pointer rounded-md bg-gray-300 px-4 py-2 font-medium text-gray-800 hover:bg-gray-400'
              >
                Terug
              </button>
              <button
                type='button'
                onClick={handleNext}
                className='cursor-pointer rounded-md bg-lime-500 px-4 py-2 font-medium text-white transition-colors hover:bg-lime-600'
              >
                Volgende
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className='flex flex-col gap-2'>
              <label htmlFor='difficulty' className='font-medium text-gray-700'>
                Hoe moeilijk is dit recept?
              </label>
              <select
                id='difficulty'
                name='difficulty'
                value={formData.difficulty}
                onChange={handleChange}
                className='rounded-md border border-gray-300 bg-gray-100 px-3 py-2'
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='category' className='font-medium text-gray-700'>
                In welke categorie valt dit recept?
              </label>
              <select
                id='category'
                name='category'
                value={formData.category}
                onChange={handleChange}
                className='rounded-md border border-gray-300 bg-gray-100 px-3 py-2'
              >
                {categories.map((categorie) => (
                  <option key={categorie} value={categorie}>
                    {categorie}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <p className='font-medium text-red-500'>
                {error ||
                  'Er is iets misgegaan bij het aanmaken van het recept.'}
              </p>
            )}

            <div className='flex justify-between'>
              <button
                type='button'
                onClick={handleBack}
                className='cursor-pointer rounded-md bg-gray-300 px-4 py-2 font-medium text-gray-800 hover:bg-gray-400'
              >
                Terug
              </button>
              <button
                type='submit'
                disabled={isMutating}
                className='cursor-pointer rounded-md bg-lime-500 px-4 py-2 font-medium text-white transition-colors hover:bg-lime-600'
              >
                {isMutating || isLoading ? 'Opslaan...' : 'Opslaan'}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
