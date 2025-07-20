import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableUserComponent } from './table-user.component';
import { User } from '../../../../core/domain/user/entities/user.entity';
import { UserId } from '../../../../core/domain/user/value-objects/user-id.vo';
import { UserRole } from '../../../../core/shared/constants/role.enum';

describe('TableUserComponent', () => {
  let component: TableUserComponent;
  let fixture: ComponentFixture<TableUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableUserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería emitir evento de edición de usuario', () => {
    const usuario = new User(
      new UserId('1'),
      'Juan',
      'Pérez',
      10,
      true,
      UserRole.Admin
    );
    const spyEditar = spyOn(component.edit, 'emit');

    component.edit.emit(usuario);

    expect(spyEditar).toHaveBeenCalledWith(usuario);
  });

  it('debería emitir evento de eliminación de usuario', () => {
    const usuario = new User(
      new UserId('2'),
      'Ana',
      'López',
      15,
      true,
      UserRole.Cashier
    );
    const spyEliminar = spyOn(component.remove, 'emit');

    component.remove.emit(usuario);

    expect(spyEliminar).toHaveBeenCalledWith(usuario);
  });
});
