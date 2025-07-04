export type {
  AppConfig,
  ComputeRange,
  DocumentDefinition,
  DocumentEntry,
  Prettify,
  Schema,
};

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
      Omit<BaseFieldKeys, "required"> & {
        type: "array";
        required: false;
        of:
          | "string"
          | "number"
          | "boolean"
          | Prettify<BaseFieldKeys & { type: "object"; fields: Field[] }>;
        min?: number;
        max?: number;
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

type Schema = {
  documents: DocumentDefinition[];
};

type AppConfig = {
  absoluteDBPath?: string;
  schema: Schema;
};

// TODO: move this stuff elsewhere or reorganize types folder
type DocumentEntry = {
  id: ReturnType<typeof crypto.randomUUID>;
  type: string;
  data: Record<string, any>;
  definition: DocumentDefinition;
  timestamp: string;
};
