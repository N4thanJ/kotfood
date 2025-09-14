import { prisma } from '@/lib/prisma';
import { RecipeBody } from '@/types';

const initialRecipes: RecipeBody[] = [
  {
    name: 'Spaghetti Carbonara',
    description:
      'Classic Italian pasta dish with eggs, cheese, pancetta, and pepper.',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4XfYcRWtdP9NY3IB4pS1N0fWqhW-50Lnq2A&s',
  },
  {
    name: 'Chicken Tikka Masala',
    description:
      'Popular Indian curry with grilled chicken pieces in creamy tomato sauce.',
    imageUrl:
      'https://www.indianhealthyrecipes.com/wp-content/uploads/2022/06/chicken-tikka-masala.jpg',
  },
  {
    name: 'Vegetable Stir Fry',
    description: 'Quick and healthy stir-fried vegetables with soy sauce.',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOFhcbP5r6JkEyqPApLr71n6U7GbJTGz8e8w&s',
  },
  {
    name: 'Beef Tacos',
    description: 'Mexican-style tacos with seasoned beef, lettuce, and cheese.',
    imageUrl:
      'https://cdn.urbancookery.com/2021/01/bbq_tacos_1.jpg__900x739_q85_crop.jpg',
  },
];

const seed = async () => {
  await prisma.user.deleteMany();
  await prisma.recipe.deleteMany();

  for (const post of initialRecipes) {
    await prisma.recipe.create({
      data: {
        name: post.name,
        description: post.description,
        imageUrl: post.imageUrl,
      },
    });
  }
};

seed();
