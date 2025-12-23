import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../shared/models/auth.model';
import { UsuarioService, Usuario } from '../../../../core/services/usuario.service';

@Component({
  selector: 'app-configuracion-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './configuracion-perfil.component.html',
  styleUrl: './configuracion-perfil.component.scss'
})
export class ConfiguracionPerfilComponent implements OnInit {
  profileForm = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    username: '',
    rol: ''
  };

  isEditing: boolean = false;
  isSaving: boolean = false;

  currentUser: User | null = null;
  usuarioDetalle: Usuario | null = null;
  avatarDataUrl: string | null = null;
  isAdminUser = false;
  isEquipoUser = false;

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    // Nos suscribimos al usuario actual para cubrir tanto el caso en que
    // ya está en memoria como cuando se establece después de cargar la app.
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      this.isAdminUser = this.authService.isAdmin();
      this.isEquipoUser = this.authService.isEquipo();

      if (!user) {
        return;
      }

      const fullName = user.nombre_completo || '';
      const parts = fullName.split(' ');
      const nombre = parts.shift() || user.username;
      const apellido = parts.join(' ');

      this.profileForm.nombre = nombre;
      this.profileForm.apellido = apellido;
      this.profileForm.email = user.email;
      this.profileForm.username = user.username;
      this.profileForm.rol = user.rol_nombre;

      // Cargar datos adicionales del usuario desde el backend (teléfono, estado, etc.)
      const idNum = Number(user.id);
      if (!Number.isNaN(idNum)) {
        this.usuarioService.getUsuarioById(idNum).subscribe({
          next: (usuario) => {
            this.usuarioDetalle = usuario;
            if (usuario.telefono) {
              this.profileForm.telefono = usuario.telefono;
            }
          },
          error: (error) => {
            console.error('ConfiguracionPerfilComponent - Error cargando usuario por ID:', error);
          }
        });
      }

      // Cargar avatar asociado a este usuario
      this.loadAvatar();
    });
  }

  toggleEdit(): void {
    if (!this.isAdminUser) {
      return;
    }
    this.isEditing = !this.isEditing;
  }

  saveChanges(): void {
    this.isSaving = true;
    // Simular guardado
    setTimeout(() => {
      this.isSaving = false;
      this.isEditing = false;
      console.log('Perfil guardado:', this.profileForm);
    }, 1000);
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  private loadAvatar(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }
    if (!this.currentUser) {
      return;
    }
    const key = `profile_avatar_${this.currentUser.id}`;
    const stored = localStorage.getItem(key);
    this.avatarDataUrl = stored;
  }

  onAvatarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    if (!file.type.startsWith('image/')) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      this.avatarDataUrl = result;

      if (typeof localStorage !== 'undefined' && this.currentUser) {
        const key = `profile_avatar_${this.currentUser.id}`;
        localStorage.setItem(key, result);
      }
    };
    reader.readAsDataURL(file);
  }
}
