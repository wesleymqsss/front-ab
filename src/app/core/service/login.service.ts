import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Logged, Login, UserLogin } from '../interface/userLogin'; 

const USER_STORAGE_KEY = 'currentUserAppDoAmor'; 

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = `${environment.api_url}usuario`;
  private currentUserSubject = new BehaviorSubject<Logged | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();
 
  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    if (typeof localStorage === 'undefined') { 
        this.isLoggedInSubject.next(false);
        this.currentUserSubject.next(null);
        return;
    }

    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      try {
        const loggedUser: Logged = JSON.parse(storedUser);

        if (loggedUser && (loggedUser.id || loggedUser.token)) { 
          this.currentUserSubject.next(loggedUser);
          this.isLoggedInSubject.next(true);

        } else {
          localStorage.removeItem(USER_STORAGE_KEY);
          this.isLoggedInSubject.next(false); 
          this.currentUserSubject.next(null);

        }
      } catch (error) {
        console.error('Erro ao buscar usuário do localStorage', error);
        localStorage.removeItem(USER_STORAGE_KEY);
        this.isLoggedInSubject.next(false);
        this.currentUserSubject.next(null);

      }
    } else {
        this.isLoggedInSubject.next(false);
        this.currentUserSubject.next(null);
    }
  }

  public get currentUserValue(): Logged | null {
    return this.currentUserSubject.value;
  }

  public logout(): void {
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
    if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(USER_STORAGE_KEY);
    }
  }

  getUserLogin(user: Login): Observable<Logged> {
    return this.http.post<Logged>(`${this.url}/login`, user).pipe(
      tap((response: Logged) => {
        if (response && (response.id || response.token)) { 
          this.currentUserSubject.next(response);
          this.isLoggedInSubject.next(true);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(response));
          }
        } else {
          this.logout();
          console.warn('alerta!', response);
        }
      },
      (error) => {
        this.logout(); 
        console.error('Erro durante o login:', error);
       
      }
      )
    );
  }

  getUserId(id: number): Observable<UserLogin> { 
    return this.http.get<UserLogin>(`${this.url}/${id}`); 
  }

  updatePassword(user: any): Observable<any> {
    return this.http.put<any>(`${this.url}/alterar-senha`, user);
  }
}