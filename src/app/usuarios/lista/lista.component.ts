import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';

import { Usuario } from '../../interfaces/users-response.interface';
import { AppState } from '../../store/app.reducers';
import * as usuariosActions from '../../store/actions';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: ``,
})
export class ListaComponent implements OnInit {
  private store = inject(Store<AppState>);

  usuarios = signal<Usuario[]>([]);
  loading: boolean = false;
  error: any;

  ngOnInit(): void {
    this.store.select('usuarios').subscribe(({ users, loading, error }) => {
      this.usuarios.set(users);
      this.loading = loading;
      this.error = error;
    });
    this.store.dispatch(usuariosActions.cargarUsuarios());
  }
}
