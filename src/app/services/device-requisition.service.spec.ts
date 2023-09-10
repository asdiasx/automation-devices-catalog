import { TestBed } from '@angular/core/testing';

import { DeviceRequisitionService } from './device-requisition.service';

describe('RequisitionService', () => {
  let service: DeviceRequisitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceRequisitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
