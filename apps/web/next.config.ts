import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@code-doctor/contracts', '@code-doctor/database'],
};

export default nextConfig;
