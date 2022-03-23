import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewnotaComponent } from './newnota.component';

describe('NewnotaComponent', () => {
  let component: NewnotaComponent;
  let fixture: ComponentFixture<NewnotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewnotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewnotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
