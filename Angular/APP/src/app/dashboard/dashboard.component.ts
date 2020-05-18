import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
data: any;
  constructor(private service: AdminService) { }

  ngOnInit(): void {
    this.service.getUser().subscribe((res) => {
      this.data = res.data;
    });
  }

}
