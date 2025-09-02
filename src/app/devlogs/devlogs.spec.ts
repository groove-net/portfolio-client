import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Devlogs } from './devlogs';

describe('Devlogs', () => {
  let component: Devlogs;
  let fixture: ComponentFixture<Devlogs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Devlogs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Devlogs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
