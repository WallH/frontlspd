import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisariaComponent } from './comisaria.component';

describe('ComisariaComponent', () => {
  let component: ComisariaComponent;
  let fixture: ComponentFixture<ComisariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComisariaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComisariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
