import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService, Theme } from '../../../core/services/theme.service';
import { TranslationService, Language } from '../../../core/services/translation.service';
import { TranslationKey } from '../../models/translations.model';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-top-header',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './top-header.html',
  styleUrl: './top-header.scss',
})
export class TopHeaderComponent implements OnInit, OnDestroy {
  theme: Theme = 'light';
  language: Language = 'es';
  isFullscreen: boolean = false;
  showNotifications: boolean = false;
  showLanguageMenu: boolean = false;
  searchQuery: string = '';
  private subscriptions: Subscription[] = [];

  notifications = [
    { id: 1, message: 'Nuevo pago registrado', time: 'hace 5 min' },
    { id: 2, message: 'Tarjeta activada', time: 'hace 15 min' },
    { id: 3, message: 'Documento procesado', time: 'hace 1 hora' }
  ];

  constructor(
    private themeService: ThemeService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.themeService.theme$.subscribe((theme) => {
        this.theme = theme;
      })
    );

    this.subscriptions.push(
      this.translationService.currentLanguage$.subscribe((language) => {
        this.language = language;
      })
    );

    this.subscriptions.push(
      this.themeService.isFullscreen$.subscribe((isFullscreen) => {
        this.isFullscreen = isFullscreen;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleFullscreen(): void {
    this.themeService.toggleFullscreen();
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    this.showLanguageMenu = false;
  }

  toggleLanguageMenu(): void {
    this.showLanguageMenu = !this.showLanguageMenu;
    this.showNotifications = false;
  }

  selectLanguage(lang: Language): void {
    this.translationService.setLanguage(lang);
    this.showLanguageMenu = false;
  }

  getTranslation(key: TranslationKey): string {
    return this.translationService.translate(key);
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    // Implementar búsqueda global aquí
    console.log('Searching for:', query);
  }

  closeMenus(): void {
    this.showNotifications = false;
    this.showLanguageMenu = false;
  }
}
