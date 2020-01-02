import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
    ProjectsActionType,
    GetProjectsSuccess,
    GetProjectsFailed,
    AddProjectSuccess,
    AddProjectFailed,
    UpdateProjectSuccess,
    UpdateProjectFailed
} from './actions';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { PROJECT } from '../models/project';
import { DataService } from '../services/data.service';

@Injectable()
export class ProjectsEffects {

    constructor(private actions$: Actions, private dataService: DataService) { }

    @Effect()
    getProjects$ = this.actions$.pipe(ofType(ProjectsActionType.GET_PROJECTS),
        switchMap(() =>
            this.dataService.getProjects().pipe(
                map((projects: Array<PROJECT>) => new GetProjectsSuccess(projects)),
                catchError(error => of(new GetProjectsFailed(error)))
            )));

    @Effect()
    addProject$ = this.actions$.pipe(ofType(ProjectsActionType.ADD_PROJECT),
        switchMap((action) =>
            this.dataService.addProjects(action['payload']).pipe(
                map((project: PROJECT) => new AddProjectSuccess(project)),
                catchError(error => of(new AddProjectFailed(error)))
            )));

    @Effect()
    updateProject$ = this.actions$.pipe(ofType(ProjectsActionType.UPDATE_PROJECT),
        switchMap((action) =>
            this.dataService.updateProjects(action['payload']).pipe(
                map((project: PROJECT) => new UpdateProjectSuccess(project)),
                catchError(error => of(new UpdateProjectFailed(error)))
            )));
}
