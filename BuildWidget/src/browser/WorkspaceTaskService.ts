import { injectable, inject } from 'inversify';
// import URI from '@theia/core/lib/common/uri';
// import { FileService } from '@theia/filesystem/lib/browser/file-service';
// import {  FileStat } from '@theia/filesystem/lib/common/files';
// import { TaskProviderRegistry, TaskService } from '@theia/task/lib/browser';



import { WorkspaceService } from '@theia/workspace/lib/browser';
// import { TaskConfiguration } from '@theia/task/lib/common/task-protocol';
import URI from '@theia/core/lib/common/uri';
import { IWorkspaceReader } from './IWorkspaceReader ';
// import { TaskConfiguration } from '@theia/task/lib/common/task-protocol';

@injectable()
export class WorkspaceTaskService implements IWorkspaceReader{

    constructor(
        // @inject(TaskService) protected readonly taskService: TaskService,
        @inject(WorkspaceService) protected readonly workspaceService: WorkspaceService,
        // @inject(TaskProviderRegistry) protected readonly taskProviderRegistry: TaskProviderRegistry
    ) { }

    public async getRootFolders(): Promise<URI[]> {
        console.log(this.workspaceService.roots);
        return (await this.workspaceService.roots).map(root => root.resource);
    }

    public  getRootFoldersInStringArray(): string[] {
        let uris = this.getRootFolders();

        uris.then(uri => {console.log(uri.forEach(ele => ele.toComponents().path.split('/')[ele.toComponents().path.split('/').length - 1] ) );})


        let result = (await uris).map(uri => uri.toComponents().path.split('/')[uri.toComponents().path.split('/').length - 1]);

        console.log("Result is: ");
        console.log(result);

        return result;
    }

    //  public async getTaskConfigurations(): Promise<TaskConfiguration[]> {
    //      const configs: TaskConfiguration[] = [];
    //      const rootUris = await this.getRootFolders();
    //      for (const rootUri of rootUris) {
    //          const taskConfigs = await this.taskService.getTasks(rootUri);
    //          configs.push(...taskConfigs);
    //      }
    //      return configs;
    //  }

    // public async getTaskConfigurations(): Promise<TaskConfiguration.TaskConfiguration[]> {
    //     const configs: TaskConfiguration.TaskConfiguration[] = [];
    //     const roots = await this.workspaceService.roots;
    //     for (const root of roots) {
    //         const taskConfigs = await this.taskService.getConfigsFor(root.uri);
    //         configs.push(...taskConfigs);
    //     }
    //     return configs;
    // }
    
}