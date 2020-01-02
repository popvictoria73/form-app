import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EditProjectComponent } from './edit-project.component';
import { DataService } from '../services/data.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('EditProjectComponent', () => {
  let component: EditProjectComponent;
  let fixture: ComponentFixture<EditProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule , MatButtonModule,MatDialogModule,
        MatInputModule,
        MatIconModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        MatPaginatorModule,HttpClientTestingModule],
      declarations: [ EditProjectComponent ],
      providers: [DataService,{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('projectTitle field required', () => {
    let errors = {};
    let title = component.form.controls['projectTitle'];
    errors = title.errors || {};
    expect(errors['required']).toBeTruthy();
    component.form.controls['projectTitle'].setValue("Demo clients");
    expect(component.form.controls['projectTitle'].valid).toBeTruthy();
  });

  it('client field required', () => {
    let errors = {};
    let client = component.form.controls['client'];
    errors = client.errors || {};
    expect(errors['required']).toBeTruthy();
    component.form.controls['client'].setValue("Demo1");
    expect(component.form.controls['client'].valid).toBeTruthy();
  });

  it('projectNumber field required ', () => {
    let errors = {};
    let number = component.form.controls['projectNumber'];
    errors = number.errors || {};
    expect(errors['required']).toBeTruthy();
    component.form.controls['projectNumber'].setValue("12234");
    expect(component.form.controls['projectNumber'].valid).toBeTruthy();
  });

  it('projectLeadOffice field required', () => {
    let errors = {};
    let ofc = component.form.controls['projectLeadOffice'];
    errors = ofc.errors || {};
    expect(errors['required']).toBeTruthy();
    component.form.controls['projectLeadOffice'].setValue("USA");
    expect(component.form.controls['projectLeadOffice'].valid).toBeTruthy();
  });

  it('stage field required', () => {
    let errors = {};
    let stage = component.form.controls['stage'];
    errors = stage.errors || {};
    expect(errors['required']).toBeTruthy();
    component.form.controls['stage'].setValue("Detail Design");
    expect(component.form.controls['stage'].valid).toBeTruthy();
  });

});
