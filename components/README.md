# ngx-Zorro

[![npm version](https://img.shields.io/npm/v/ngx-zorro/latest.svg)](https://www.npmjs.com/package/ngx-zorro)

ngx-zorro 是一个`angular`的组件库，基于`ng-zorro-antd`开发的一些常用组件

-   [ngx-Zorro](#ngx-zorro)
    -   [依赖](#依赖)
    -   [安装](#安装)
    -   [组件库](#组件库)
        -   [loading 组件 💘](#loading-组件-)
            -   [如何使用](#如何使用)
            -   [代码示例](#代码示例)
                -   [服务的方式调用](#服务的方式调用)
            -   [参数说明](#参数说明)
        -   [弹框组件 💘](#弹框组件-)
            -   [如何使用](#如何使用-1)
            -   [代码示例](#代码示例-1)
            -   [参数说明](#参数说明-1)
        -   [动态构造表单组件 💘](#动态构造表单组件-)
            -   [具有的能力](#具有的能力)
            -   [如何使用](#如何使用-2)
            -   [代码说明](#代码说明)
                -   [自定义表单类型](#自定义表单类型)
                -   [自定义脚本验证和联合判断](#自定义脚本验证和联合判断)
                -   [自定义特定模板扩展属性](#自定义特定模板扩展属性)
            -   [参数说明](#参数说明-2)
    -   [指令](#指令)
        -   [防抖事件指令 ✈️](#防抖事件指令-️)
            -   [如何使用](#如何使用-3)
            -   [代码示例](#代码示例-2)
            -   [参数说明](#参数说明-3)
        -   [权限指令 ✈️](#权限指令-️)
            -   [如何使用](#如何使用-4)
            -   [代码示例](#代码示例-3)
            -   [参数说明](#参数说明-4)
    -   [拦截器](#拦截器)
        -   [HTTP 请求缓存拦截器 📍](#http-请求缓存拦截器-)
            -   [如何使用](#如何使用-5)
            -   [具有的能力](#具有的能力-1)
                -   [清理已缓存的请求](#清理已缓存的请求)
    -   [工具](#工具)
        -   [缓存属性装饰器 🚩](#缓存属性装饰器-)
            -   [如何使用](#如何使用-6)
            -   [代码示例](#代码示例-4)
            -   [参数](#参数)
        -   [下载文件服务 🚩](#下载文件服务-)
            -   [如何使用](#如何使用-7)
            -   [代码示例](#代码示例-5)
            -   [参数说明](#参数说明-5)
        -   [](#)

## 依赖

```package.json
"@angular/cdk": "^12.2.13",
"ng-zorro-antd": "^12.1.1"
```

## 安装

```
npm i ngx-zorro --save
yarn add ngx-zorro
```

## 组件库

### loading 组件 💘

#### 如何使用

```typescript
import { NgxLoadingModule } from 'ngx-zorro/loading';
```

#### 代码示例

```html
<ngx-loading [(visible)]="visible"></ngx-loading>
```

##### 服务的方式调用

```typescript
constructor(private loading: NgxLoadingService) {}
const loading = this.loading.open();
loading.close();
```

#### 参数说明

| 参数      | 说明                   | 类型    | 默认值  |
| --------- | ---------------------- | ------- | ------- |
| [visible] | 是否显示(支持双向绑定) | boolean | false   |
| [tip]     | 提示内容               | string  | 加载中… |
| [inline]  | 是否行内模式           | boolean | false   |

### 弹框组件 💘

#### 如何使用

在 `style.scss`中引入

```scss
// 导入 cdk overlay 的样式
@import '@angular/cdk/overlay-prebuilt.css';
// 导入 ngx-zorro 的样式
@import 'ngx-zorro/ngx-zorro.scss';
```

在需要的模块中导入

```typescript
import { NgxDialogModule } from 'ngx-zorro/dialog';
```

#### 代码示例

```html
<ngx-dialog title="弹框标题" [(visible)]="visible">
    <div *ngxDialogContent>弹框内容</div>
</ngx-dialog>
```

#### 参数说明

| 参数               | 说明                               | 类型                                       | 默认值 |
| ------------------ | ---------------------------------- | ------------------------------------------ | ------ |
| [(visible)]        | 是否显示                           | boolean                                    | false  |
| [title]            | 弹框标题                           | string \| TemplateRef&lt;any> \| undefined | -      |
| \*ngxDialogContent | 弹框内容模板                       | TemplateRef                                | -      |
| [full]             | 是否全屏                           | boolean                                    | false  |
| [fullButton]       | 是否显示全屏按钮                   | boolean                                    | true   |
| [mask]             | 是否展示遮罩                       | boolean                                    | false  |
| [dragBoundary]     | 是否启用拖动边界【可视区域内拖动】 | boolean                                    | true   |
| [keyboard]         | 是否支持键盘 esc 关闭              | boolean                                    | true   |
| [move]             | 是否启用拖拽                       | boolean                                    | true   |
| [resize]           | 是否允许拖拽弹层右下角拉伸尺寸     | boolean                                    | true   |
| [width]            | 宽度                               | string \| number                           | 960    |
| [height]           | 高度                               | string \| number                           | 580    |
| [minWidth]         | 最小宽度                           | number                                     | 400    |
| [minHeight]        | 最小高度                           | number                                     | 200    |
| [top]              | 窗口距离顶部距离                   | string                                     | -      |
| [left]             | 窗口距离左边距离                   | string                                     | -      |
| [right]            | 窗口距离右边距离                   | string                                     | -      |
| [bottom]           | 窗口距离底部距离                   | string                                     | -      |

### 动态构造表单组件 💘

#### 具有的能力

> 可以自定义表单类型，支持自定义脚本验证和联合判断，自定义特定模板扩展属性，
>
> 默认支持类型： input，其它类型请自行实现

#### 如何使用

```typescript
import { NgxDynamicFormModule } from 'ngx-zorro/dynamic-form';
NgxDynamicFormModule.forRoot(); // 配置共享：用于全局自定义表单类型
NgxDynamicFormModule.forChild(); // 配置独立：一般用于子模块自定义表单类型
```

#### 代码说明

```html
<ngx-dynamic-form #formEditor [fields]="fields" [data]="data" layout="vertical"></ngx-dynamic-form>
```

```typescript
// 获取表单的值
const data = this.formEditor.getRawValue(true);
```

##### 自定义表单类型

```typescript
interface RadioProps {
    options?: { label: string; value: any }[];
}

@Component({
    selector: 'app-radio',
    template: `
        <nz-radio-group [formControl]="formControl">
            <ng-container *ngFor="let item of options">
                <label nz-radio [nzValue]="item.value">{{ item.label }}</label>
            </ng-container>
        </nz-radio-group>
    `,
})
export class RadioComponent extends FormControlType<FormFieldConfig<RadioProps>> implements OnInit {
    ngOnInit(): void {}

    get options() {
        return this.props?.options ?? [];
    }
}

// app.module.ts
NgxDynamicFormModule.forRoot({
    types: [{ type: 'radio', component: RadioComponent }],
});

// app.component.ts
fields = [
    {
        type: 'radio',
        key: 'sex',
        props: {
            options: [
                { label: '男', value: '1' },
                { label: '女', value: '2' },
            ],
        },
    },
];
```

##### 自定义脚本验证和联合判断

```typescript
fields = [
    {
        type: 'input',
        label: '姓名',
        key: 'name',
        triggerScript: (control: AbstractControl, fields: FormFieldConfig[]) => {
            // 姓名有值曾用名字段才会显示，否则隐藏
            const name2 = fields.find(f => f.key === 'name2');
            if (name2) {
                name2.hidden = !control.value;
            }
        },
        // 支持传递字符串，默认参数：control: AbstractControl, fields: FormFieldConfig[]
        // triggerScript: `fields.find(f => f.key === 'age').disabled = !control.value;`,
    },
    {
        type: 'input',
        label: '曾用名',
        key: 'name2',
    },
    {
        type: 'input',
        label: '身份证号',
        key: 'idCard',
        verifyScript: (control: AbstractControl, fields: FormFieldConfig[]) => {
            // 身份证验证18位
            if (control.value && control.value.length !== 18) {
                return { error: true, message: '身份证号必须是18位' };
            }
            return {};
        },
    },
    {
        type: 'input',
        label: '出生日期',
        key: 'birth',
        triggerScript: (control: AbstractControl, fields: FormFieldConfig[]) => {
            if (control.value) {
                // 通过出生日期计算年龄
                const birthDateObject = new Date(control.value);
                const currentDate = new Date();
                const ageNum = currentDate.getFullYear() - birthDateObject.getFullYear();
                control.parent?.get('age')?.patchValue(ageNum);
            }
        },
    },
    {
        type: 'input',
        label: '年龄',
        key: 'age',
    },
];
```

##### 自定义特定模板扩展属性

```typescript
// 支持扩展属性继承，可以在自定义组件里面使用
interface RadioProps {
    options?: { label: string; value: any }[];
}
export class RadioComponent extends FormControlType<FormFieldConfig<RadioProps>> implements OnInit {
    ngOnInit(): void {}

    get options() {
        return this.props?.options ?? [];
    }
}
```

#### 参数说明

| 参数       | 说明     | 类型                                   | 默认值     |
| ---------- | -------- | -------------------------------------- | ---------- |
| [fields]   | 字段列表 | FormFieldConfigs                       | -          |
| [disabled] | 是否只读 | boolean                                | false      |
| [data]     | 表单数据 | Record<string,any>                     | -          |
| [layout]   | 表单布局 | 'vertical' \| 'horizontal' \| 'inline' | 'vertical' |

## 指令

### 防抖事件指令 ✈️

#### 如何使用

```typescript
import { NgxDirectivesModule } from 'ngx-zorro/directives';
```

#### 代码示例

```html
<button nz-button nzType="primary" (click.d)="submit()">提交</button>
```

#### 参数说明

| 参数       | 说明              | 类型    | 默认值 |
| ---------- | ----------------- | ------- | ------ |
| [delay]    | 延迟时间(单位:ms) | number  | 500    |
| [disabled] | 是否只读          | boolean | false  |

### 权限指令 ✈️

#### 如何使用

```typescript
import { NgxDirectivesModule } from 'ngx-zorro/directives';
import { NgxConfigService } from 'ngx-zorro/services';

@NgModule({
    imports: [NgxDirectivesModule],
    providers: [{ provide: NgxConfigService, useExisting: NgxZorroConfigService }],
})

// NgxZorroConfigService 服务
export class NgxZorroConfigService extends NgxConfigService {
    constructor() {
        super();
    }

    hasAuth = (tag: Array<string>) => {
        return of({ $implicit: {}, status: false });
    };
}
```

#### 代码示例

```html
<ng-container *auth="condition; then authTemplate; else noAuthTemplate"></ng-container>
<ng-template #authTemplate let-authList>有权限</ng-template>
<ng-template #noAuthTemplate>无权限</ng-template>
```

#### 参数说明

| 参数   | 说明       | 类型               | 默认值 |
| ------ | ---------- | ------------------ | ------ |
| \*auth | 权限标识符 | string \| string[] | -      |

## 拦截器

### HTTP 请求缓存拦截器 📍

#### 如何使用
只支持`get`请求

```typescript
import { NgxCacheInterceptorProvide } from 'ngx-zorro/interceptors';
providers: [NgxCacheInterceptorProvide],
```

```typescript
// 推荐方式
this.http.get(...CacheTemplate`api/response.json`).subscribe();

// 其它方式
const headers = new HttpHeaders({ 'Cache-Map': 'Storage' });
this.http.get(url, { headers }).subscribe();
```

#### 具有的能力

> 把一些结果稳定不变的请求缓存起来了，缓解请求压力

##### 清理已缓存的请求

```typescript
constructor(private cache: NgxCacheService) {}
this.cache.clear();
this.cache.delete();
```

## 工具

### 缓存属性装饰器 🚩

#### 如何使用

```typescript
// app.module.ts 中设置前缀
import { setStorePrefix } from 'ngx-zorro/utils';
setStorePrefix('ngx-zorro');

import { Store } from 'ngx-zorro/utils';
```

#### 代码示例

```typescript
@Store()
authList = [] // 默认值
```

```typescript
@Store({ key: 'auth', expires: 1000 * 60 * 60 }) // 缓存的key指定为: auth; 过期时间为: 1小时
authList = [] // 默认值
```

#### 参数

| 参数                               | 说明         | 类型         | 默认值 |
| ---------------------------------- | ------------ | ------------ | ------ |
| { key?: string, expires?: number } | 缓存配置信息 | StoreOptions | -      |

### 下载文件服务 🚩

#### 如何使用

```typescript
import { NgxDownFileService } from 'ngx-zorro/utils';
constructor(private downFile: NgxDownFileService) {}

// 必须配合 blob http 拦截器才能使用
import { NgxBlobInterceptorProvide } from 'ngx-zorro/interceptors';
providers: [NgxBlobInterceptorProvide],
```

#### 代码示例

```typescript
this.downFile.download('get', 'assets/background.jpg?fileName=bg.jpg').subscribe({
    next: () => {
        // 下载成功处理
    },
    error: json => {
        // 下载错误处理
    },
});
```

#### 参数说明

| 参数   | 说明                                                                                                                | 类型               | 默认值 |
| ------ | ------------------------------------------------------------------------------------------------------------------- | ------------------ | ------ |
| method | 请求类型                                                                                                            | 'get' \| 'post'    | -      |
| url    | 请求地址，url 可以传递自定义文件名；<br />如：api/file/down?fileName=身份证.jpg，文件名则优先使用 url 参数 fileName | string             | -      |
| params | 请求参数                                                                                                            | Record<string,any> | -      |

###
