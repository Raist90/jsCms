export type {
  ComputeRange,
  Prettify,
  Schema,
  AppConfig,
  DocumentDefinition,
  DocumentEntry,
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
  description?: string;
  name: string;
  required: boolean | ((ctx: Record<string, any>) => boolean);
  title: string;
};

type SlugField = Prettify<
  BaseFieldKeys & {
    type: "slug";
    slugify: Field["name"] | ((ctx: Record<string, any>) => string);
  }
>;

type ListField = Prettify<
  Omit<BaseFieldKeys, "required"> & {
    type: "checkbox";
    list: string[];
    required:
      | boolean
      | {
          min: number;
          max: number;
        };
  }
>;

type RadioField = Prettify<
  BaseFieldKeys & {
    type: "radio";
    list: string[];
    default?: string;
  }
>;

type ImageField = Prettify<
  BaseFieldKeys & {
    type: "image";
    src: string;
    alt?: string;
  }
>;

type TextField = Prettify<
  BaseFieldKeys & {
    type: "text";
  }
>;

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
    >
  | Prettify<SlugField>
  | Prettify<ListField>
  | Prettify<RadioField>
  | Prettify<ImageField>
  | Prettify<TextField>;

type DocumentDefinition = {
  description: string;
  fields: Field[];
  name: string;
  title: string;
  type: "document";
};

// TODO: move this elsewhere
function addDocument(document: DocumentDefinition): DocumentDefinition {
  return document;
}

type Schema = {
  documents: DocumentDefinition[];
};

type AppConfig = {
  schema: Schema;
};

// TODO: move this stuff elsewhere or reorganize types folder
type DocumentEntry = {
  id: ReturnType<typeof crypto.randomUUID>;
  type: string;
  data: Record<string, any>;
  timestamp: string;
};
