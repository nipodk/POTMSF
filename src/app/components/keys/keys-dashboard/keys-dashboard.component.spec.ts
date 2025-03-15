import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeysDashboardComponent } from './keys-dashboard.component';

describe('KeysDashboardComponent', () => {
  let component: KeysDashboardComponent;
  let fixture: ComponentFixture<KeysDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeysDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeysDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
