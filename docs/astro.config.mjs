// Copyright 2021-2026 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/bufbuild/protobuf-es",
        },
      ],
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
          items: [{ slug: "index" }, { slug: "getting-started" }],
        },
        {
          label: "Guides",
          items: [
            { slug: "guides/messages" },
            { slug: "guides/serialization" },
            { slug: "guides/extensions" },
            { slug: "guides/reflection" },
            {
              label: "Writing Plugins",
              items: [
                { slug: "guides/writing-plugins" },
                { slug: "guides/writing-plugins/generating-files" },
                { slug: "guides/writing-plugins/options" },
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
                { slug: "reference/generated-code" },
                { slug: "reference/generated-code/field-types" },
                { slug: "reference/generated-code/features" },
              ],
            },
            {
              label: "Reflection",
              items: [
                { slug: "reference/reflection/descriptors" },
                { slug: "reference/reflection/registries" },
                { slug: "reference/reflection/custom-options" },
                { slug: "reference/reflection/dynamic-messages" },
              ],
            },
            { slug: "reference/plugin-options" },
            { slug: "reference/well-known-types" },
            { slug: "reference/json-types" },
            { slug: "reference/valid-types" },
            { slug: "reference/migrating-from-v1" },
            { slug: "reference/faq" },
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
