import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

/*mis credenciales de firebase*/
const firebaseConfig = {
  apiKey: 'AIzaSyApDiFSDSWtioCdqVz7q4hIS3OaJqDWowY',
  authDomain: 'pandora-f39a3.firebaseapp.com',
  projectId: 'pandora-f39a3',
  storageBucket: 'pandora-f39a3.firebasestorage.app',
  messagingSenderId: '1058780413431',
  appId: '1:1058780413431:web:ced05a67199205214c42f2',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
  ],
};
