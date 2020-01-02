import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from './services/data.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { PROJECT } from './models/project';
import { AddProjectComponent } from './add-project/add-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { Store } from '@ngrx/store';
import * as Projects from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  public displayedColumns: string[] = ['projectNumber', 'projectTitle', 'projectLeadOffice', 'client', 'stage', 'actions'];
  public projects: MatTableDataSource<PROJECT>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public httpClient: HttpClient, private store: Store<any>, public dialog: MatDialog, public dataService: DataService) { }

  addProjectDialogRef: MatDialogRef<AddProjectComponent>;

  /**
   * @param project -- Project details interface
   */
  addProjectDialog(project: PROJECT) {
    this.addProjectDialogRef = this.dialog.open(AddProjectComponent, {
      data: { project: project },
      minWidth: '350px',
      maxHeight: '600px'
    });
    this.addProjectDialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.dataService.addProjects(this.dataService.getDialogData())
          .subscribe(data => {
            this.store.dispatch(new Projects.AddProject(data));
            this.loadData();
          });
      }
    });
  }

  /**
   * Edit Project Section
   * @param row -- holds edited project details
   */
  EditProjectDetails(row) {
    const dialogRef = this.dialog.open(EditProjectComponent, {
      data: { id: row.id, projectNumber: row.projectNumber, projectTitle: row.projectTitle, projectLeadOffice: row.projectLeadOffice, client: row.client, stage: row.stage }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.dataService.updateProjects(this.dataService.getDialogData())
          .subscribe(data => {
            this.store.dispatch(new Projects.UpdateProject(data));
            this.loadData();
          });
      }
    });
  }

  ngOnInit() {
    this.loadData();
  }

  /* Get Project Details Section, 
    After adding and updating of project also this method will trigger to load updated projects
  **/  
  public loadData() {
    this.dataService.getProjects().subscribe((res) => {
      this.store.dispatch(new Projects.GetProjects());
      this.projects = new MatTableDataSource(res);
      this.projects.paginator = this.paginator;
    })
  }
}