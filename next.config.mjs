/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";

// GitHub Pages 项目站点部署在 https://<user>.github.io/<repo>/ 子路径下，
// 需要设置 basePath 与 assetPrefix；本地开发时不启用。
const REPO = "twogether";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isGithubPages ? `/${REPO}` : "",
  assetPrefix: isGithubPages ? `/${REPO}/` : "",
};

export default nextConfig;
