import { Pipe, PipeTransform } from '@angular/core';

const menuMap = {
  'home': '首页',
  'monitor': '监控',
  'template': '模板',
  'doc': '文档',
};

@Pipe({
  name: 'transformMenu'
})
export class TransformMenuPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return menuMap[value];
  }

}
