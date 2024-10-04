import customFetch from "@/fetch/customFetch";
import { WorkspacePatchDto, WorkspacePostDto } from "@/types/models";

const createWorkspace = async (body: WorkspacePostDto) => await customFetch(`/workspace`, { method: "POST", body });

const getWorkspaceList = async () => await customFetch(`/workspace`, { method: "GET" });

const updateWorkspace = async ({ workspaceId, body }: { workspaceId: number; body: WorkspacePatchDto }) =>
  await customFetch(`/workspace/${workspaceId}`, { method: "PATCH", body });

const deleteWorkspace = async (workspaceId: number) =>
  await customFetch(`/workspace/${workspaceId}`, { method: "DELETE" });

export const WorkspaceFetch = {
  createWorkspace,
  getWorkspaceList,
  updateWorkspace,
  deleteWorkspace,
};
