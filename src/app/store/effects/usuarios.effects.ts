import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuarioActions from '../actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';

@Injectable()
export class UsuariosEffects {
  private actions$ = inject(Actions);
  private usuarioService = inject(UsuarioService);

  cargarUsuarios$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuarioActions.cargarUsuarios),
      exhaustMap(() =>
        this.usuarioService.getUsers().pipe(
          map((usuarios) => usuarioActions.cargarUsuariosSuccess({ usuarios })),
          catchError((err) =>
            of(usuarioActions.cargarUsuariosError({ payload: err }))
          )
        )
      )
    )
  );
}
