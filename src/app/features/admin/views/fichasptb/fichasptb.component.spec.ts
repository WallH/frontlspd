import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichasptbComponent } from './fichasptb.component';

describe('FichasptbComponent', () => {
  let component: FichasptbComponent;
  let fixture: ComponentFixture<FichasptbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichasptbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichasptbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
