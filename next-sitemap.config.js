const siteMetadata = require("./src/utils/siteMetaData");

module.exports = {
  siteUrl: siteMetadata.siteUrl,
  changefreq: "daily",
  priority: 0.7,
  generateRobotsTxt: true,
  exclude: [
    "/server-sitemap.xml",
    "/404",
    "/500",
    "/api/*",
    "/_next/*",
    "/favicon.ico",
    "/private/*",
    "/admin/*",
    "/dashboard/*",
    "/test/*",
  ],
  robotsTxtOptions: {
    policies: [], // نعطل السياسات الافتراضية لاستخدام النسخة المخصصة
    additionalSitemaps: [`${siteMetadata.siteUrl}/sitemap.xml`],
    transformRobotsTxt: async () => {
      const lastUpdated = new Date().toISOString();
      return `# ملف robots.txt المولد تلقائياً
# آخر تحديث: ${lastUpdated}

User-agent: *
Allow: /
Disallow: /private/*
Disallow: /admin/*
Disallow: /dashboard/*
Disallow: /_next/static/*
Disallow: /test/*

User-agent: Googlebot-Image
Allow: /images/*
Allow: /assets/*
Allow: /public/uploads/*

Sitemap: ${siteMetadata.siteUrl}/sitemap.xml`;
    },
  },
  transform: async (config, path) => {
    const blockedPaths = [
      "/private",
      "/admin",
      "/dashboard",
      "/_next",
      "/api",
      "/404",
      "/500",
      "/favicon.ico",
      "/server-sitemap.xml",
      "/test",
    ];

    if (blockedPaths.some((blocked) => path.includes(blocked))) {
      return null;
    }

    return {
      loc: `${siteMetadata.siteUrl}${path}`,
      changefreq: config.changefreq,
      priority: path === "/" ? 1.0 : config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  autoLastmod: true,
  trailingSlash: false,
  outDir: "public",
  sitemapSize: 50000,
  alternateRefs: [],
  generateIndexSitemap: false,
  // إعدادات إضافية لتحسين الأداء
  sourceDir: ".next",
  cacheMaxAgeSeconds: 86400, // 24 ساعة
};
