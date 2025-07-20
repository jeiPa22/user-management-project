import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../../core/domain/user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { UserId } from '../../../../core/domain/user/value-objects/user-id.vo';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.scss',
})
export class FormUserComponent {
  @Input() userToEdit?: User;
  @Output() save = new EventEmitter<User>();

  userForm: FormGroup;
  roles = ['admin', 'cashier'];

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      points: [0, [Validators.required, Validators.min(0)]],
      role: ['cashier', Validators.required],
      active: [true],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userToEdit'] && this.userToEdit) {
      this.userForm.patchValue({
        name: this.userToEdit.name,
        lastname: this.userToEdit.lastname,
        points: this.userToEdit.points ?? 0,
        role: this.userToEdit.role,
        active: this.userToEdit.active ?? true,
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      const id = this.userToEdit ? this.userToEdit.id : new UserId(uuidv4());

      const newUser = new User(
        id,
        formValue.name,
        formValue.lastname,
        formValue.points,
        formValue.active,
        formValue.role
      );
      newUser.active = formValue.active;

      this.save.emit(newUser);
      this.userForm.reset({ points: 0, role: 'cashier', active: true });
    }
  }
}
