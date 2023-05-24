/** @type {import('next').NextConfig} */
require("dotenv").config();

const nextConfig = {
	reactStrictMode: true,
};

module.exports = {
	env: {
		TOKEN_ADDRESS : "0x0",
	},
};

module.exports = nextConfig;
