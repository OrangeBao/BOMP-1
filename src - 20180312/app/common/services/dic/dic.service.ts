import { Injectable } from '@angular/core';

@Injectable()
export class DicService {

  constructor() { }
  getRegion(): Array<any> {
    return [
      { key: 'INFRASTRUCTURE', value: '基础设置层' },
      { key: 'PLATFORM', value: '平台层' },
      { key: 'SERVICE', value: '业务层' }
    ];
  }
  getTimeUnit(): Array<any> {
    return [
      { key: 's', value: '秒' },
      { key: 'm', value: '分' },
      { key: 'h', value: '时' },
      { key: 'd', value: '天' }
    ];
  }

}
