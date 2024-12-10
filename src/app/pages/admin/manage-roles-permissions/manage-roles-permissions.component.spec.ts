import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRolesPermissionsComponent } from './manage-roles-permissions.component';

describe('ManageRolesPermissionsComponent', () => {
  let component: ManageRolesPermissionsComponent;
  let fixture: ComponentFixture<ManageRolesPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageRolesPermissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageRolesPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
