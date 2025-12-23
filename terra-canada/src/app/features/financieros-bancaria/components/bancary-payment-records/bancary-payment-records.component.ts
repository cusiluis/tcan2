import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { PaginatedTableComponent, TableColumn, RowAction, ActionEvent } from '../../../../shared/components/paginated-table';
import { PagoBancarioService, PagoBancario } from '../../../../core/services/pago-bancario.service';
import { PaymentFormComponent } from '../payment-form/payment-form.component';

export interface BancaryPaymentRecord {
  id: number;
  date: string;
  bank: string;
  accountType: string;
  reference: string;
  amount: number;
  currency: string;
  user: string;
  status: 'A PAGAR' | 'PAGADO';
  verification: boolean;
  code: string;
  enviado_correo?: boolean;
}

@Component({
  selector: 'app-bancary-payment-records',
  standalone: true,
  imports: [CommonModule, TranslatePipe, PaginatedTableComponent, PaymentFormComponent],
  templateUrl: './bancary-payment-records.component.html',
  styleUrl: './bancary-payment-records.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BancaryPaymentRecordsComponent implements OnInit {
  registros: BancaryPaymentRecord[] = [];
  showPaymentModal = false;

  // Configuración de tabla genérica
  columns: TableColumn[] = [
    {
      key: 'date',
      label: 'Fecha',
      type: 'date',
      width: '100px'
    },
    {
      key: 'bank',
      label: 'Banco',
      type: 'text',
      width: '150px'
    },
    {
      key: 'accountType',
      label: 'Tipo de Cuenta',
      type: 'text',
      width: '130px'
    },
    {
      key: 'reference',
      label: 'Referencia',
      type: 'text',
      width: '120px'
    },
    {
      key: 'amount',
      label: 'Monto',
      type: 'currency',
      width: '100px'
    },
    {
      key: 'currency',
      label: 'Moneda',
      type: 'text',
      width: '80px'
    },
    {
      key: 'status',
      label: 'Estado',
      type: 'badge',
      width: '100px',
      badgeClass: (value) => this.getStatusClass(value)
    },
    {
      key: 'verification',
      label: 'Verificación',
      type: 'badge',
      width: '100px',
      formatter: (value) => value === true ? 'Sí' : 'No',
      badgeClass: (value) => value === true ? 'verified' : 'not-verified'
    },
    {
      key: 'enviado_correo',
      label: 'Correo',
      type: 'custom',
      width: '90px'
    },
    {
      key: 'user',
      label: 'Usuario',
      type: 'text',
      width: '120px'
    },
    {
      key: 'code',
      label: 'Código',
      type: 'text',
      width: '100px'
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

  @Output() onEdit = new EventEmitter<any>();
  @Output() onView = new EventEmitter<any>();

  constructor(
    private cdr: ChangeDetectorRef,
    private pagoBancarioService: PagoBancarioService
  ) {}

  ngOnInit(): void {
    this.loadPagoBancarios();
  }

  /**
   * Cargar pagos bancarios desde el servicio
   */
  loadPagoBancarios(): void {
    this.pagoBancarioService.getAll('todos', 'todos').subscribe({
      next: (response) => {
        if (response.data && Array.isArray(response.data)) {
          this.registros = this.mapPagoBancarioToRecords(response.data);
          this.cdr.markForCheck();
        }
      },
      error: (error) => {
        console.error('Error cargando pagos bancarios:', error);
      }
    });
  }

  /**
   * Mapear datos de PagoBancario a BancaryPaymentRecord
   */
  private mapPagoBancarioToRecords(pagos: PagoBancario[]): BancaryPaymentRecord[] {
    return pagos.map((pago) => ({
      id: pago.id,
      date: new Date(pago.fecha_creacion).toISOString().split('T')[0],
      bank: pago.cuenta_bancaria?.nombre_banco || 'N/A',
      accountType: 'Cuenta Bancaria',
      reference: pago.numero_presta,
      amount: pago.monto,
      currency: 'CAD',
      user: pago.registrado_por?.nombre_completo || 'N/A',
      status: pago.estado as 'A PAGAR' | 'PAGADO',
      verification: pago.esta_verificado,
      code: pago.numero_presta,
      enviado_correo: !!pago.enviado_correo
    }));
  }

  /**
   * Maneja eventos de acciones de la tabla genérica
   */
  onTableAction(event: ActionEvent): void {
    console.log('BancaryPaymentRecordsComponent - Acción:', event.action, 'Registro:', event.row);
    
    switch (event.action) {
      case 'view':
        this.onViewRegistro(event.row);
        break;
      case 'edit':
        this.onEditRegistro(event.row);
        break;
      case 'delete':
        this.onDeleteRegistro(event.row);
        break;
    }
  }

  onViewRegistro(registro: BancaryPaymentRecord): void {
    console.log('BancaryPaymentRecordsComponent - Ver registro:', registro);
    this.onView.emit(registro);
  }

  onEditRegistro(registro: BancaryPaymentRecord): void {
    console.log('BancaryPaymentRecordsComponent - Editar registro:', registro);
    this.onEdit.emit(registro);
  }

  onDeleteRegistro(registro: BancaryPaymentRecord): void {
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      console.log('BancaryPaymentRecordsComponent - Eliminar registro:', registro);
      this.pagoBancarioService.delete(registro.id).subscribe({
        next: () => {
          this.loadPagoBancarios();
        },
        error: (error) => {
          console.error('Error eliminando registro:', error);
        }
      });
    }
  }

  /**
   * Abrir modal para nuevo pago
   */
  openNewPaymentModal(): void {
    this.showPaymentModal = true;
    this.cdr.markForCheck();
  }

  /**
   * Cerrar modal de pago
   */
  closePaymentModal(): void {
    this.showPaymentModal = false;
    this.cdr.markForCheck();
  }

  /**
   * Manejar envío del formulario de pago
   */
  onPaymentFormSubmit(event: any): void {
    console.log('Pago creado exitosamente:', event);
    this.closePaymentModal();
    this.loadPagoBancarios();
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
}
