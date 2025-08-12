import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCarDialog } from './new-car-dialog';

describe('NewCarDialog', () => {
  let component: NewCarDialog;
  let fixture: ComponentFixture<NewCarDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCarDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCarDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
