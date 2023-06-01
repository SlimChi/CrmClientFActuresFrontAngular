import {Component, OnInit} from '@angular/core';
import {UserDto} from "../../../service/swagger/services/models/user-dto";
import {UserControllerService} from "../../../service/swagger/services/services/user-controller.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  users: Array<UserDto> = [];
  selectedUserId: number | undefined;

  constructor(
    private userService: UserControllerService,
  ) {}

  ngOnInit(): void {
    this.findAllUsers();

  }

  private findAllUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
    });
  }
  selectUser(userId: number) {
    this.selectedUserId = userId;
  }


}
