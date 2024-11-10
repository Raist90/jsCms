export type { Prettify, Schema, AppConfig, Document };
export type { DocumentJsonModel };
export { addDocument };

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type BaseFieldKeys = {
  description: string;
  name: string;
  required: boolean;
  title: string;
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
function addDocument(d: Document): Document {
  return d;
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
  type: "document";
} & Record<string, any>;
