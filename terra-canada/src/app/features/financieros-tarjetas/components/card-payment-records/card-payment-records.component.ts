import { Component, OnInit, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { PagoService, Pago } from '../../../../core/services/pago.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { AuthService } from '../../../../core/services/auth.service';
import { PaginatedTableComponent, TableColumn, RowAction, ActionEvent } from '../../../../shared/components/paginated-table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-card-payment-records',
  standalone: true,
  imports: [CommonModule, TranslatePipe, PaginatedTableComponent],
  templateUrl: './card-payment-records.component.html',
  styleUrl: './card-payment-records.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardPaymentRecordsComponent implements OnInit, OnDestroy {
  pagos: any[] = [];
  isLoading = false;
  errorMessage = '';

  // Configuración de tabla genérica
  columns: TableColumn[] = [
    {
      key: 'fecha_creacion',
      label: 'Fecha',
      type: 'date',
      width: '100px'
    },
    {
      key: 'cliente.nombre',
      label: 'Cliente',
      type: 'text',
      width: '150px',
      formatter: (value, row) => row.cliente?.nombre || 'N/A'
    },
    {
      key: 'proveedor.nombre',
      label: 'Proveedor',
      type: 'text',
      width: '150px',
      formatter: (value, row) => row.proveedor?.nombre || 'N/A'
    },
    {
      key: 'monto',
      label: 'Monto',
      type: 'currency',
      width: '100px'
    },
    {
      key: 'numero_presta',
      label: 'N° Presta',
      type: 'text',
      width: '120px'
    },
    {
      key: 'tarjeta.numero_enmascarado',
      label: 'Tarjeta',
      type: 'text',
      width: '130px',
      formatter: (value, row) => row.tarjeta?.numero_enmascarado || 'N/A'
    },
    {
      key: 'estado',
      label: 'Estado',
      type: 'badge',
      width: '100px',
      badgeClass: (value) => this.getStatusClass(value)
    },
    {
      key: 'esta_verificado',
      label: 'Verificación',
      type: 'badge',
      width: '100px',
      formatter: (value) => value ? 'Sí' : 'No',
      badgeClass: (value) => this.getVerificationClass(value)
    },
    {
      key: 'enviado_correo',
      label: 'Correo',
      type: 'custom',
      width: '90px'
    },
    {
      key: 'registrado_por.nombre_completo',
      label: 'Registrado por',
      type: 'text',
      width: '150px',
      formatter: (value, row) => row.registrado_por?.nombre_completo || 'N/A'
    }
  ];

  actions: RowAction[] = [
    {
      id: 'view',
      label: 'Ver',
      icon: 'pi pi-eye',
      class: 'view-btn'
    },
    {
      id: 'edit',
      label: 'Editar',
      icon: 'pi pi-pencil',
      class: 'edit-btn'
    },
    {
      id: 'delete',
      label: 'Eliminar',
      icon: 'pi pi-trash',
      class: 'delete-btn'
    }
  ];

  private destroy$ = new Subject<void>();

  @Output() onEdit = new EventEmitter<any>();
  @Output() onView = new EventEmitter<any>();

  constructor(
    private pagoService: PagoService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.setupPagosSubscription();
    this.pagoService.cargarPagos();
  }

  private setupPagosSubscription(): void {
    console.log('CardPaymentRecordsComponent - Configurando suscripción a pagos');
    this.pagoService.pagos$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (pagos: any[]) => {
          console.log('CardPaymentRecordsComponent - Pagos recibidos:', pagos);
          this.pagos = pagos;
          this.isLoading = false;
          this.cdr.markForCheck();
        },
        (error: any) => {
          console.error('Error cargando pagos:', error);
          this.errorMessage = 'Error al cargar los pagos';
          this.isLoading = false;
          this.cdr.markForCheck();
        }
      );
  }

  /**
   * Maneja eventos de acciones de la tabla genérica
   */
  onTableAction(event: ActionEvent): void {
    console.log('CardPaymentRecordsComponent - Acción:', event.action, 'Pago:', event.row);
    
    switch (event.action) {
      case 'view':
        this.onViewPago(event.row);
        break;
      case 'edit':
        this.onEditPago(event.row);
        break;
      case 'delete':
        this.onDeletePago(event.row);
        break;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onViewPago(pago: any): void {
    console.log('CardPaymentRecordsComponent - Ver pago:', pago);
    this.onView.emit(pago);
  }

  onEditPago(pago: any): void {
    console.log('CardPaymentRecordsComponent - Editar pago:', pago);
    this.onEdit.emit(pago);
  }

  onDeletePago(pago: any): void {
    if (confirm('¿Estás seguro de que deseas eliminar este pago?')) {
      console.log('CardPaymentRecordsComponent - Eliminar pago:', pago);
      this.pagoService.delete(pago.id || 0).subscribe({
        next: (response) => {
          console.log('Pago eliminado exitosamente:', response);
          this.notificationService.success('✅ Pago eliminado exitosamente');
          setTimeout(() => {
            this.pagoService.recargarPagos();
          }, 500);
        },
        error: (error) => {
          console.error('Error eliminando pago:', error);
          this.notificationService.error(`❌ Error al eliminar pago: ${error.error?.error?.message || error.message || 'Error desconocido'}`);
        }
      });
    }
  }

  getStatusClass(status: string): string {
    switch (status?.toUpperCase()) {
      case 'PAGADO':
        return 'status-aprobado';
      case 'A PAGAR':
        return 'status-pendiente';
      default:
        return 'status-pendiente';
    }
  }

  getVerificationClass(verified: boolean): string {
    return verified ? 'verified' : 'not-verified';
  }
}
