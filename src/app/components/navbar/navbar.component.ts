import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isPTB:boolean = false;
  constructor(private authService:AuthService, private router:Router) { 
    this.isPTB = localStorage.getItem('ptb') == 'true';
  }

  ngOnInit(): void {
  }

  logout()
  {
    this.authService.logout().then(response=> {
      this.router.navigateByUrl('');
      localStorage.clear();
    })
  }
}
