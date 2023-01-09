import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContentComponent } from './list-content.component';

describe('ListContentComponent', () => {
  let component: ListContentComponent;
  let fixture: ComponentFixture<ListContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
