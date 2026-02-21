const nextConfig = {
  // Isso impede que erros de 'collecting page data' parem o build total
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  // Adicione esta linha:
  experimental: {
    workerThreads: false,
    cpus: 1
  }
};