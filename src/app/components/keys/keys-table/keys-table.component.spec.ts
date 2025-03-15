import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeysTableComponent } from './keys-table.component';

describe('KeysTableComponent', () => {
  let component: KeysTableComponent;
  let fixture: ComponentFixture<KeysTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeysTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeysTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
