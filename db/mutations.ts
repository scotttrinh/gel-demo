import assert from "node:assert/strict";
import type { Executor, DrizzleDB, BaseObject } from "@/gel";
import { e, schema } from "@/gel";

export async function createFile(
  db: DrizzleDB,
  {
    name,
    parentId,
    size,
    url,
  }: {
    name: string;
    parentId: string;
    size: number;
    url: string;
  }
): Promise<BaseObject> {
  const now = new Date();
  const result = await db
    .insert(schema.file)
    .values({
      name,
      size,
      url,
      parentId,
      createdAt: now,
      updatedAt: now,
    })
    .returning();
  assert(result.length === 1);
  return result[0];
}

export async function createFolder(
  exec: Executor,
  {
    name,
    parentId,
  }: {
    name: string;
    parentId: string | null;
  }
): Promise<BaseObject> {
  return await e
    .insert(e.Folder, {
      name,
      parent: parentId ? e.cast(e.Folder, e.uuid(parentId)) : null,
    })
    .run(exec);
}