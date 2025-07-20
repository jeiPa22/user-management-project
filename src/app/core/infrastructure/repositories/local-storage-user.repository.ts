import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../domain/user/entities/user.entity';
import { IUserRepository } from '../../domain/user/repositories/user.repository';
import { UserMapper } from '../../shared/mappers/user.mapper';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageUserRepository implements IUserRepository {
  private storageKey = 'users';

  create(user: User): Observable<User> {
    const users = this.getStoredUsers();
    users.push(user);
    this.setStoredUsers(users);
    return of(user);
  }

  getAll(): Observable<User[]> {
    return of(this.getStoredUsers());
  }

  update(user: User): Observable<User> {
    const users = this.getStoredUsers().map((u) =>
      u.id.getValue() === user.id.getValue() ? user : u
    );
    this.setStoredUsers(users);
    return of(user);
  }

  delete(id: string): Observable<boolean> {
    const users = this.getStoredUsers().filter((u) => u.id.getValue() !== id);
    this.setStoredUsers(users);
    return of(true);
  }

  private getStoredUsers(): User[] {
    const data = localStorage.getItem(this.storageKey);
    const raw = data ? JSON.parse(data) : [];
    return raw.map((dto: any) => UserMapper.toDomain(dto));
  }

  private setStoredUsers(users: User[]): void {
    const dtos = users.map((user) => UserMapper.toDto(user));
    localStorage.setItem(this.storageKey, JSON.stringify(dtos));
  }
}
