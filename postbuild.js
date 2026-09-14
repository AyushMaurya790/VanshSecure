
import { existsSync } from 'fs';
import { join } from 'path';

const outputDir = join(process.cwd(), '.output');
const serverDir = join(outputDir, 'server');
const publicDir = join(outputDir, 'public');

console.log('\n📦 Checking build output...\n');

if (!existsSync(outputDir)) {
  console.error('❌ No output directory found after build');
  process.exit(1);
}

if (!existsSync(serverDir)) {
  console.error('❌ Server directory not found:', serverDir);
  process.exit(1);
}

if (!existsSync(publicDir)) {
  console.error('❌ Public directory not found:', publicDir);
  process.exit(1);
}

console.log('✅ Build output verified:');
console.log('- Server:', serverDir);
console.log('- Public:', publicDir);
console.log('- Output:', outputDir);
console.log('\n🚀 Ready for deployment!\n');