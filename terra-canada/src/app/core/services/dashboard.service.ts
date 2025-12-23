import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DashboardData, StatCard, Activity, MenuItem } from '../../shared/models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dashboardDataSubject = new BehaviorSubject<DashboardData | null>(null);
  public dashboardData$ = this.dashboardDataSubject.asObservable();

  private menuItemsSubject = new BehaviorSubject<MenuItem[]>([]);
  public menuItems$ = this.menuItemsSubject.asObservable();

  constructor() {
    this.initializeMenuItems();
    this.loadDashboardData();
  }

  private initializeMenuItems(): void {
    const menuItems: MenuItem[] = [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: 'pi pi-home',
        route: '/dashboard',
        translationKey: 'menuDashboard'
      },
      {
        id: 'equipos',
        label: 'Equipo - Tarjetas',
        icon: 'pi pi-users',
        route: '/equipo-tarjetas',
        badge: 1,
        translationKey: 'menuEquipoTarjetas'
      },
      {
        id: 'financieros-bancaria',
        label: 'Financieros - C. Bancaria',
        icon: 'pi pi-wallet',
        route: '/financieros',
        translationKey: 'menuFinancierosCuenta'
      },
      {
        id: 'financieros-tarjetas',
        label: 'Financieros - Tarjetas',
        icon: 'pi pi-money-bill',
        route: '/financieros-tarjetas',
        translationKey: 'menuFinancierosTarjetas'
      },
      {
        id: 'analisis',
        label: 'Análisis',
        icon: 'pi pi-chart-bar',
        route: '/analisis',
        translationKey: 'menuAnalisis'
      },
      {
        id: 'gmail-gen',
        label: 'Gmail-GEN',
        icon: 'pi pi-envelope',
        route: '/gmail-gen',
        translationKey: 'menuGmailGen'
      },
      {
        id: 'eventos',
        label: 'Eventos',
        icon: 'pi pi-calendar',
        route: '/eventos',
        translationKey: 'menuEventos'
      },
      {
        id: 'documentos',
        label: 'Documentos',
        icon: 'pi pi-file',
        route: '/documentos',
        translationKey: 'menuDocumentos'
      },
      {
        id: 'tarjetas',
        label: 'Tarjetas',
        icon: 'pi pi-credit-card',
        route: '/tarjetas',
        translationKey: 'menuTarjetas'
      },
      {
        id: 'configuracion',
        label: 'Configuración',
        icon: 'pi pi-cog',
        route: '/configuracion',
        translationKey: 'menuConfiguracion'
      }
    ];
    this.menuItemsSubject.next(menuItems);
  }

  private loadDashboardData(): void {
    const mockData: DashboardData = {
      stats: [
        {
          id: 'usuarios',
          title: 'Usuarios',
          value: 594550,
          icon: 'pi pi-users',
          color: '#2d7a7a',
          trend: 12.5,
          trendDirection: 'up'
        },
        {
          id: 'pagos-pendientes',
          title: 'Pagos Pendientes',
          value: 7,
          icon: 'pi pi-exclamation-circle',
          color: '#2d7a7a',
          trend: -3.2,
          trendDirection: 'down'
        },
        {
          id: 'tarjetas',
          title: 'Tarjetas',
          value: 'Habilitadas con éxito',
          icon: 'pi pi-credit',
          color: '#2d7a7a',
          trend: 8.7,
          trendDirection: 'up'
        },
        {
          id: 'eficiencia',
          title: 'Eficiencia',
          value: 89,
          icon: 'pi pi-chart-line',
          color: '#2d7a7a',
          trend: 11.5,
          trendDirection: 'up',
          unit: '%'
        }
      ],
      activities: [
        {
          id: '1',
          date: '2024-01-15',
          time: '14:30',
          user: 'Louise',
          action: 'Pago registrado - Hilton Hotels',
          amount: 250,
          currency: 'CAD',
          status: 'pagado'
        },
        {
          id: '2',
          date: '2024-01-15',
          time: '13:45',
          user: 'M',
          action: 'Pago pendiente - Air Canada',
          amount: 450,
          currency: 'CAD',
          status: 'pendiente'
        },
        {
          id: '3',
          date: '2024-01-15',
          time: '12:20',
          user: 'Louise',
          action: 'Documento procesado',
          status: 'completado'
        }
      ]
    };
    this.dashboardDataSubject.next(mockData);
  }

  getDashboardData(): Observable<DashboardData | null> {
    return this.dashboardData$;
  }

  getMenuItems(): Observable<MenuItem[]> {
    return this.menuItems$;
  }
}
