/* eslint-disable max-classes-per-file */
import { BaseEntity } from './base.entity';
import { Type, Expose as JsonProperty } from 'class-transformer';

export class Sort {
    public property: string;
    public direction: 'ASC' | 'DESC' | string;
    constructor(sort: string| string[]) {

        if (sort) {

          if (Array.isArray(sort)) {

            [this.property, this.direction] = sort[0].split(',');
          }else{

            // [this.property, this.direction] = sort.split(',');
            const splitValues = sort.split(',');
            this.property=splitValues[0];
            this.direction=splitValues[1].toUpperCase();
          }
        }
    }

    asOrder(): any {
        const order = {};
        order[this.property] = this.direction.toUpperCase();
        return order;
    }
}

export class PageRequest {
    @JsonProperty()
    page = 0;
    @JsonProperty()
    size = 20;
    @Type(() => Sort)
    sort: Sort = new Sort('id,ASC');

    constructor(page: number | string, size: number | string, sort: string) {
        this.page = +page || this.page;
        this.size = +size || this.size;
        this.sort = sort ? new Sort(sort) : this.sort;
    }
}

export class Page<T extends BaseEntity> {
    constructor(public content: T[], public total: number, public pageable: PageRequest) {}
}
