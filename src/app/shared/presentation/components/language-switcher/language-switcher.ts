import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Subject, takeUntil, firstValueFrom } from 'rxjs';

// PrimeNG Components
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

export type SupportedLanguage = 'es' | 'en';

/**
 * Component for switching between supported languages in the application.
 */
@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ButtonModule,
    TooltipModule
  ],
  templateUrl: './language-switcher.html',
  styleUrls: ['./language-switcher.css']
})
export class LanguageSwitcher implements OnInit, OnDestroy {

  /**
   * Subject for managing component destruction and unsubscriptions.
   */
  private destroy$ = new Subject<void>();

  /**
   * The TranslateService instance.
   */
  private translate = inject(TranslateService);

  /**
   * The HttpClient instance.
   */
  private http = inject(HttpClient);

  /**
   * The current selected language.
   */
  protected currentLang: SupportedLanguage = 'es';

  /**
   * The storage key for persisting language preference.
   */
  private readonly STORAGE_KEY = 'glassgo-language';

  constructor() {
    this.initializeLanguage();
  }

  ngOnInit(): void {
    // Subscribe to language changes
    this.translate.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        this.currentLang = event.lang as SupportedLanguage;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Initialize language system
   */
  private async initializeLanguage(): Promise<void> {
    // Load translations from JSON files
    await this.loadTranslations();

    // Get stored language or default
    const storedLanguage = this.getStoredLanguage();
    const languageToUse = storedLanguage || 'es';

    // Set initial language
    this.setLanguage(languageToUse);
  }

  /**
   * Load translations from public/i18n JSON files
   */
  private async loadTranslations(): Promise<void> {
    try {
      // Load Spanish translations
      const esTranslations = await firstValueFrom(
        this.http.get('./i18n/es.json')
      );

      // Load English translations
      const enTranslations = await firstValueFrom(
        this.http.get('./i18n/en.json')
      );

      // Set translations in TranslateService
      this.translate.setTranslation('es', esTranslations as any);
      this.translate.setTranslation('en', enTranslations as any);

      console.log('Translations loaded from public/i18n/');
    } catch (error) {
      console.error('Error loading translations:', error);
    }
  }

  /**
   * Get stored language from localStorage
   */
  private getStoredLanguage(): SupportedLanguage | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY) as SupportedLanguage;
      return (stored === 'es' || stored === 'en') ? stored : null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Store language in localStorage
   */
  private storeLanguage(language: SupportedLanguage): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, language);
    } catch (error) {
      console.warn('Failed to store language:', error);
    }
  }

  /**
   * Set application language
   */
  private setLanguage(language: SupportedLanguage): void {
    this.translate.setDefaultLang(language);
    this.translate.use(language);
    this.storeLanguage(language);
    this.currentLang = language;
  }

  /**
   * Toggles between Spanish and English
   */
  toggleLanguage(): void {
    // Add switching animation class
    const switchElement = document.querySelector('.language-switch') as HTMLElement;
    if (switchElement) {
      switchElement.classList.add('switching');
      setTimeout(() => switchElement.classList.remove('switching'), 300);
    }

    // Toggle language
    const newLanguage: SupportedLanguage = this.currentLang === 'es' ? 'en' : 'es';
    this.setLanguage(newLanguage);
  }

  /**
   * Gets tooltip text
   */

  getTooltipText(): string {
    return this.currentLang === 'es'
      ? 'Cambiar a English'
      : 'Switch to Español';
  }


}
