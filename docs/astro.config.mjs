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
            "data-site": "PAGVMLSX",
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
      // Separate mainline learning pages from dense reference material.
      sidebar: [
        {
          label: "Start",
          items: [
            { slug: "index" },
            { slug: "getting-started" },
            { slug: "migrating-from-v1" },
          ],
        },
        {
          label: "Mainline Guides",
          items: [
            { slug: "working-with-messages" },
            { slug: "serialization" },
            { slug: "extensions" },
            { slug: "reflection" },
            { slug: "writing-plugins" },
          ],
        },
        {
          label: "Reference",
          items: [
            { slug: "reference" },
            { slug: "generated-code" },
            { slug: "plugin-options" },
            { slug: "well-known-types" },
            { slug: "json-types" },
            { slug: "valid-types" },
            { slug: "faq" },
          ],
        },
        { label: "Examples", items: [{ slug: "examples" }] },
      ],
    }),
  ],
  markdown: {
    remarkPlugins: [remarkHeadingId],
  },
});
