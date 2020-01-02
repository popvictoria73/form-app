import { Action } from '@ngrx/store';
import { PROJECT } from '../models/project';

export enum ProjectsActionType {
    GET_PROJECTS = 'GET_PROJECTS',
    GET_PROJECTS_SUCCESS = 'GET_PROJECTS_SUCCESS',
    GET_PROJECTS_FAILED = 'GET_PROJECTS_FAILED',
    ADD_PROJECT = 'ADD_PROJECT',
    ADD_PROJECT_SUCCESS = 'ADD_PROJECT_SUCCESS',
    ADD_PROJECT_FAILED = 'ADD_PROJECT_FAILED',
    UPDATE_PROJECT = 'UPDATE_PROJECT',
    UPDATE_PROJECT_SUCCESS = 'UPDATE_PROJECT_SUCCESS',
    UPDATE_PROJECT_FAILED = 'UPDATE_PROJECT_FAILED',
}

export class GetProjects implements Action {
    readonly type = ProjectsActionType.GET_PROJECTS;
}

export class GetProjectsSuccess implements Action {
    readonly type = ProjectsActionType.GET_PROJECTS_SUCCESS;
    constructor(public payload: Array<PROJECT>) { }
}

export class GetProjectsFailed implements Action {
    readonly type = ProjectsActionType.GET_PROJECTS_FAILED;
    constructor(public payload: string) { }
}

export class AddProject implements Action {
    readonly type = ProjectsActionType.ADD_PROJECT;
    constructor(public payload: PROJECT) { }
}

export class AddProjectSuccess implements Action {
    readonly type = ProjectsActionType.ADD_PROJECT_SUCCESS;
    constructor(public payload: PROJECT) { }
}

export class AddProjectFailed implements Action {
    readonly type = ProjectsActionType.ADD_PROJECT_FAILED;
    constructor(public payload: string) { }
}

export class UpdateProject implements Action {
    readonly type = ProjectsActionType.UPDATE_PROJECT;
    constructor(public payload: PROJECT) { }
}

export class UpdateProjectSuccess implements Action {
    readonly type = ProjectsActionType.UPDATE_PROJECT_SUCCESS;
    constructor(public payload: PROJECT) { }
}

export class UpdateProjectFailed implements Action {
    readonly type = ProjectsActionType.UPDATE_PROJECT_FAILED;
    constructor(public payload: string) { }
}

export type ProjectsActions = GetProjects | GetProjectsSuccess | GetProjectsFailed | AddProject |
    AddProjectSuccess |
    AddProjectFailed |
    UpdateProject |
    UpdateProjectSuccess |
    UpdateProjectFailed