import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardModule } from './dashboard/dashboard.module';
import { SettingsModule } from './settings/settings.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { UserService, JwtService } from './services';

const appRoutes: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    appRoutes,
    DashboardModule,
    SettingsModule,
    AuthModule
  ],
  providers: [
    UserService,
    JwtService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
