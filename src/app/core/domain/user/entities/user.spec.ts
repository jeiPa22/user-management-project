import { User } from './user.entity';
import { UserId } from '../value-objects/user-id.vo';
import { UserRole } from '../../../shared/constants/role.enum';

describe('User', () => {
  const id = new UserId('abc123');
  const name = 'Juan';
  const lastname = 'Pérez';
  const points = 100;
  const active = true;
  const role = UserRole.Admin;

  let user: User;

  beforeEach(() => {
    user = new User(id, name, lastname, points, active, role);
  });

  it('debería crear una instancia de User correctamente', () => {
    expect(user.id).toBe(id);
    expect(user.name).toBe(name);
    expect(user.lastname).toBe(lastname);
    expect(user.points).toBe(points);
    expect(user.active).toBe(active);
    expect(user.role).toBe(role);
  });

  it('toggleActive debería invertir el estado activo', () => {
    user.toggleActive();
    expect(user.active).toBe(!active);

    user.toggleActive();
    expect(user.active).toBe(active);
  });

  it('updateName debería actualizar nombres y apellidos', () => {
    const newName = 'Carlos';
    const newLastname = 'Gómez';

    user.updateName(newName, newLastname);

    expect(user.name).toBe(newName);
    expect(user.lastname).toBe(newLastname);
  });

  it('toPrimitives debería retornar objeto primitivo correcto', () => {
    const primitives = user.toPrimitives();

    expect(primitives).toEqual({
      id: id.getValue(),
      nombres: name,
      apellidos: lastname,
      puntos: points,
      activo: active,
      role: role,
    });
  });

  it('fromPrimitives debería crear instancia User desde objeto primitivo', () => {
    const data = {
      id: 'abc123',
      nombres: 'Laura',
      apellidos: 'Martínez',
      puntos: 55,
      activo: false,
      role: UserRole.Cashier,
    };

    const userFromPrimitives = User.fromPrimitives(data);

    expect(userFromPrimitives).toBeInstanceOf(User);
    expect(userFromPrimitives.id.getValue()).toBe(data.id);
    expect(userFromPrimitives.name).toBe(data.nombres);
    expect(userFromPrimitives.lastname).toBe(data.apellidos);
    expect(userFromPrimitives.points).toBe(data.puntos);
    expect(userFromPrimitives.active).toBe(data.activo);
    expect(userFromPrimitives.role).toBe(data.role);
  });
});
