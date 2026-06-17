
// Importa tipos e tokens do Angular Core.
//
// ApplicationConfig:
// Tipo usado para configurar a aplicação standalone.
//
// LOCALE_ID:
// Token do Angular usado para definir idioma,
// formatação de moeda, datas e números.
import { ApplicationConfig, LOCALE_ID } from '@angular/core';


// Importa funções do Angular Router.
//
// provideRouter():
// Configura as rotas da aplicação.
//
// withComponentInputBinding():
// Permite passar parâmetros de rota
// diretamente para @Input() do componente.
import {
  provideRouter,
  withComponentInputBinding
} from '@angular/router';


// Importa configuração do Ionic para Angular standalone.
//
// provideIonicAngular():
// Inicializa o Ionic na aplicação.
import { provideIonicAngular } from '@ionic/angular/standalone';


// Importa o HttpClient do Angular.
//
// provideHttpClient():
// Habilita requisições HTTP,
// como GET, POST, PUT e DELETE.
import { provideHttpClient } from '@angular/common/http';


// Importa as rotas da aplicação.
//
// routes:
// Arquivo onde ficam as páginas/rotas.
import { routes } from './app.routes';


// Importa função para registrar idiomas
// (locale) no Angular.
import { registerLocaleData } from '@angular/common';


// Importa o locale em português.
//
// localePt:
// Dados de localização em português
// usados para data, moeda e números.
import localePt from '@angular/common/locales/pt';


// ==========================================
// REGISTRO DO LOCALE
// ==========================================

// Registra o idioma português no Angular.
//
// Isso permite que Pipes funcionem corretamente:
//
// date pipe → datas
// currency pipe → moedas
// decimal pipe → números
//
// Exemplo:
//
// {{ valor | currency }}
//
// Sem locale:
// $1,500.00
//
// Com pt-BR:
// R$ 1.500,00
registerLocaleData(localePt);


// ==========================================
// CONFIGURAÇÃO GLOBAL DA APLICAÇÃO
// ==========================================

// appConfig
//
// Objeto principal de configuração
// da aplicação Angular standalone.
//
// ApplicationConfig:
// Tipo que define configurações globais.
export const appConfig: ApplicationConfig = {

  // providers
  //
  // Lista de serviços/configurações
  // disponíveis em toda aplicação.
  providers: [

    // ==========================================
    // ROUTER (ROTAS)
    // ==========================================

    // Configura as rotas da aplicação.
    //
    // routes:
    // Arquivo com as páginas.
    //
    // withComponentInputBinding():
    // Faz parâmetros de rota irem
    // automaticamente para @Input().
    //
    // Exemplo:
    //
    // URL:
    // /produto/10
    //
    // Pode chegar direto no componente.
    provideRouter(
      routes,
      withComponentInputBinding()
    ),


    // ==========================================
    // IONIC
    // ==========================================

    // Inicializa o Ionic no Angular.
    //
    // mode: 'md'
    //
    // Força o estilo Material Design
    // em Android, iOS e Web.
    //
    // 'md' = Material Design
    // 'ios' = Visual estilo iPhone
    provideIonicAngular({

      // Material Design em todas plataformas.
      mode: 'md',
    }),


    // ==========================================
    // HTTP CLIENT
    // ==========================================

    // Habilita chamadas HTTP.
    //
    // Necessário para consumir APIs.
    //
    // Exemplo:
    //
    // this.http.get()
    // this.http.post()
    //
    // Sem isso:
    // HttpClient não funciona.
    provideHttpClient(),


    // ==========================================
    // LOCALE (IDIOMA)
    // ==========================================

    // Define o idioma padrão da aplicação.
    //
    // provide:
    // Token que será configurado.
    //
    // LOCALE_ID:
    // Configura idioma e formatação.
    //
    // useValue:
    // Valor utilizado.
    //
    // 'pt-BR':
    // Português do Brasil.
    {
      provide: LOCALE_ID,

      // Idioma da aplicação.
      useValue: 'pt-BR'
    },
  ],
};