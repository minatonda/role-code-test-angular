import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  taskname: string;

  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose

  ngOnInit() {
    // Each task is uniquely identified by its name.
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: '0', stage: 0 },
      { name: '1', stage: 0 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }

  public createTask(name: string) {
    if (name) {
      this.tasks.push({ name, stage: 0 });
    }
  }

  public backwardTask(task: Task) {
    if (!this.isBackwardDisabled(task.stage)) {
      task.stage--;
    }
  }

  public forwardTask(task: Task) {
    if (!this.isForwardDisabled(task.stage)) {
      task.stage++;
    }
  }

  public isBackwardDisabled(stage:number){
    return !(stage !== 0);
  }

  public isForwardDisabled(stage:number){
    return !(stage < this.stagesNames.length - 1);
  }

  public deleteTask(task: any) {
    this.tasks.splice(this.tasks.indexOf(task), 1);
  }

  public getTasksByStage(stage: number) {
    return this.tasks.filter((t) => t.stage === stage);
  }

  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }
}

interface Task {
  name: string;
  stage: number;
}
