import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaptbComponent } from './fichaptb.component';

describe('FichaptbComponent', () => {
  let component: FichaptbComponent;
  let fixture: ComponentFixture<FichaptbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaptbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaptbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
