import { User } from '../../domain/entities/user.entity';
import { UserRole } from '../../domain/enums/role.enum';
import { UserId } from '../../domain/value-objects/user-id.vo';
import { IUserDto } from '../dtos/user.dto';

/**
 * Mapper para convertir entre DTOs de usuario y entidades de dominio.
 */
export class UserMapper {
  /**
   * Convierte un DTO de usuario a una entidad de dominio.
   * @param dto -> DTO de usuario a convertir.
   * @returns -> Entidad de usuario.
   */
  static toDomain(dto: IUserDto): User {
    return new User(
      new UserId(dto.id),
      dto.name,
      dto.lastname,
      dto.points,
      dto.active,
      dto.role
    );
  }

  /**
   * Convierte una entidad de usuario a un DTO.
   * @param user -> Entidad de usuario a convertir.
   * @returns -> DTO de usuario.
   */
  static toDto(user: User): IUserDto {
    return {
      id: user.id.getValue(),
      name: user.name,
      lastname: user.lastname,
      points: user.points,
      active: user.active,
      role: user.role,
    };
  }
}
