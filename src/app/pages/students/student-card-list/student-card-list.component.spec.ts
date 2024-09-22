import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCardListComponent } from './student-card-list.component';

describe('StudentCardListComponent', () => {
  let component: StudentCardListComponent;
  let fixture: ComponentFixture<StudentCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentCardListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
