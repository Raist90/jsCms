import { addDocument } from "@/types";

export { article, page, settings };

const article = addDocument({
  description: "This is an article",
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    {
      description: "This is the article title",
      name: "title",
      required: true,
      title: "Title",
      type: "string",
    },
    {
      description: "This is the article slug",
      name: "slug",
      required: true,
      title: "Slug",
      type: "string",
    },
  ],
});

const page = addDocument({
  description: "This is a page",
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    {
      description: "This is the page title",
      name: "title",
      required: true,
      title: "Title",
      type: "string",
    },
    {
      description: "This is the page slug",
      name: "slug",
      required: true,
      title: "Slug",
      type: "string",
    },
    {
      description: "Check this if you want the page to be indexable",
      name: "isIndexable",
      required: true,
      title: "Is Indexable",
      type: "boolean",
    },
  ],
});

const settings = addDocument({
  description: "This is the settings document",
  name: "settings",
  title: "Settings",
  type: "document",
  fields: [
    {
      description: "These are the general settings",
      name: "generalSettings",
      required: true,
      title: "General settings",
      type: "object",
      fields: [
        {
          description: "This is the site title",
          name: "siteTitle",
          required: true,
          title: "Site title",
          type: "string",
        },
        {
          description: "This is the site description",
          name: "siteDescription",
          required: false,
          title: "Site description",
          type: "string",
        },
      ],
    },
  ],
});
