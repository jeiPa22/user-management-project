import { UserMapper } from './user.mapper';
import { User } from '../../domain/user/entities/user.entity';
import { UserId } from '../../domain/user/value-objects/user-id.vo';
import { IUserDto } from '../dtos/user.dto';
import { UserRole } from '../../shared/constants/role.enum';

describe('UserMapper', () => {
  const dto: IUserDto = {
    id: '123',
    name: 'Juan',
    lastname: 'Pérez',
    points: 50,
    active: true,
    role: UserRole.Admin,
  };

  it('toDomain debería convertir un DTO a entidad User correctamente', () => {
    const user: User = UserMapper.toDomain(dto);

    expect(user).toBeInstanceOf(User);
    expect(user.id).toBeInstanceOf(UserId);
    expect(user.id.getValue()).toBe(dto.id);
    expect(user.name).toBe(dto.name);
    expect(user.lastname).toBe(dto.lastname);
    expect(user.points).toBe(dto.points);
    expect(user.active).toBe(dto.active);
    expect(user.role).toBe(dto.role);
  });

  it('toDto debería convertir una entidad User a DTO correctamente', () => {
    const user = new User(
      new UserId(dto.id),
      dto.name,
      dto.lastname,
      dto.points,
      dto.active,
      dto.role
    );

    const resultDto: IUserDto = UserMapper.toDto(user);

    expect(resultDto).toEqual(dto);
  });
});
