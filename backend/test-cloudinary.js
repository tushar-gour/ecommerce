import './src/config/env.js';
import cloudinary, { isCloudinaryConfigured } from './src/config/cloudinary.js';

console.log('\n=== Cloudinary Configuration Test ===\n');
console.log('Is Configured:', isCloudinaryConfigured);

if (isCloudinaryConfigured) {
  console.log('\n✓ Cloudinary is properly configured!');
  console.log('Cloud Name:', cloudinary.config().cloud_name);
  console.log('API Key:', cloudinary.config().api_key ? '***' + cloudinary.config().api_key.slice(-4) : 'Not set');
} else {
  console.log('\n✗ Cloudinary is NOT configured!');
  console.log('Please check your environment variables.');
}

console.log('\n=====================================\n');
