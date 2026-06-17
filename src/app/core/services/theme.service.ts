// Importa o decorator Injectable do Angular.
// Ele transforma a classe em um "Service" (serviço Angular),
// permitindo que ela seja injetada em componentes ou outros serviços.
import { Injectable } from '@angular/core';


// Chave usada no localStorage para salvar o tema.
// O valor salvo será algo como: 'dark' ou 'light'.
const THEME_KEY = 'finance_theme';


// @Injectable()
// Diz ao Angular que essa classe pode ser injetada (Dependency Injection).
//
// providedIn: 'root'
// Significa que o serviço será criado uma única vez
// e ficará disponível em toda a aplicação (Singleton).
@Injectable({ providedIn: 'root' })
export class ThemeService {

  // Variável privada que controla se o tema atual é escuro.
  // false = tema claro
  // true = tema escuro
  //
  // private:
  // Só pode ser acessada dentro da própria classe.
  private isDark = false;


  // ==========================================
  // MÉTODO: applyStoredTheme()
  // ==========================================
  //
  // Para que serve?
  // Aplica o tema salvo no navegador.
  //
  // O que ele faz?
  // 1. Verifica se existe um tema salvo no localStorage.
  // 2. Se existir, usa esse tema.
  // 3. Se não existir, verifica a preferência do sistema operacional.
  // 4. Aplica o tema chamando setDark().
  //
  // void:
  // Significa que o método não retorna nada.
  applyStoredTheme(): void {

    // Busca o tema salvo no localStorage.
    //
    // Pode retornar:
    // 'dark'
    // 'light'
    // null (caso não exista nada salvo)
    //
    // as 'dark' | 'light' | null
    // É um Type Assertion do TypeScript,
    // dizendo quais tipos esse valor pode ter.
    const stored = localStorage.getItem(THEME_KEY) as
      'dark' | 'light' | null;

    // Verifica a preferência do sistema do usuário.
    //
    // Exemplo:
    // Windows ou celular em modo escuro → true
    // Tema claro → false
    //
    // window.matchMedia()
    // Serve para verificar media queries do CSS via JavaScript.
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    // Decide qual tema usar.
    //
    // Se tiver algo salvo no localStorage:
    // usa o valor salvo.
    //
    // Caso não tenha:
    // usa a preferência do sistema.
    const useDark = stored
      ? stored === 'dark'
      : prefersDark;

    // Aplica o tema escolhido.
    this.setDark(useDark);
  }


  // ==========================================
  // MÉTODO: toggle()
  // ==========================================
  //
  // Para que serve?
  // Alterna entre tema claro e escuro.
  //
  // Exemplo:
  // false → true
  // true → false
  //
  // O ! significa "inverter".
  //
  // !false = true
  // !true = false
  toggle(): void {

    // Chama setDark() passando o valor invertido.
    this.setDark(!this.isDark);
  }


  // ==========================================
  // MÉTODO: setDark()
  // ==========================================
  //
  // Para que serve?
  // Altera o estado do tema, salva no localStorage e aplica a classe ao body.
  //
  // value: true = tema escuro, false = tema claro.
  setDark(value: boolean): void {
    this.isDark = value;
    localStorage.setItem(THEME_KEY, value ? 'dark' : 'light');
    document.body.classList.toggle('dark', value);
  }


  // ==========================================
  // GETTER: currentIsDark
  // ==========================================
  //
  // Para que serve?
  // Permite acessar o valor de isDark fora da classe.
  //
  // Como usar:
  //
  // themeService.currentIsDark
  //
  // Sem getter:
  // themeService.isDark = false; // ERRO: isDark é privado
  // (não funciona porque é private)
  //
  // boolean:
  // Retorna true ou false.
  get currentIsDark(): boolean {

    // Retorna o estado atual do tema.
    return this.isDark;
  }
}