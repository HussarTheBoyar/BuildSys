import { ContainerModule } from '@theia/core/shared/inversify';
import { BuildWidgetWidget } from './BuildWidget-widget';
import { BuildWidgetContribution } from './BuildWidget-contribution';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';

import '../../src/browser/style/index.css';
import { WorkspaceTaskService } from './WorkspaceTaskService';
import { IWorkspaceReader } from './IWorkspaceReader ';

export default new ContainerModule(bind => {
    bindViewContribution(bind, BuildWidgetContribution);
    bind(FrontendApplicationContribution).toService(BuildWidgetContribution);
    bind(BuildWidgetWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: BuildWidgetWidget.ID,
        createWidget: () => ctx.container.get<BuildWidgetWidget>(BuildWidgetWidget)
    })).inSingletonScope();
    bind(IWorkspaceReader).to(WorkspaceTaskService).inSingletonScope();
});
