import { ProjectsActions, ProjectsActionType } from './actions';

export const initialState = {};

export function projectsReducer(state = initialState, action: ProjectsActions) {

    switch (action.type) {

        case ProjectsActionType.GET_PROJECTS: {
            return { ...state };
        }

        case ProjectsActionType.GET_PROJECTS_SUCCESS: {
            let msgText = '';
            let bgClass = '';

            if (action.payload.length < 1) {
                msgText = 'No project found';
                bgClass = 'bg-danger';
            } else {
                msgText = 'Loading project data';
                bgClass = 'bg-info';
            }

            return {
                ...state,
                projectList: action.payload,
                message: msgText,
                infoClass: bgClass
            };
        }

        case ProjectsActionType.GET_PROJECTS_FAILED: {
            return { ...state };
        }

        case ProjectsActionType.ADD_PROJECT: {
            return {
                ...state, message: '',
                infoClass: ''
            };
        }

        case ProjectsActionType.ADD_PROJECT_SUCCESS: {
            const data = state['projectList'].push(action.payload);
            return {
                ...state,
                message: 'New project added',
                infoClass: 'bg-success'
            };
        }

        case ProjectsActionType.ADD_PROJECT_FAILED: {
            return { ...state };
        }

        case ProjectsActionType.UPDATE_PROJECT: {
            return {
                ...state,
                message: '',
                infoClass: ''
            };
        }

        case ProjectsActionType.UPDATE_PROJECT_SUCCESS: {
            return {
                ...state,
                message: 'Update Project',
                infoClass: 'bg-success'
            };
        }

        case ProjectsActionType.UPDATE_PROJECT_FAILED: {
            return { ...state };
        }

        default: {
            return state;
        }

    }

}
