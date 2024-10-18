import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksDeleteDialogComponent } from './tasks-delete-dialog.component';

describe('TasksDeleteDialogComponent', () => {
  let component: TasksDeleteDialogComponent;
  let fixture: ComponentFixture<TasksDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksDeleteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
