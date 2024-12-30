import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';

import * as usuarioActions from '../actions';
import { UsuarioService } from '../../services/usuario.service';

@Injectable()
export class UsuarioEffects {
  private actions$ = inject(Actions);
  private usuarioService = inject(UsuarioService);

  cargarUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuarioActions.cargarUsuario),
      exhaustMap((action) =>
        this.usuarioService.getUserById(action.id).pipe(
          map((usuario) => usuarioActions.cargarUsuarioSuccess({ usuario })),
          catchError((err) =>
            of(usuarioActions.cargarUsuarioError({ payload: err }))
          )
        )
      )
    )
  );
}
