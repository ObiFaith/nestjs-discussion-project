import { AppDataSource } from './data-source';
import { seedAdmin } from '../seeds/admin.seed';

async function runSeed() {
  await AppDataSource.initialize();
  await seedAdmin(AppDataSource);
  await AppDataSource.destroy();
}

runSeed();
