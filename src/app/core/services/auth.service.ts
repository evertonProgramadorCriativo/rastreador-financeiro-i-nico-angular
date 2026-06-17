// Importa o decorator Injectable, usado para transformar a classe em um serviço Angular.
import { Injectable } from '@angular/core';

// Importa o BehaviorSubject do RxJS.
// Ele permite armazenar um valor atual e notificar automaticamente todos os componentes inscritos.
import { BehaviorSubject } from 'rxjs';

// Importa o Router para realizar navegação entre páginas.
import { Router } from '@angular/router';


// Interface que define o formato do objeto User.
// Serve como um contrato de tipagem para os usuários da aplicação.
export interface User {
  id: string;                 // Identificador único do usuário
  name: string;               // Nome do usuário
  email: string;              // Email do usuário
  currency: string;           // Moeda preferida (BRL, USD, etc.)
  theme: 'light' | 'dark';    // Tema da aplicação
}


// Chaves utilizadas para armazenar dados no localStorage.
const TOKEN_KEY = 'finance_token';
const USER_KEY  = 'finance_user';


// Registra o serviço na raiz da aplicação.
// Isso cria uma única instância (Singleton) disponível em todo o projeto.
@Injectable({ providedIn: 'root' })
export class AuthService {

  /**
   * BehaviorSubject responsável por armazenar
   * o usuário atualmente autenticado.
   *
   * loadUser() tenta recuperar o usuário salvo
   * anteriormente no localStorage.
   */
  private currentUserSubject = new BehaviorSubject<User | null>(
    this.loadUser()
  );

  /**
   * Observable público.
   *
   * Componentes podem se inscrever nele para
   * receber atualizações sempre que o usuário mudar.
   */
  currentUser$ = this.currentUserSubject.asObservable();

  /**
   * Injeção de dependência do Router.
   *
   * Permite navegar para outras páginas.
   */
  constructor(private router: Router) {}

  /**
   * Verifica se existe um token salvo.
   *
   * Retorna:
   * true  -> usuário autenticado
   * false -> usuário não autenticado
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Getter que retorna o usuário atual.
   *
   * currentUserSubject.value contém
   * o valor atual do BehaviorSubject.
   */
  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Realiza login do usuário.
   *
   * Parâmetros:
   * - email
   * - password
   *
   * Retorna:
   * true  -> login realizado
   * false -> usuário não encontrado
   */
  login(email: string, password: string): boolean {

    // Recupera todos os usuários cadastrados.
    const users = this.getRegisteredUsers();

    // Procura um usuário com email e senha correspondentes.
    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    // Se não encontrou usuário válido.
    if (!found) return false;

    /**
     * Remove a propriedade password
     * antes de salvar o usuário logado.
     *
     * Desestruturação:
     * password vai para _pw
     * restante vai para user.
     */
    const { password: _pw, ...user } = found;

    // Gera um token simples.
    const token = this.generateToken(user.id);

    // Salva token e usuário no navegador.
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    // Atualiza o usuário atual e notifica inscritos.
    this.currentUserSubject.next(user);

    return true;
  }

  /**
   * Cadastra um novo usuário.
   *
   * Retorna:
   * true  -> cadastro realizado
   * false -> email já existe
   */
  register(name: string, email: string, password: string): boolean {

    // Recupera usuários cadastrados.
    const users = this.getRegisteredUsers();

    // Verifica se já existe usuário com o mesmo email.
    if (users.some((u) => u.email === email)) {
      return false;
    }

    // Cria o novo usuário.
    const newUser: User = {
      id: crypto.randomUUID(), // gera ID único
      name,
      email,
      currency: 'BRL',
      theme: 'light',
    };

    /**
     * Salva usuário juntamente com senha.
     *
     * O operador spread (...) copia todas
     * as propriedades do objeto.
     */
    users.push({ ...newUser, password });

    // Atualiza lista de usuários.
    localStorage.setItem(
      'finance_users',
      JSON.stringify(users)
    );

    // Gera token de autenticação.
    const token = this.generateToken(newUser.id);

    // Salva dados da sessão.
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));

    // Atualiza usuário atual.
    this.currentUserSubject.next(newUser);

    return true;
  }

  /**
   * Atualiza informações do usuário atual.
   *
   * Partial<User> significa que apenas
   * alguns campos podem ser enviados.
   */
  updateUser(data: Partial<User>): void {

    const user = this.currentUser;

    // Se não houver usuário logado.
    if (!user) return;

    /**
     * Cria novo objeto unindo:
     * - dados antigos
     * - dados novos
     */
    const updated = { ...user, ...data };

    // Salva no navegador.
    localStorage.setItem(
      USER_KEY,
      JSON.stringify(updated)
    );

    // Notifica componentes inscritos.
    this.currentUserSubject.next(updated);
  }

  /**
   * Encerra a sessão do usuário.
   */
  logout(): void {

    // Remove dados de autenticação.
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    // Limpa usuário atual.
    this.currentUserSubject.next(null);

    // Redireciona para tela de login.
    this.router.navigate(['/login']);
  }

  /**
   * Recupera usuário salvo no navegador.
   *
   * Método privado:
   * só pode ser usado dentro do serviço.
   */
  private loadUser(): User | null {

    const raw = localStorage.getItem(USER_KEY);

    // Converte JSON para objeto.
    return raw ? (JSON.parse(raw) as User) : null;
  }

  /**
   * Recupera todos os usuários cadastrados.
   *
   * Retorna:
   * Array<User & { password: string }>
   *
   * Significa:
   * Um User + campo password.
   */
  private getRegisteredUsers(): Array<User & { password: string }> {

    const raw = localStorage.getItem('finance_users');

    return raw ? JSON.parse(raw) : [];
  }

  /**
   * Gera um token simples.
   *
   * btoa() converte texto para Base64.
   *
   * Exemplo:
   * "123:17123456789"
   * =>
   * "MTIzOjE3MTIzNDU2Nzg5"
   *
   * Observação:
   * Isso NÃO é um JWT real.
   * É apenas uma simulação para estudos.
   */
  private generateToken(userId: string): string {

    return btoa(`${userId}:${Date.now()}`);
  }
}