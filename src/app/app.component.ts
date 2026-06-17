// Importa funcionalidades do Angular Core.
//
// Component:
// Decorator usado para transformar a classe
// em um componente Angular.
//
// OnInit:
// Interface do Angular usada para executar
// código quando o componente inicia.

import { Component, OnInit } from '@angular/core';

// Importa componentes standalone do Ionic.
//
// IonApp:
// Container principal da aplicação Ionic.
//
// IonRouterOutlet:
// Área onde as páginas são renderizadas
// conforme a navegação/rotas.

import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

// Importa o serviço responsável
// pelo controle do tema.
//
// ThemeService:
// Serviço que alterna e aplica
// dark mode / light mode.

import { ThemeService } from './core/services/theme.service';


// DECORATOR DO COMPONENTE

// @Component()
//
// Transforma a classe AppComponent
// em um componente Angular.
//
// Esse componente é o componente raiz
// (primeiro componente carregado).
@Component({
   // selector
  //
  // Nome da tag HTML do componente.
  //
  // Exemplo:
  // <app-root></app-root>
  //
  // Essa tag normalmente aparece
  // no index.html.

  selector: 'app-root',
    // standalone: true
  //
  // Indica que esse componente
  // não depende de AppModule.
  //
  // O Angular moderno usa
  // Standalone Components.

  standalone: true,
 
  // imports
  //
  // Lista de componentes usados
  // dentro do template.
  //
  // Sem importar aqui,
  // o Angular não reconhece
  // as tags do Ionic.
  imports: [

    // Container principal do Ionic.
    IonApp,

    // Área de renderização das rotas.
    IonRouterOutlet
  ],
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>
  `,
})
// ==========================================
// CLASSE DO COMPONENTE
// ==========================================

// AppComponent
//
// Componente raiz da aplicação.
//
// implements OnInit
//
// Diz que a classe irá usar
// o lifecycle hook ngOnInit().
export class AppComponent implements OnInit {


  // ==========================================
  // CONSTRUCTOR
  // ==========================================

  // constructor()
  //
  // Para que serve?
  // Injeta dependências na classe.
  //
  // O Angular cria automaticamente
  // uma instância do ThemeService.
  //
  // private:
  // Cria uma propriedade privada.
  //
  // themeService:
  // Nome da variável.
  //
  // ThemeService:
  // Tipo/classe injetada.
  constructor(
    private themeService: ThemeService
  ) {}


  // ==========================================
  // LIFECYCLE: ngOnInit()
  // ==========================================

  // ngOnInit()
  //
  // Para que serve?
  // Executa código quando
  // o componente é iniciado.
  //
  // É chamado automaticamente
  // pelo Angular.
  //
  // Quando executa?
  //
  // constructor()
  //       ↓
  // ngOnInit()
  //       ↓
  // componente renderiza
  ngOnInit(): void {

    // Aplica o tema salvo
    // no localStorage.
    //
    // Se existir:
    // dark ou light
    //
    // Se não existir:
    // usa preferência do sistema.
    //
    // Exemplo:
    // Windows em dark mode
    // → tema escuro
    this.themeService.applyStoredTheme();
  }
}