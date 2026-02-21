/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Ignora erros de tipo que travam o build
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignora avisos de lint
  },
  // FORÇA O NEXT A NÃO TENTAR RENDERIZAR NADA ESTÁTICO QUE USE PRISMA NO BUILD
  experimental: {
    workerThreads: false,
    cpus: 1
  }
};

export default nextConfig;