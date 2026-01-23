export default function robots() {
  const { PROJECT_PRODUCTION_URL } = process.env;

  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${PROJECT_PRODUCTION_URL}/sitemap.xml`,
    host: PROJECT_PRODUCTION_URL,
  };
}
