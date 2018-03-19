import { HostListener } from '@angular/core';
import { ModalService } from 'zu-modal';

export abstract class PageComponent {

    // 是否是删除模式
    protected isDeleteModel: boolean = false;
    // 翻页loading状态
    protected needLoad: boolean = false;
    // 没有更多
    protected noMore: boolean = false;

    // 获取数据
    abstract fetchData(endLoad: Function, showNoMore: Function);

    // 监控 window 滚动事件
    @HostListener('window:scroll', ['$event.target.documentElement'])
    onScroll(docEle) {
        if (!this.noMore && !this.isDeleteModel && !this.needLoad && docEle.scrollTop + docEle.clientHeight === docEle.scrollHeight) {
            this.needLoad = true;
            setTimeout(() => this.fetchData(() => this.needLoad = false, () => {
                this.noMore = true;
                setTimeout(() => {
                    this.noMore = false;
                    this.needLoad = false;
                }, 4000);
            }), 2000);
        }
    }

    choiceList: Array<any> = [];

    // 切换到删除模式
    deleteModel() {
        this.choiceList = [];
        this.isDeleteModel = !this.isDeleteModel;
    }
    
    // 移入或移出选择列表
    addChoice(id) {
        if (this.isDeleteModel) {
            if (this.choiceList.includes(id)) {
                this.choiceList = this.choiceList.filter(i => i !== id);
            } else {
                this.choiceList.push(id);
            }
        }
    }
    // 全选
    abstract allSelectChange();

    // 是否选中
    isChoice(id) {
        return this.choiceList.includes(id);
    }
}