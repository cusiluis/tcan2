import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { DashboardService } from '../../../core/services/dashboard.service';
import { AuthService } from '../../../core/services/auth.service';
import { MenuItem } from '../../models/dashboard.model';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslationKey } from '../../models/translations.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class SidebarComponent implements OnInit {
  menuItems: MenuItem[] = [];
  activeRoute: string = '/dashboard';
  userInitials: string = 'AD';
  userName: string = 'Administrador';

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.dashboardService.getMenuItems().subscribe((items) => {
      // Filtrar items según acceso del usuario
      this.menuItems = items.filter(item => this.canAccessModule(item.route));
    });
    this.activeRoute = this.router.url;
    
    // Actualizar información del usuario
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.userName = currentUser.nombre_completo || currentUser.username;
      this.userInitials = this.extractInitials(this.userName);
    }
  }

  navigateTo(route: string): void {
    this.activeRoute = route;
    this.router.navigate([route]);
  }

  isActive(route: string): boolean {
    return this.activeRoute === route;
  }

  getMenuLabel(item: MenuItem): TranslationKey {
    return (item.translationKey as TranslationKey) || (item.label as TranslationKey);
  }

  /**
   * Verificar si el usuario tiene acceso al módulo
   */
  canAccessModule(route: string): boolean {
    // Extraer nombre del módulo de la ruta
    const moduleName = route.replace(/^\//, '').split('/')[0];
    return this.authService.hasModuleAccess(moduleName);
  }

  /**
   * Extraer iniciales del nombre del usuario
   */
  private extractInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  }
}
