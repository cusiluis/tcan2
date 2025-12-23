import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar';
import { TopHeaderComponent } from '../../shared/components/top-header/top-header';
import { ConfiguracionPerfilComponent } from './components/configuracion-perfil/configuracion-perfil.component';
import { ConfiguracionNotificacionesComponent } from './components/configuracion-notificaciones/configuracion-notificaciones.component';
import { ConfiguracionSeguridadComponent } from './components/configuracion-seguridad/configuracion-seguridad.component';
import { ConfiguracionUsuariosComponent } from './components/configuracion-usuarios/configuracion-usuarios.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { AuthService } from '../../core/services/auth.service';
import { NotificationComponent, Notification } from '../../shared/components/notification/notification.component';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent,
    TopHeaderComponent,
    ConfiguracionPerfilComponent,
    ConfiguracionNotificacionesComponent,
    ConfiguracionSeguridadComponent,
    ConfiguracionUsuariosComponent,
    TranslatePipe,
    NotificationComponent
  ],
  templateUrl: './configuracion.html',
  styleUrl: './configuracion.scss'
})
export class ConfiguracionComponent implements OnInit {
  activeTab: string = 'perfil';

  tabs: { id: string; label: string; icon: string; description: string }[] = [];

  notifications: Notification[] = [];

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    const rol = user?.rol_nombre?.toLowerCase();

    if (rol === 'administrador') {
      this.tabs = [
        {
          id: 'perfil',
          label: 'Perfil de Usuario',
          icon: 'pi-user',
          description: 'Información personal y datos de contacto'
        },
        {
          id: 'usuarios',
          label: 'Gestión de Usuarios',
          icon: 'pi-users',
          description: 'Administración de usuarios del sistema'
        },
        {
          id: 'seguridad',
          label: 'Seguridad',
          icon: 'pi-lock',
          description: 'Contraseña y seguridad de cuenta'
        },
        {
          id: 'notificaciones',
          label: 'Notificaciones',
          icon: 'pi-bell',
          description: 'Preferencias de notificaciones'
        }
      ];
    } else {
      this.tabs = [
        {
          id: 'perfil',
          label: 'Perfil de Usuario',
          icon: 'pi-user',
          description: 'Información personal y datos de contacto'
        },
        {
          id: 'seguridad',
          label: 'Seguridad',
          icon: 'pi-lock',
          description: 'Contraseña y seguridad de cuenta'
        }
      ];
    }

    if (!this.tabs.find(t => t.id === this.activeTab) && this.tabs.length > 0) {
      this.activeTab = this.tabs[0].id;
    }

    // Suscribirse a notificaciones para mostrar toasts en el módulo de Configuración
    this.notificationService.notifications$.subscribe((notifications: Notification[]) => {
      this.notifications = notifications;
    });
  }

  selectTab(tabId: string): void {
    this.activeTab = tabId;
  }

  getActiveTabLabel(): string {
    const tab = this.tabs.find(t => t.id === this.activeTab);
    return tab ? tab.label : '';
  }

  getActiveTabDescription(): string {
    const tab = this.tabs.find(t => t.id === this.activeTab);
    return tab ? tab.description : '';
  }

  onNotificationDismissed(id: string): void {
    this.notificationService.dismiss(id);
  }
}
