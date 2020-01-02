import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { PROJECT } from '../models/project';
@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  public stages = ['Approval In Principle', 'Detailed Design', 'Operation / Maintenance', 'Feasibility / Masterplan', 'Outline Design'];
  form = new FormGroup({
    projectNumber: new FormControl('', Validators.required),
    projectTitle: new FormControl('', Validators.required),
    projectLeadOffice: new FormControl('', Validators.required),
    client: new FormControl('', Validators.required),
    stage: new FormControl('', Validators.required)
  });

  constructor(public dialogRef: MatDialogRef<EditProjectComponent>, @Inject(MAT_DIALOG_DATA) public data: PROJECT | any,
    public dataService: DataService) { }

  ngOnInit() {
  }

  cancelClick(): void {
    this.dialogRef.close();
  }

  public projectUpdate(): void {
    let selRowId = this.data.id;
    this.data = this.form.value;
    this.data.id = selRowId;
    this.dataService.updateProject(this.data);
  }

}
