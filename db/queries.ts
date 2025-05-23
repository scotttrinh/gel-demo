import type { Executor, DrizzleDB } from "@/gel";
import { e, schema } from "@/gel";
import { eq } from "drizzle-orm";

export async function getRootFolder(exec: Executor) {
  const result = await e
    .assert_single(
      e.select(e.Folder, (f) => ({
        filter: e.op("not", e.op("exists", f.parent)),
        ...f["*"],
        files: {
          ...e.File["*"],
        },
        folders: {
          ...e.Folder["*"],
        },
      }))
    )
    .run(exec);

  if (!result) {
    throw new Error("Root folder not found");
  }

  return result;
}

export async function getFolderById(db: DrizzleDB, id: string) {
  const result = await db.query.folder.findFirst({
    where: eq(schema.folder.id, id),
    with: {
      files: true,
      folders: true,
    },
  });

  if (!result) {
    throw new Error(`Folder not found with id: ${id}`);
  }

  return result;
}
