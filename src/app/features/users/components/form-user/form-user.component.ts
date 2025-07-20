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
import { UserRole } from '../../../../core/shared/constants/role.enum';

/**
 * Componente de formulario de usuario que permite crear o editar usuarios.
 */
@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.scss',
})
export class FormUserComponent {
  /**
   * Usuario a editar, si se proporciona.
   */
  @Input() userToEdit?: User;
  /**
   * Evento que se emite al guardar un usuario.
   */
  @Output() save = new EventEmitter<User>();

  /**
   * Formulario reactivo para manejar los datos del usuario.
   */
  userForm: FormGroup;

  /**
   * Roles.
   */
  roles = Object.values(UserRole);

  /**
   * Constructor del componente de formulario de usuario.
   * @param fb -> FormBuilder para crear formularios reactivos.
   */
  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      points: [0, [Validators.required, Validators.min(0)]],
      role: ['cashier', Validators.required],
      active: [true],
    });
  }

  /**
   * Detecta cambios en las propiedades de entrada del componente.
   * @param changes -> Cambios en las propiedades de entrada.
   */
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

  /**
   * Maneja el evento de envío del formulario.
   */
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
