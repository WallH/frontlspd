import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosendpointComponent } from './permisosendpoint.component';

describe('PermisosendpointComponent', () => {
  let component: PermisosendpointComponent;
  let fixture: ComponentFixture<PermisosendpointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermisosendpointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisosendpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
