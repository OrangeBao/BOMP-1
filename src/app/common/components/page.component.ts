import { HostListener } from '@angular/core';

// 查询条件的模型
declare class QueryParams {
    filter: {
        tags: string[];
        keyWord: string;
    };
    sort: any;
}

export abstract class PageComponent<T> {

    // 数据集合
    dataSource: Array<T> = [];

    // 查询条件
    protected queryParams: QueryParams = {
        filter: {
            tags: [],
            keyWord: ''
        },
        sort: {}
    };

    // 是否是批量模式
    protected isBatchModel = false;
    // 翻页loading状态
    protected needLoad = false;
    // 没有更多
    protected noMore = false;

    // 批量模式下 选中的id数组
    choiceList: Array<T> = [];


    // 获取追加的数据 返回Observable
    abstract appendData(queryParams: QueryParams);

    // 删除纪录  不一定是删除
    abstract deleteDataSource(record: T);

    // 批量删除纪录  不一定是删除
    abstract batchDeleteDataSource();

    // 删除的请求
    abstract deleteRequest(records: Array<T>);

    // 获取数据中的标签数组 可能被重写
    getTagsFromRecord(item: T | any): string[] {
        return (<{tags: string[]}>item).tags;
    }

    // 获取数据唯一身份标志   可能被重写
    getRecordId(item: T | any): any {
        return item.id;
    }
    // 获取数据
    requestData(isRefresh: boolean) {
        this.needLoad = true;
        this.appendData(this.queryParams).subscribe(response => {
            this.needLoad = false;
            if (response.last) {
                this.noMore = true;
            }
            if (isRefresh) {
                this.dataSource = response.content;
            } else {
                this.dataSource = [...this.dataSource, ...response.content];
            }
          });
    }

    // 监控 window 滚动事件
    @HostListener('window:scroll', ['$event.target.documentElement'])
    onScroll(docEle) {
        if (!this.isBatchModel && !this.needLoad && docEle.scrollTop + docEle.clientHeight === docEle.scrollHeight) {
            if (!this.noMore) {
                this.requestData(false);
            } else {
                this.needLoad = true;
                setTimeout(() => this.needLoad = false, 3000);
            }
        }
    }

    // 切换到批量模式
    batchModel() {
        this.choiceList = [];
        this.isBatchModel = !this.isBatchModel;
    }

    // 移入或移出选择列表
    addChoice(record: T) {
        if (this.isBatchModel) {
            if (this.isChoice(record)) {
                this.choiceList = this.choiceList.filter(item => this.getRecordId(item) !== this.getRecordId(record));
            } else {
                this.choiceList.push(record);
            }
        }
    }

    // 是否选中
    isChoice(record: T) {
        return this.choiceList.find(item => this.getRecordId(item) === this.getRecordId(record));
    }

    // 是否全选
    get isAll() {
        return this.dataSource && this.choiceList.length === this.dataSource.length;
    }

    // 获取现有数据的所有标签  数据模型中要包含tags字段 否则报错
    get allTags() {
        return (this.dataSource || []).reduce((ret, item: any) => {
            const temp = new Set([...ret, ...( this.getTagsFromRecord(item) || [])]);
            return Array.from(temp);
        }, []);
    }

    // 当tagsbar选中标签有改动时 触发此回调
    tagChange($event) {
        // TODO: 触发重新请求
        this.queryParams.filter.tags = $event;
    }

    // 全选
    allSelectChange() {
        if (this.isAll) {
          this.choiceList = [];
        } else {
          this.choiceList = (this.dataSource || []).map(item => this.getRecordId(item));
        }
    }

    //  获得用于展示的数据
    get displayDataSource(): Array<T> {
        return this.dataSource;
    }
}
