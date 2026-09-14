// Post-build script to verify output directory
import { existsSync } from 'fs';
import { join } from 'path';

const outputDir = join(process.cwd(), '.output');
const serverDir = join(outputDir, 'server');
const publicDir = join(outputDir, 'public');

console.log('\n📦 Checking build output...\n');

if (!existsSync(outputDir)) {
  console.error('❌ ERROR: .output directory not found!');
  console.error('Current directory:', process.cwd());
  process.exit(1);
}

if (!existsSync(serverDir)) {
  console.error('❌ ERROR: .output/server directory not found!');
  process.exit(1);
}

if (!existsSync(publicDir)) {
  console.error('❌ ERROR: .output/public directory not found!');
  process.exit(1);
}

console.log('✅ Build output verified:');
console.log(`   - Server: ${serverDir}`);
console.log(`   - Public: ${publicDir}`);
console.log(`\n✅ OUTPUT DIRECTORY: ${outputDir}`);
console.log('\n🚀 Ready for deployment!\n');
