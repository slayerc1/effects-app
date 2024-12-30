import { createReducer, on } from '@ngrx/store';
import {
  cargarUsuario,
  cargarUsuarioError,
  cargarUsuarioSuccess,
} from './../actions';
import { Usuario } from '../../interfaces/users-response.interface';

export interface UsuarioState {
  id: string | null;
  user: Usuario | null;
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const usuarioInitialState: UsuarioState = {
  id: null,
  user: null,
  loaded: false,
  loading: false,
  error: null,
};

export const usuarioReducer = createReducer(
  usuarioInitialState,

  on(cargarUsuario, (state, { id }) => ({ ...state, loading: true, id: id })),
  on(cargarUsuarioSuccess, (state, { usuario }) => ({
    ...state,
    loading: false,
    loaded: true,
    user: { ...usuario },
  })),
  on(cargarUsuarioError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message,
    },
  }))
);
