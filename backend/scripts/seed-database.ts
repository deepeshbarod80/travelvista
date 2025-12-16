import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Post from '../models/post.js';
import User from '../models/user.js';
import samplePosts from '../data/sample_posts.json' assert { type: 'json' };

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travelvista');

    // Clear existing data
    await Post.deleteMany({});
    await User.deleteMany({});

    // Create sample users
    const users = await User.create([
      {
        username: 'admin',
        email: 'admin@travelvista.com',
        password: 'admin123',
        role: 'admin',
      },
      {
        username: 'traveler1',
        email: 'traveler1@example.com',
        password: 'password123',
        role: 'user',
      },
    ]);

    // Create sample posts
    const postsWithUsers = samplePosts.map((post) => ({
      ...post,
      author: users[Math.floor(Math.random() * users.length)]._id,
    }));

    await Post.create(postsWithUsers);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
