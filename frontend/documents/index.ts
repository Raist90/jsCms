import { addDocument } from "@/types";

export { article, page };

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
  ],
});
