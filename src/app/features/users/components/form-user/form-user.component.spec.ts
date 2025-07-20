import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormUserComponent } from './form-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../../core/domain/user/entities/user.entity';
import { UserId } from '../../../../core/domain/user/value-objects/user-id.vo';
import { UserRole } from '../../../../core/shared/constants/role.enum';

describe('FormUserComponent', () => {
  let component: FormUserComponent;
  let fixture: ComponentFixture<FormUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormUserComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FormUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener el formulario inválido si está vacío', () => {
    component.userForm.setValue({
      name: '',
      lastname: '',
      points: 0,
      role: '',
      active: true,
    });
    expect(component.userForm.invalid).toBeTrue();
  });

  it('debería tener el formulario válido con valores correctos', () => {
    component.userForm.setValue({
      name: 'Juan',
      lastname: 'Pérez',
      points: 10,
      role: UserRole.Cashier,
      active: true,
    });
    expect(component.userForm.valid).toBeTrue();
  });

  it('debería emitir evento de guardado al enviar el formulario válido', () => {
    const spyEmit = spyOn(component.save, 'emit');

    component.userForm.setValue({
      name: 'Ana',
      lastname: 'Gómez',
      points: 15,
      role: UserRole.Admin,
      active: false,
    });

    component.onSubmit();

    expect(spyEmit).toHaveBeenCalled();
    const usuarioEmitido: User = spyEmit.calls.mostRecent().args[0]!;
    expect(usuarioEmitido.name).toBe('Ana');
    expect(usuarioEmitido.lastname).toBe('Gómez');
    expect(usuarioEmitido.role).toBe(UserRole.Admin);
    expect(usuarioEmitido.active).toBeFalse();
  });

  it('debería actualizar el formulario si se proporciona un usuario a editar', () => {
    const user = new User(
      new UserId('123'),
      'Pedro',
      'López',
      20,
      true,
      UserRole.Admin
    );
    component.userToEdit = user;
    component.ngOnChanges({
      userToEdit: {
        currentValue: user,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    expect(component.userForm.value).toEqual({
      name: 'Pedro',
      lastname: 'López',
      points: 20,
      role: UserRole.Admin,
      active: true,
    });
  });

  it('debería resetear el formulario luego del guardado', () => {
    component.userForm.setValue({
      name: 'Luis',
      lastname: 'Torres',
      points: 5,
      role: UserRole.Cashier,
      active: true,
    });

    component.onSubmit();

    expect(component.userForm.value).toEqual({
      name: null,
      lastname: null,
      points: 0,
      role: 'cashier',
      active: true,
    });
  });
});
