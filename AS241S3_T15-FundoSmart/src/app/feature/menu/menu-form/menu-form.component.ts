import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NewsService, Article } from '../../../services/news.service';
import { NavbarComponent } from "../../../layout/navbar/navbar.component";

@Component({
  selector: 'app-menu-form',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    NavbarComponent
],
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss']
})
export class MenuFormComponent implements OnInit {
  articles: Article[] = [];
  thematicArticles: Article[] = [];
  marketArticles: Article[] = [];
  loading = true;

  time = '--:--';
  weather = 'Cargando clima…';
  phase: 'dawn'|'day'|'dusk'|'night' = 'day';

  private apiKey = 'TU_API_KEY_OPENWEATHER';
  private defaultCityId = '3936456'; // Lima, PE

  constructor(
    private newsService: NewsService,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    // — Noticias —
    this.newsService.getPeruNews()
      .subscribe({ next: data => { this.articles = data; this.loading = false; }, error: () => this.loading = false });
    this.newsService.getThematicPeruNews()
      .subscribe({ next: data => this.thematicArticles = data });
    this.newsService.getMarketNews()
      .subscribe({ next: data => this.marketArticles = data });

    // — Widget clima/reloj sólo en browser —
    if (isPlatformBrowser(this.platformId)) {
      this.updateTime();
      this.updateWeather();
      this.animateClouds();

      setInterval(() => this.updateTime(), 1_000);
      setInterval(() => this.updateWeather(), 600_000);
    }
  }

  @HostListener('window:focus')
  onFocus() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.animateClouds();
    this.updateTime();
  }

  @HostListener('window:visibilitychange')
  onVisibilityChange() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (document.visibilityState === 'visible') {
      this.animateClouds();
      this.updateTime();
    }
  }

  private updatePhase() {
    const now = new Date();
    const mins = now.getHours()*60 + now.getMinutes();
    if (mins >= 5*60 && mins <= 5*60+29)         this.phase = 'dawn';
    else if (mins >= 5*60+30 && mins <= 17*60+44) this.phase = 'day';
    else if (mins >= 17*60+45 && mins <= 18*60+29) this.phase = 'dusk';
    else this.phase = 'night';
  }

  updateTime() {
    const now = new Date();
    this.time = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    this.updatePhase();
  }

  updateWeather() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => this.fetchWeather(`lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`),
        ()  => this.fetchWeather(`id=${this.defaultCityId}`)
      );
    } else {
      this.fetchWeather(`id=${this.defaultCityId}`);
    }
  }

  private fetchWeather(query: string) {
    const url = `https://api.openweathermap.org/data/2.5/weather?${query}&units=metric&lang=es&appid=${this.apiKey}`;
    this.http.get<any>(url).subscribe({
      next: data => this.weather = `${Math.round(data.main.temp)} °C · ${data.weather[0].description}`,
      error: ()   => this.weather = 'No disponible'
    });
  }

  animateClouds() {
    if (!isPlatformBrowser(this.platformId)) return;
    const clouds = document.getElementById('clouds');
    if (!clouds) return;
    clouds.classList.remove('animate-clouds');
    void clouds.offsetWidth; // reflow para reiniciar la animación
    clouds.classList.add('animate-clouds');
  }
}
