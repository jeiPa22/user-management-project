import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../domain/user/entities/user.entity';
import { IUserRepository } from '../../domain/user/repositories/user.repository';
import { UserMapper } from '../../shared/mappers/user.mapper';

/**
 * Repositorio de usuarios que utiliza LocalStorage para almacenar los datos
 */
@Injectable({
  providedIn: 'root',
})
export class LocalStorageUserRepository implements IUserRepository {
  /**
   * Clave de almacenamiento en LocalStorage para los usuarios
   */
  private storageKey = 'users';

  /**
   * crea un nuevo usuario y lo almacena en LocalStorage
   * @param user -> Usuario a crear
   * @returns -> Observable del usuario creado
   */
  create(user: User): Observable<User> {
    const users = this.getStoredUsers();
    users.push(user);
    this.setStoredUsers(users);
    return of(user);
  }

  /**
   * Obtiene un usuario por su ID
   * @returns -> Observable del usuario encontrado o null si no existe
   */
  getAll(): Observable<User[]> {
    return of(this.getStoredUsers());
  }

  /**
   * Actualiza un usuario existente en LocalStorage
   * @param user -> Usuario a actualizar
   * @returns -> Observable del usuario actualizado
   */
  update(user: User): Observable<User> {
    const users = this.getStoredUsers().map((u) =>
      u.id.getValue() === user.id.getValue() ? user : u
    );
    this.setStoredUsers(users);
    return of(user);
  }

  /**
   * Elimina un usuario por su ID
   * @param id -> ID del usuario a eliminar
   * @returns -> Observable de éxito o fracaso
   */
  delete(id: string): Observable<boolean> {
    const users = this.getStoredUsers().filter((u) => u.id.getValue() !== id);
    this.setStoredUsers(users);
    return of(true);
  }

  /**
   * Obtiene un usuario del localStorage.
   * @returns -> Observable del usuarios
   */
  private getStoredUsers(): User[] {
    const data = localStorage.getItem(this.storageKey);
    const raw = data ? JSON.parse(data) : [];
    return raw.map((dto: any) => UserMapper.toDomain(dto));
  }

  /**
   * envia los usuarios al localStorage.
   * @param users -> Lista de usuarios a almacenar
   */
  private setStoredUsers(users: User[]): void {
    const dtos = users.map((user) => UserMapper.toDto(user));
    localStorage.setItem(this.storageKey, JSON.stringify(dtos));
  }
}
