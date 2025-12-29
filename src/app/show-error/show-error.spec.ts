import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowError } from './show-error';

describe('ShowError', () => {
  let component: ShowError;
  let fixture: ComponentFixture<ShowError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
