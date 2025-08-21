import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/image/**',
      },
      {
        protocol: 'https',
        hostname: 'yt3.ggpht.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'open.spotify.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },

  webpack(config) {
    const fileLoaderRule = config.module?.rules?.find(
      (rule: object) =>
        typeof rule === 'object' &&
        rule !== null &&
        'test' in rule &&
        (rule.test as RegExp)?.test?.('.svg')
    );

    if (fileLoaderRule && typeof fileLoaderRule === 'object') {
      config.module?.rules?.push(
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/,
        },
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [/url/] },
          use: ['@svgr/webpack'],
        }
      );

      if (Array.isArray(fileLoaderRule.exclude)) {
        fileLoaderRule.exclude.push(/\.svg$/i);
      } else {
        fileLoaderRule.exclude = [/\.svg$/i];
      }
    }

    return config;
  },
};
export default withAnalyzer(nextConfig);
