import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../../../common/services/template/template.service';
import { UserService } from '../../../common/services/user/user.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  template: Array<any>;
  constructor(private templateService: TemplateService, private userService: UserService) { }
  get homePage() {
    return this.userService.getUserInfo().homePage;
  }
  ngOnInit() {
    this.templateService.getAll().then(response => {
      this.template = response;
    });
  }
}