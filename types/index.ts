export type {
  ComputeRange,
  Prettify,
  Schema,
  AppConfig,
  Document,
  DocumentJsonModel,
};
export { addDocument };

type ComputeRange<
  N extends number,
  Result extends Array<unknown> = [],
> = Result["length"] extends N
  ? Result
  : ComputeRange<N, [...Result, Result["length"]]>;

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type BaseFieldKeys = {
  description: string;
  name: string;
  required: boolean;
  title: string;
};

// TODO: continue this
type SpecialFieldKeys = {
  specialField: "slug" | "list" | "image" | "text";
};

type Field =
  | Prettify<
      BaseFieldKeys & {
        type: "string" | "number" | "boolean";
      }
    >
  | Prettify<
      BaseFieldKeys & {
        type: "object";
        fields: Field[];
      }
    >
  | Prettify<
      BaseFieldKeys & {
        type: "array";
        // let's restrict multidimensional arrays for now
        fields: Exclude<Field, BaseFieldKeys & { type: "array" }>[];
      }
    >;

type Document = {
  description: string;
  fields: Field[];
  name: string;
  title: string;
  type: "document";
};

// TODO: move this elsewhere
function addDocument(document: Document): Document {
  return document;
}

type Schema = {
  documents: Document[];
};

type AppConfig = {
  schema: Schema;
};

// TODO: move this stuff elsewhere or reorganize types folder
type DocumentJsonModel = {
  id: ReturnType<typeof crypto.randomUUID>;
  type: string;
  data: Record<string, any>;
};
