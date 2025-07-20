import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../../domain/user/entities/user.entity';
import { IUserRepository } from '../../../shared/interfaces/user-repository.interface';

/**
 * Implementación del repositorio de usuarios utilizando Local Storage.
 * Esta clase maneja las operaciones CRUD para los usuarios almacenados en el Local Storage del navegador.
 */
@Injectable({ providedIn: 'root' })
export class LocalStorageUserRepository implements IUserRepository {
  /**
   * Clave utilizada para almacenar los usuarios en Local Storage.
   */
  private readonly STORAGE_KEY = 'users';

  /*
   * Obtiene todos los usuarios almacenados en Local Storage.
   * @returns Observable que emite un array de usuarios.
   */
  getAll(): Observable<User[]> {
    const data = localStorage.getItem(this.STORAGE_KEY);
    const users = data
      ? JSON.parse(data).map((u: any) => User.fromPrimitives(u))
      : [];
    return of(users);
  }

  /**
   * crea un nuevo usuario en Local Storage.
   * @param user -> Modelo usuario a crear.
   * @returns -> Observable que emite el usuario creado.
   */
  create(user: User): Observable<User> {
    const data = localStorage.getItem(this.STORAGE_KEY);
    const users = data ? JSON.parse(data) : [];
    users.push(user.toPrimitives());
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    return of(user);
  }

  /**
   * Actualiza un usuario existente en Local Storage.
   * @param user -> Modelo usuario con los datos actualizados.
   * @returns -> Observable que emite el usuario actualizado.
   */
  update(user: User): Observable<User> {
    const data = localStorage.getItem(this.STORAGE_KEY);
    let users = data ? JSON.parse(data) : [];
    users = users.map((u: any) =>
      u.id === user.id.getValue() ? user.toPrimitives() : u
    );
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    return of(user);
  }

  /**
   * Elimina un usuario de Local Storage.
   * @param id -> Identificador del usuario a eliminar.
   * @returns -> Observable que emite booleano al completar la operación.
   */
  delete(id: string): Observable<boolean> {
    const data = localStorage.getItem(this.STORAGE_KEY);
    let users = data ? JSON.parse(data) : [];
    const initialLength = users.length;
    users = users.filter((u: any) => u.id !== id);
    const deleted = users.length < initialLength;
    if (deleted) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    }
    return of(deleted);
  }
}
