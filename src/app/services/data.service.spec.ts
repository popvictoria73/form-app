import { TestBed, inject } from '@angular/core/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';

import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';

import { DataService } from './data.service';

describe('DataService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DataService]
        });
    });

    it('should get projects', inject(
        [HttpTestingController, DataService],
        (httpMock: HttpTestingController, dataService: DataService) => {
            const mockProjects = [
                {
                    "projectNumber": 123456788,
                    "projectTitle": "Demo Apartments",
                    "projectLeadOffice": "USA",
                    "client": "Demo",
                    "stage": "Operation / Maintenance",
                    "id": 8
                },
                {
                    "projectNumber": 123456789,
                    "projectTitle": "Demo Highways",
                    "projectLeadOffice": "USA",
                    "client": "Demo",
                    "stage": "Detailed Design",
                    "id": 9
                }
            ];

            dataService.getProjects().subscribe((event: HttpEvent<any>) => {
                switch (event.type) {
                    case HttpEventType.Response:
                        expect(event.body).toEqual(mockProjects);
                }
            });

            const mockReq = httpMock.expectOne(dataService.baseUrl);
            expect(mockReq.request.method).toEqual('GET');
            expect(mockReq.cancelled).toBeFalsy();
            expect(mockReq.request.responseType).toEqual('json');

            mockReq.flush(mockProjects);

            httpMock.verify();
        }
    )
    );

    it('should create project', inject(
        [HttpTestingController, DataService],
        (httpMock: HttpTestingController, dataService: DataService) => {
            const mockProjects =
            {
                "projectNumber": 123456788,
                "projectTitle": "Demo Apartments",
                "projectLeadOffice": "USA",
                "client": "Demo1",
                "stage": "Operation / Maintenance",
                "id": 11
            }

            dataService.addProjects(mockProjects)
                .subscribe(courseData => {
                    expect(courseData.client).toEqual('Demo1');
                });

            const req = httpMock.expectOne(dataService.baseUrl);

            expect(req.request.method).toEqual('POST');

            req.flush(mockProjects);
        }));

    it('should update project', inject(
        [HttpTestingController, DataService],
        (httpMock: HttpTestingController, dataService: DataService) => {
            const mockProjects =
            {
                "projectNumber": 123456788,
                "projectTitle": "Demo Apartments",
                "projectLeadOffice": "USA",
                "client": "Demo2",
                "stage": "Operation / Maintenance",
                "id": 11
            }

            dataService.updateProjects(mockProjects)
                .subscribe(courseData => {
                    expect(courseData.client).toEqual('Demo2');
                });

            const req = httpMock.expectOne(dataService.baseUrl + "/11");

            expect(req.request.method).toEqual('PUT');

            req.flush(mockProjects);
        }));

});