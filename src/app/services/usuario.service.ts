import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UsersResponse, Usuario } from '../interfaces/users-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private http = inject(HttpClient);
  private baseUrl = 'https://reqres.in/api';

  getUsers(): Observable<Usuario[]> {
    return this.http
      .get<UsersResponse>(`${this.baseUrl}/users`)
      .pipe(map((resp) => resp.data));
  }
}
