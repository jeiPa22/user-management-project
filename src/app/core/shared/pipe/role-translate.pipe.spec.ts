import { RoleTranslatePipe } from './role-translate.pipe';
import { UserRole } from '../constants/role.enum';

describe('RoleTranslatePipe', () => {
  let pipe: RoleTranslatePipe;

  beforeEach(() => {
    pipe = new RoleTranslatePipe();
  });

  it('debería retornar "Administrador" para UserRole.Admin', () => {
    const result = pipe.transform(UserRole.Admin);
    expect(result).toBe('Administrador');
  });

  it('debería retornar "Cajero" para UserRole.Cashier', () => {
    const result = pipe.transform(UserRole.Cashier);
    expect(result).toBe('Cajero');
  });

  it('debería retornar el valor original si el rol no es reconocido', () => {
    const result = pipe.transform('UNKNOWN_ROLE' as UserRole);
    expect(result).toBe('UNKNOWN_ROLE');
  });
});
