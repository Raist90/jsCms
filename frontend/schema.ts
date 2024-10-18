export { schema };

import type { Schema } from "@/types";
import * as d from "./documents";

const documents = Object.values(d);

const schema: Schema = {
  documents,
};
