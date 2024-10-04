import { Workspace } from "@prisma/client";

export type WorkspacePostDto = Pick<Workspace, "name">;
export type WorkspacePatchDto = Partial<Pick<Workspace, "name" | "isPublic">>;
