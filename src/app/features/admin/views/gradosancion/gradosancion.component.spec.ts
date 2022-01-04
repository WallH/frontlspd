import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradosancionComponent } from './gradosancion.component';

describe('GradosancionComponent', () => {
  let component: GradosancionComponent;
  let fixture: ComponentFixture<GradosancionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradosancionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradosancionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
