import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IAdminUser } from '../../models/admin-user.model';
import { AdminUserService } from '../../services/admin-user.service';

@Component({
  selector: 'app-admin-user-table',
  templateUrl: './admin-user-table.component.html',
  styleUrls: ['./admin-user-table.component.css'],
})
export class AdminUserTableComponent implements OnInit {
  users$ = new Observable<IAdminUser[]>();

  constructor(private readonly adminUserService: AdminUserService) {}

  ngOnInit(): void {
    this.adminUserService.loadUsers();
    this.users$ = this.adminUserService.getUsers$();
  }

  OnDelete(id: string | undefined): void {
    if (!id) {
      return;
    }

    this.adminUserService.deleteUser(id);
  }
}
