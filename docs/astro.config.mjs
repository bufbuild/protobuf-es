// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";
import starlightLinksValidator from "starlight-links-validator";
import remarkHeadingId from "remark-heading-id";

// https://astro.build/config
export default defineConfig({
  site: "https://protobufes.com",
  integrations: [
    sitemap(),
    starlight({
      title: "Protobuf-ES",
      logo: {
        src: "./src/assets/logo.svg",
        replacesTitle: true,
      },
      favicon: "/favicon.png",
      // Fathom analytics, loaded on every page.
      head: [
        {
          tag: "script",
          attrs: {
            src: "https://cdn.usefathom.com/script.js",
            "data-site": "TODO",
            defer: true,
          },
        },
      ],
      // Override Head to inject Vercel Web Analytics via @vercel/analytics.
      components: {
        Head: "./src/components/Head.astro",
      },
      pagination: false,
      plugins: [starlightLinksValidator()],
      customCss: ["./src/styles/custom.css"],
      // Organize the docs around the user journey from first generation to advanced reflection and plugins.
      sidebar: [
        {
          label: "Introduction",
          items: [
            { slug: "index" },
            { slug: "how-it-compares" },
            { slug: "getting-started" },
          ],
        },
        {
          label: "Code Generation",
          items: [
            { slug: "plugin-options" },
            { slug: "generated-code" },
            { slug: "json-types" },
            { slug: "valid-types" },
          ],
        },
        {
          label: "Runtime",
          items: [
            { slug: "working-with-messages" },
            { slug: "serialization" },
            { slug: "well-known-types" },
            { slug: "reflection" },
          ],
        },
        {
          label: "Advanced",
          items: [{ slug: "writing-plugins" }],
        },
        {
          label: "More",
          items: [
            { slug: "examples" },
            { slug: "migrating-from-v1" },
            { slug: "faq" },
          ],
        },
      ],
    }),
  ],
  markdown: {
    remarkPlugins: [remarkHeadingId],
  },
});
