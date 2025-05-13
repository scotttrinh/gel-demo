import { drizzle } from "drizzle-orm/gel";
import { createClient } from "gel";
import * as schema from "@/drizzle/schema";
import * as relations from "@/drizzle/relations";
export { default as e } from "@/dbschema/edgeql-js";

export const client = createClient();

export const db = drizzle({
  client,
  schema: {
    ...schema,
    ...relations,
  },
});

export interface BaseObject {
  id: string;
}
