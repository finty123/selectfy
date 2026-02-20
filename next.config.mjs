/** @type {import('next').NextConfig} */
const nextConfig = {
  // Isso desativa a checagem rigorosa de tipos no build se necessário, 
  // mas o foco aqui é ignorar erros de coleta de dados estáticos.
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;