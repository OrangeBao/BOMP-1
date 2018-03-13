import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../common/services/template/template.service';
import { UserService } from '../common/services/user/user.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
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
