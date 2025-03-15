import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { LocalStorageService } from '../../services/storage/local-storage.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    RouterLink,
    NgIf
  ],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit {
  public userLoggedIn:boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
    private auth: AuthenticationService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.userLoggedIn = this.isLogged("isLogged");
    this.router.events.subscribe(event => {
      console.log("Navigation event detected:", event);
    });
  }

  public logOut():void {
    this.auth.logOut();
    this.userLoggedIn = false;
    this.router.navigate(['/login']);
  }

  private isLogged(key: string): boolean {
    const userLogged: string = this.localStorageService.getItem(key) ?? "";
    return userLogged === "true"
  }
}
