import * as React from 'react';
import { injectable, postConstruct, inject } from '@theia/core/shared/inversify';
import { AlertMessage } from '@theia/core/lib/browser/widgets/alert-message';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService } from '@theia/core';
import { Message } from '@theia/core/lib/browser';
import { WorkspaceTaskService } from './WorkspaceTaskService';
import { IWorkspaceReader } from './IWorkspaceReader ';

@injectable()
export class BuildWidgetWidget extends ReactWidget {

    static readonly ID = 'BuildWidget:widget';
    static readonly LABEL = 'Build Widget';

    RootPath :string[] = ['','Release', 'Debug'];
    Pulldown1 :string[] = ['option11', 'option12'];
    Pulldown2 :string[] = ['option21', 'option22'];

    @inject(MessageService)
    protected readonly messageService!: MessageService;

    @inject(IWorkspaceReader)
    protected readonly WorkspaceTaskService!: WorkspaceTaskService;

    @postConstruct()
    protected init(): void {
        this.doInit()
    }

    protected async doInit(): Promise <void> {
        this.id = BuildWidgetWidget.ID;
        this.title.label = BuildWidgetWidget.LABEL;
        this.title.caption = BuildWidgetWidget.LABEL;
        this.title.closable = true;
        this.title.iconClass = 'fa fa-window-maximize'; // example widget icon.
        this.update();
    }

    render(): React.ReactElement {
        const header = `This is a sample widget which simply calls the messageService
        in order to display an info message to end users.`;
        
        this.getRootPath();
        console.log("Root Path: " + this.RootPath);

        this.WorkspaceTaskService.getRootFoldersInStringArray().then(strings => {strings.forEach( ele => this.RootPath.push(ele) ); console.log("Push log: " + this.RootPath);} );

        console.log("Root Path change: " + this.RootPath);

        
        return <div id='widget-container'>
            <AlertMessage type='INFO' header={header} />
            <span>Build Option </span>
            <select name="BuildOption" id="BuildOption" onClick={this.onFirstDropdownChange}>
                {this.RootPath.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <br/>
            <select name="BuildOptionPullDown" id="BuildOptionPullDown" >
                
            </select>
            <br/>
            <br/>
            <button id='BuildButton' className='theia-button secondary' title='Build' onClick={_a => this.displayMessage()}><i className="fa fa-gavel"></i></button>
        </div>
    }

    protected displayMessage(): void {
        this.messageService.info('Congratulations: BuildWidget Widget Successfully Created!');
    }

    protected onActivateRequest(msg: Message): void {
        super.onActivateRequest(msg);
        const htmlElement = document.getElementById('displayMessageButton');
        if (htmlElement) {
            htmlElement.focus();
        }
    }

    protected onFirstDropdownChange = (event: React.FormEvent<HTMLSelectElement>) => {
        const selectedValue = (event.target as HTMLSelectElement).value;
        // Here you can fill the second pulldown based on the selected value
        // For example, if the selected value is "option1", you can fill the second pulldown with options "a", "b", "c"
        if (selectedValue === "Release") {
            this.fillSecondDropdown(["a", "b", "c"]);
        } else if (selectedValue === "Debug") {
            this.fillSecondDropdown(["x", "y", "z"]);
        } else if (selectedValue === "") {
            this.fillSecondDropdown([]);
        }
    }

    protected fillSecondDropdown = (options: string[]) => {
        const secondDropdown = document.getElementById("BuildOptionPullDown") as HTMLSelectElement;
        // Clear the current options
        secondDropdown.innerHTML = "";
        // Add the new options
        options.forEach(option => {
            const optionElement = document.createElement("option");
            optionElement.value = option;
            optionElement.text = option;
            secondDropdown.add(optionElement);
        });
    }

     protected getRootPath(): string[] {
        this.RootPath = [];
        console.log("Check workspaceService");
        let result : string[] = [];
        this.WorkspaceTaskService.getRootFoldersInStringArray().then(strings => {result=  strings; console.log("tsx log: " + strings + "tsx size:" + strings.length) ;});

        this.WorkspaceTaskService.getRootFoldersInStringArray().then(strings => {strings.forEach( ele => this.RootPath.push(ele) ); console.log("Push log: " + this.RootPath);} );

        console.log("after change: " + result);
        return result;
     } 

}
