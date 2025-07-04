import { addDocument } from "nexus/core";

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
      type: "slug",
      slugify: "title",
    },
    {
      description: "The article tags.",
      name: "tags",
      title: "Tags",
      type: "array",
      of: "string",
      required: false,
      min: 1,
      max: 3,
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
      required: (ctx) => {
        return !!ctx?.title?.length;
      },
      title: "Slug",
      type: "slug",
      slugify: "title",
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
          required: (ctx) => {
            return !!ctx?.siteTitle?.length;
          },
          title: "Site description",
          type: "string",
        },
      ],
    },
  ],
});
