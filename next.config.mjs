import nextPwa from 'next-pwa';

const withPWA = nextPwa({
    dest: 'public',
})


/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withPWA(nextConfig);
