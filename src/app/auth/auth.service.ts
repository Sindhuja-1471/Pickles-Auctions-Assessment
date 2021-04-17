import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { StorageService } from '../shared/service/storage.service';
import { LoginResponse, User } from '../shared/interface/user.model';
import { environment } from '../../environments/environment.prod';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService implements OnInit {
    constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {}

    login(username: string, password: string) {
        return this.http.post<LoginResponse>(`${environment.baseAPIUrl}/login`, { username, password }).pipe(
            tap((response: LoginResponse) => {
                localStorage.setItem('userData', JSON.stringify(response.user));
                if (response.token) {
                    StorageService.setItem('token', response.token);
                }
            }),
        );
    }

    removeToken() {
        StorageService.removeItem('token');
    }

    logout() {
        localStorage.removeItem('userData');
        this.router.navigate(['login']);
    }

    isAuthenticated(): boolean {
        return StorageService.getItem('token') !== null;
    }
}
