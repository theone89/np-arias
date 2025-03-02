import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['randomuser.me', 'api.pexels.com', 'images.pexels.com', 'picsum.photos', 'images.unsplash.com'],
    },
};

export default withNextIntl(nextConfig);