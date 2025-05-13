import { e, type Executor, db, type BaseObject } from "@/gel";

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
