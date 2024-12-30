import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import * as usuarioActions from '../../store/actions';
import { Usuario } from '../../interfaces/users-response.interface';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: ``,
})
export class UsuarioComponent implements OnInit {
  private router = inject(ActivatedRoute);
  private store = inject(Store<AppState>);

  usuario = signal<Usuario>({} as Usuario);
  loading = signal<boolean>(false);
  error = signal<any>(null);

  ngOnInit(): void {
    this.store.select('usuario').subscribe(({ user, loading, error }) => {
      this.usuario.set(user);
      this.loading.set(loading);
      this.error.set(error);
    });

    this.router.params.subscribe(({ id }) => {
      this.store.dispatch(usuarioActions.cargarUsuario({ id }));
    });
  }
}
