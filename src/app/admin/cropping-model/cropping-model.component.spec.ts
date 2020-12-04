import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CroppingModelComponent } from './cropping-model.component';

describe('CroppingModelComponent', () => {
  let component: CroppingModelComponent;
  let fixture: ComponentFixture<CroppingModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CroppingModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CroppingModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
