import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverimgCroppingModelComponent } from './coverimg-cropping-model.component';

describe('CoverimgCroppingModelComponent', () => {
  let component: CoverimgCroppingModelComponent;
  let fixture: ComponentFixture<CoverimgCroppingModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoverimgCroppingModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverimgCroppingModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
