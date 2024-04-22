import URI from "@theia/core/lib/common/uri";

export const IWorkspaceReader = Symbol('IWorkspaceReader');

export interface IWorkspaceReader {
    getRootFolders(): URI[];
    getRootFoldersInStringArray(): string[];
}