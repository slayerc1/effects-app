import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UsersResponse, Usuario } from '../interfaces/users-response.interface';
import { UserResponse } from '../interfaces/user-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private http = inject(HttpClient);
  private baseUrl = 'https://reqres.in/api';

  getUsers(): Observable<Usuario[]> {
    return this.http
      .get<UsersResponse>(`${this.baseUrl}/users?per_page=6&delay=3`)
      .pipe(map((resp) => resp.data));
  }

  getUserById(id: string): Observable<Usuario> {
    return this.http
      .get<UserResponse>(`${this.baseUrl}/users/${id}`)
      .pipe(map((resp) => resp.data));
  }
}
