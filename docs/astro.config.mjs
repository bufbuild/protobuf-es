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
      // Keep tutorials, guides, reference material, and examples in separate groups.
      sidebar: [
        {
          label: "Start",
          items: [
            { slug: "index" },
            { slug: "getting-started" },
          ],
        },
        {
          label: "Guides",
          items: [
            { slug: "working-with-messages" },
            { slug: "serialization" },
            { slug: "extensions" },
            {
              label: "Reflection",
              items: [
                { slug: "reflection" },
                { slug: "reflection/descriptors" },
                { slug: "reflection/registries" },
                { slug: "reflection/custom-options" },
                { slug: "reflection/dynamic-messages" },
              ],
            },
            {
              label: "Writing Plugins",
              items: [
                { slug: "writing-plugins" },
                { slug: "writing-plugins/generating-files" },
                { slug: "writing-plugins/options" },
              ],
            },
          ],
        },
        {
          label: "Reference",
          items: [
            { slug: "reference" },
            {
              label: "Generated Code",
              items: [
                { slug: "generated-code" },
                { slug: "generated-code/field-types" },
                { slug: "generated-code/features" },
              ],
            },
            { slug: "plugin-options" },
            { slug: "migrating-from-v1" },
            { slug: "well-known-types" },
            { slug: "json-types" },
            { slug: "valid-types" },
            { slug: "faq" },
          ],
        },
        {
          label: "Examples",
          items: [
            { slug: "examples" },
            { slug: "examples/node-message-store" },
            { slug: "examples/twirp-plugin" },
            { slug: "examples/any-registry" },
            { slug: "examples/custom-options-redaction" },
          ],
        },
      ],
    }),
  ],
  markdown: {
    remarkPlugins: [remarkHeadingId],
  },
});
