import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormUserComponent } from './form-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../../core/domain/user/entities/user.entity';
import { UserId } from '../../../../core/domain/user/value-objects/user-id.vo';
import { UserRole } from '../../../../core/shared/constants/role.enum';

describe('FormUserComponent', () => {
  let component: FormUserComponent;
  let fixture: ComponentFixture<FormUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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

  it('debería inicializar el formulario con valores por defecto', () => {
    expect(component.userForm.value).toEqual({
      name: '',
      lastname: '',
      points: 0,
      role: UserRole.Cashier,
      active: true,
    });
    expect(component.userForm.valid).toBeFalse();
  });

  it('no debería parchear el formulario si no hay cambios en userToEdit', () => {
    component.userForm.patchValue({ name: 'X', lastname: 'Y' });
    component.ngOnChanges({} as any);
    expect(component.userForm.value.name).toBe('X');
    expect(component.userForm.value.lastname).toBe('Y');
  });

  it('no debería parchear el formulario si cambia userToEdit a undefined', () => {
    component.userToEdit = undefined;
    component.userForm.patchValue({ name: 'Initial', lastname: 'Initial' });
    component.ngOnChanges({
      userToEdit: {
        currentValue: undefined,
        previousValue: new User(new UserId('1'), 'A', 'B', 1, true, UserRole.Cashier),
        firstChange: false,
        isFirstChange: () => false,
      },
    } as any);
    expect(component.userForm.value.name).toBe('Initial');
    expect(component.userForm.value.lastname).toBe('Initial');
  });

  it('debería parchear el formulario si existe userToEdit', () => {
    const existing = new User(
      new UserId('123'),
      'Juan',
      'Pérez',
      20,
      false,
      UserRole.Admin
    );
    component.userToEdit = existing;
    component.ngOnChanges({
      userToEdit: {
        currentValue: existing,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true,
      },
    } as any);
    expect(component.userForm.value).toEqual({
      name: 'Juan',
      lastname: 'Pérez',
      points: 20,
      role: UserRole.Admin,
      active: false,
    });
  });

  it('debería usar valores por defecto cuando userToEdit tiene points y active indefinidos', () => {
    const partial: any = {
      name: 'Default',
      lastname: 'Test',
      points: undefined,
      role: UserRole.Cashier,
      active: undefined,
    };
    component.userToEdit = partial;
    component.ngOnChanges({
      userToEdit: {
        currentValue: partial,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true,
      },
    } as any);
    expect(component.userForm.value.points).toBe(0);
    expect(component.userForm.value.active).toBeTrue();
  });

  it('debería invalidar el formulario cuando falten campos obligatorios', () => {
    component.userForm.patchValue({ name: '', lastname: '' });
    expect(component.userForm.get('name')?.hasError('required')).toBeTrue();
    expect(component.userForm.get('lastname')?.hasError('required')).toBeTrue();
    expect(component.userForm.invalid).toBeTrue();
  });

  it('debería validar el formulario cuando todos los campos sean correctos', () => {
    component.userForm.setValue({
      name: 'María',
      lastname: 'Pérez',
      points: 42,
      role: UserRole.Admin,
      active: false,
    });
    expect(component.userForm.valid).toBeTrue();
  });

  it('debería emitir evento de guardado con nuevo UserId al enviar (modo creación)', () => {
    const spyEmit = spyOn(component.save, 'emit');
    component.userForm.setValue({
      name: 'Ana',
      lastname: 'Gómez',
      points: 10,
      role: UserRole.Cashier,
      active: true,
    });

    component.onSubmit();

    expect(spyEmit).toHaveBeenCalledTimes(1);
    const emitted = spyEmit.calls.mostRecent().args[0]!;
    expect(emitted.id).toEqual(jasmine.any(UserId));
    expect(typeof emitted.id.getValue()).toBe('string');
    expect(emitted.id.getValue().length).toBeGreaterThan(0);
    expect(emitted.name).toBe('Ana');
    expect(emitted.lastname).toBe('Gómez');
    expect(emitted.points).toBe(10);
    expect(emitted.role).toBe(UserRole.Cashier);
    expect(emitted.active).toBeTrue();
  });

  it('debería emitir evento de guardado con id existente al enviar (modo edición)', () => {
    const existing = new User(
      new UserId('existing-id'),
      'Pedro',
      'López',
      5,
      true,
      UserRole.Admin
    );
    component.userToEdit = existing;
    component.ngOnChanges({
      userToEdit: {
        currentValue: existing,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true,
      },
    } as any);
    fixture.detectChanges();

    const spyEmit = spyOn(component.save, 'emit');
    component.onSubmit();

    expect(spyEmit).toHaveBeenCalledTimes(1);
    const edited = spyEmit.calls.mostRecent().args[0]!;
    expect(edited.id.getValue()).toBe('existing-id');
    expect(edited.name).toBe('Pedro');
    expect(edited.lastname).toBe('López');
    expect(edited.points).toBe(5);
    expect(edited.role).toBe(UserRole.Admin);
    expect(edited.active).toBeTrue();
  });

  it('no debería emitir evento de guardado si el formulario es inválido', () => {
    const spyEmit = spyOn(component.save, 'emit');
    component.userForm.patchValue({ name: '', lastname: '' });
    component.onSubmit();
    expect(spyEmit).not.toHaveBeenCalled();
  });

  it('debería resetear el formulario tras un guardado exitoso', () => {
    component.userForm.setValue({
      name: 'Luis',
      lastname: 'Torres',
      points: 7,
      role: UserRole.Cashier,
      active: false,
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
