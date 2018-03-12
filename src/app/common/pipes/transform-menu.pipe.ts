import { Pipe, PipeTransform } from '@angular/core';

const menuMap = {
  'home': '首页',
  'monitor': '监控',
  'warning': '高警',
  'console': '控制台',
};

@Pipe({
  name: 'transformMenu'
})
export class TransformMenuPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return menuMap[value];
  }

}
