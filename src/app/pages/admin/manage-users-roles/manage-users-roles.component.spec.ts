import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUsersRolesComponent } from './manage-users-roles.component';

describe('ManageUsersRolesComponent', () => {
  let component: ManageUsersRolesComponent;
  let fixture: ComponentFixture<ManageUsersRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageUsersRolesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageUsersRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
