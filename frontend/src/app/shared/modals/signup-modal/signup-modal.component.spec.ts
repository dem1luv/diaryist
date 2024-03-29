import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupModalComponent } from './signup-modal.component';
import { AuthService } from '../../services/auth/auth.service';
import { Store } from '@ngxs/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';

class MockService {}

describe('SignupModalComponent', () => {
  let component: SignupModalComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SignupModalComponent,
        FormBuilder,
        { provide: AuthService, useClass: MockService },
        { provide: NgbActiveModal, useClass: MockService },
        { provide: Store, useClass: MockService },
      ],
    });

    component = TestBed.inject(SignupModalComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
