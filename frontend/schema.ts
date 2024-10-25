import type { Schema } from "@/types";
import * as d from "./documents";

export { schema };

const documents = Object.values(d);

const schema: Schema = {
  documents,
};
