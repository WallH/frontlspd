import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoracionoficialComponent } from './valoracionoficial.component';

describe('ValoracionoficialComponent', () => {
  let component: ValoracionoficialComponent;
  let fixture: ComponentFixture<ValoracionoficialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValoracionoficialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValoracionoficialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
