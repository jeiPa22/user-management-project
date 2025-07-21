import { TestBed } from '@angular/core/testing';
import { LocalStorageUserRepository } from './local-storage-user.repository';
import { User } from '../../domain/user/entities/user.entity';
import { UserId } from '../../domain/user/value-objects/user-id.vo';
import { UserMapper } from '../../shared/mappers/user.mapper';
import { UserRole } from '../../shared/constants/role.enum';

describe('LocalStorageUserRepository', () => {
  let repository: LocalStorageUserRepository;

  // Mock de usuarios con los nuevos campos email y password
  const mockUser1 = new User(
    new UserId('1'),
    'Juan',
    'Pérez',
    100,
    true,
    UserRole.Cashier
  );

  const mockUser2 = new User(
    new UserId('2'),
    'Ana',
    'García',
    50,
    true,
    UserRole.Admin
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageUserRepository],
    });
    repository = TestBed.inject(LocalStorageUserRepository);
    localStorage.clear(); // Limpia localStorage antes de cada prueba
  });

  it('debería ser creado', () => {
    expect(repository).toBeTruthy();
  });

  it('debería crear un usuario y almacenarlo en LocalStorage', (done) => {
    spyOn(localStorage, 'setItem').and.callThrough(); // Espía el método setItem
    repository.create(mockUser1).subscribe((user) => {
      expect(user).toEqual(mockUser1);
      const storedData = localStorage.getItem('users');
      expect(storedData).toBeDefined();

      const storedUsers = JSON.parse(storedData || '[]').map((dto: any) =>
        UserMapper.toDomain(dto)
      );

      expect(storedUsers.length).toBe(1);
      expect(storedUsers[0]).toEqual(mockUser1);
      expect(localStorage.setItem).toHaveBeenCalled();
      done();
    });
  });

  it('debería obtener todos los usuarios de LocalStorage', (done) => {
    const usersToStoreDTOs = [
      UserMapper.toDto(mockUser1),
      UserMapper.toDto(mockUser2),
    ];
    localStorage.setItem('users', JSON.stringify(usersToStoreDTOs)); // Almacena DTOs

    repository.getAll().subscribe((users) => {
      expect(users.length).toBe(2);
      expect(users).toEqual([mockUser1, mockUser2]);
      done();
    });
  });

  it('debería devolver un array vacío si no hay usuarios en LocalStorage', (done) => {
    repository.getAll().subscribe((users) => {
      expect(users.length).toBe(0);
      expect(users).toEqual([]);
      done();
    });
  });

  it('debería actualizar un usuario existente en LocalStorage', (done) => {
    const usersToStoreDTOs = [
      UserMapper.toDto(mockUser1),
      UserMapper.toDto(mockUser2),
    ];
    localStorage.setItem('users', JSON.stringify(usersToStoreDTOs));

    // Usuario actualizado con cambios en nombre, apellido, email, puntos y estado
    const updatedUser = new User(
      new UserId('1'),
      'Juan Nuevo',
      'Pérez Actualizado',
      150,
      false,
      UserRole.Admin
    );

    spyOn(localStorage, 'setItem').and.callThrough();
    repository.update(updatedUser).subscribe((user) => {
      expect(user).toEqual(updatedUser);
      const storedData = localStorage.getItem('users');
      const storedUsers = JSON.parse(storedData || '[]').map((dto: any) =>
        UserMapper.toDomain(dto)
      );

      expect(storedUsers.length).toBe(2);
      // Verifica que el usuario con ID '1' ha sido actualizado
      expect(
        storedUsers.find(
          (u: { id: { getValue: () => string } }) => u.id.getValue() === '1'
        )
      ).toEqual(updatedUser);
      // Verifica que el otro usuario no ha cambiado
      expect(
        storedUsers.find(
          (u: { id: { getValue: () => string } }) => u.id.getValue() === '2'
        )
      ).toEqual(mockUser2);
      expect(localStorage.setItem).toHaveBeenCalled();
      done();
    });
  });

  it('debería eliminar un usuario por su ID de LocalStorage', (done) => {
    const usersToStoreDTOs = [
      UserMapper.toDto(mockUser1),
      UserMapper.toDto(mockUser2),
    ];
    localStorage.setItem('users', JSON.stringify(usersToStoreDTOs));

    spyOn(localStorage, 'setItem').and.callThrough();
    repository.delete('1').subscribe((success) => {
      expect(success).toBeTrue();
      const storedData = localStorage.getItem('users');
      const storedUsers = JSON.parse(storedData || '[]').map((dto: any) =>
        UserMapper.toDomain(dto)
      );
      expect(storedUsers.length).toBe(1);
      expect(storedUsers[0]).toEqual(mockUser2); // Solo debe quedar mockUser2
      expect(localStorage.setItem).toHaveBeenCalled();
      done();
    });
  });

  it('debería manejar la eliminación de un ID que no existe', (done) => {
    const usersToStoreDTOs = [UserMapper.toDto(mockUser1)];
    localStorage.setItem('users', JSON.stringify(usersToStoreDTOs));

    spyOn(localStorage, 'setItem').and.callThrough();
    repository.delete('99').subscribe((success) => {
      expect(success).toBeTrue(); // Sigue siendo true porque la operación "finaliza"
      const storedData = localStorage.getItem('users');
      const storedUsers = JSON.parse(storedData || '[]').map((dto: any) =>
        UserMapper.toDomain(dto)
      );
      expect(storedUsers.length).toBe(1);
      expect(storedUsers[0]).toEqual(mockUser1); // El usuario original debe permanecer
      expect(localStorage.setItem).toHaveBeenCalled();
      done();
    });
  });
});
