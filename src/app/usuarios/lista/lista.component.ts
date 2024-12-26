import { Component, inject, OnInit, signal } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/users-response.interface';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: ``,
})
export class ListaComponent implements OnInit {
  private usuarioAervice = inject(UsuarioService);

  usuarios = signal<Usuario[]>([]);

  ngOnInit(): void {
    this.usuarioAervice
      .getUsers()
      .subscribe((users) => this.usuarios.set(users));
  }
}
