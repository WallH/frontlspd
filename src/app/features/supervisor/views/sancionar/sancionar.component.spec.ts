import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SancionarComponent } from './sancionar.component';

describe('SancionarComponent', () => {
  let component: SancionarComponent;
  let fixture: ComponentFixture<SancionarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SancionarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SancionarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
