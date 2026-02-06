import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { UserRole } from '../common/enum';
import { User } from '../user/entities/user.entity';

export const seedAdmin = async (dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(User);
  // check admin already exists
  const email = process.env.ADMIN_EMAIL;
  const existingAdmin = await userRepository.findOneBy({ email });

  if (existingAdmin) {
    console.log('Admin already exists. Skipping seed.');
    return;
  }

  // Hash password
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    throw new Error('ADMIN_PASSWORD is not set in environment variables');
  }
  const passwordHash = await bcrypt.hash(
    adminPassword,
    parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10', 10),
  );
  // Create and save admin to db
  await userRepository.save(
    // create admin
    userRepository.create({
      email,
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
      passwordHash,
      emailVerified: true,
      isActive: true,
    }),
  );

  console.log('Admin user created successfully');
};
