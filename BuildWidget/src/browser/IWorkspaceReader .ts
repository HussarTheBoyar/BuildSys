import URI from "@theia/core/lib/common/uri";

export const IWorkspaceReader = Symbol('IWorkspaceReader');

export interface IWorkspaceReader {
    getRootFolders(): Promise<URI[]>;
    getRootFoldersInStringArray(): string[];
}