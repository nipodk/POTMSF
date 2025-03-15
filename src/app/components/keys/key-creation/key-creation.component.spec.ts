import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyCreationComponent } from './key-creation.component';

describe('KeyCreationComponent', () => {
  let component: KeyCreationComponent;
  let fixture: ComponentFixture<KeyCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
