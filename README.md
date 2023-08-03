# ngx-Zorro

[![npm version](https://img.shields.io/npm/v/ngx-zorro/latest.svg)](https://www.npmjs.com/package/ngx-zorro)

ngx-zorro 是一个`angular`的组件库，基于`ng-zorro-antd`开发的一些常用组件

## 目录

-   [ngx-Zorro](#ngx-zorro)
    -   [目录](#目录)
    -   [依赖](#依赖)
    -   [安装](#安装)
    -   [组件库](#组件库)
        -   [loading 组件 💘](#loading-组件-)
            -   [如何使用](#如何使用)
            -   [代码示例](#代码示例)
            -   [参数说明](#参数说明)
        -   [弹框组件 💘](#弹框组件-)
            -   [如何使用](#如何使用-1)
            -   [代码示例](#代码示例-1)
            -   [参数说明](#参数说明-1)
        -   [动态构造表单 组件 💘](#动态构造表单-组件-)
            -   [如何使用](#如何使用-2)
            -   [代码示例](#代码示例-2)
            -   [具有的能力](#具有的能力)
                -   [自定义表单模板](#自定义表单模板)
                -   [自定义验证脚本](#自定义验证脚本)
                -   [通过自定义脚本实现字段的显示隐藏](#通过自定义脚本实现字段的显示隐藏)
            -   [参数说明](#参数说明-2)
    -   [指令](#指令)
        -   [防抖事件指令 ✈️](#防抖事件指令-️)
            -   [如何使用](#如何使用-3)
            -   [代码示例](#代码示例-3)
            -   [参数说明](#参数说明-3)
        -   [权限指令 ✈️](#权限指令-️)
            -   [如何使用](#如何使用-4)
            -   [代码示例](#代码示例-4)
            -   [参数说明](#参数说明-4)
    -   [拦截器](#拦截器)
        -   [请求缓存拦截器 📍](#请求缓存拦截器-)
            -   [如何使用](#如何使用-5)
            -   [具有的能力](#具有的能力-1)
    -   [工具](#工具)
        -   [缓存装饰器 🚩](#缓存装饰器-)
            -   [如何使用](#如何使用-6)
            -   [代码示例](#代码示例-5)
            -   [参数](#参数)
        -   [下载文件服务 🚩](#下载文件服务-)
            -   [如何使用](#如何使用-7)
            -   [代码示例](#代码示例-6)
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

| 参数               | 说明                               | 类型                          | 默认值 |
| ------------------ | ---------------------------------- | ----------------------------- | ------ |
| [(visible)]        | 是否显示                           | boolean                       | false  |
| [title]            | 弹框标题                           | string \| TemplateRef&lt;any> | -      |
| \*ngxDialogContent | 弹框内容模板                       | TemplateRef                   | -      |
| [full]             | 是否全屏                           | boolean                       | false  |
| [mask]             | 是否展示遮罩                       | boolean                       | false  |
| [dragBoundary]     | 是否启用拖动边界【可视区域内拖动】 | boolean                       | true   |
| [keyboard]         | 是否支持键盘 esc 关闭              | boolean                       | true   |
| [move]             | 是否启用拖拽                       | boolean                       | true   |
| [resize]           | 是否允许拖拽弹层右下角拉伸尺寸     | boolean                       | true   |
| [width]            | 宽度                               | string \| number              | 960    |
| [height]           | 高度                               | string \| number              | 580    |
| [minWidth]         | 最小宽度                           | number                        | 400    |
| [minHeight]        | 最小高度                           | number                        | 200    |
| [top]              | 窗口距离顶部距离                   | string                        | -      |
| [left]             | 窗口距离左边距离                   | string                        | -      |
| [right]            | 窗口距离右边距离                   | string                        | -      |
| [bottom]           | 窗口距离底部距离                   | string                        | -      |

### 动态构造表单 组件 💘

#### 如何使用

```typescript
import { NgxDynamicFormModule } from 'ngx-zorro/dynamic-form';
```

#### 代码示例

```html
<ngx-dynamic-form #dynamicFormElement [fields]="fieldList" [formData]="data"></ngx-dynamic-form>
```

```typescript
@ViewChild('dynamicFormElement') dynamicFormElement!: NgxDynamicFormComponent;
data = { name: 'lucky' };
fieldList = [
    {
        label: '姓名',
        controlName: 'name',
        type: FormItemType.text,
    },
]


setData() {
    ajax().subscribe(() => {
        // 设置值可以通过 [formData] 也可以通过实例的方法传递值或者函数
        // 方法1：
        this.dynamicFormElement.setData({ name: 'lucky' })
        // 方法2：
        this.dynamicFormElement.setData(form => {
            form.patchValue({ name: 'lucky' })
        });
    })
}

submit() {
    const data = this.dynamicFormElement.getData();
    if (data) {
        // 进行数据操作
    }
}
```

#### 具有的能力

##### 自定义表单模板

```html
<ng-template #definedTemplate let-control let-field="field">
    <input nz-input [formControl]="control" [placeholder]="field.placeholder" />
</ng-template>
```

```typescript
@ViewChild('definedTemplate', { static: true }) definedTemplate!: TemplateRef<any>;
fieldList = [
    {
        label: '自定义类型',
        controlName: 'defined',
        type: FormItemType.defined,
        template: this.definedTemplate,
    },
]
```

##### 自定义验证脚本

> 脚本可以是字符串也可以是函数, 错误提示直接 return

```typescript
fieldList = [
    {
        label: '姓名',
        controlName: 'name',
        type: FormItemType.text,
        required: true,
        validatorScript: 'if (control.value) { if (control.value.length < 3 ) { return `长度不够` } }',
    },
    {
        label: '身份证',
        controlName: 'icard',
        type: FormItemType.text,
        required: true,
        validatorScript: (control: AbstractControl, fields: IFormItem[]) => {
            if (control.value) {
                if (control.value.length !== 18) {
                    return '身份证长度不够18位';
                }
            }
            return '';
        },
    },
];
```

##### 通过自定义脚本实现字段的显示隐藏

```typescript
fieldList = [
    {
        label: '曾用名',
        controlName: 'use_name',
        type: FormItemType.text,
        validatorScript: (control: AbstractControl, fields: IFormItem[]) => {
            const use_name_time = fields.find(item => item.controlName === 'use_name_time');
            if (use_name_time) {
                use_name_time.hidden = !control.value;
            }
        },
    },
    {
        label: '曾用名改名时间',
        controlName: 'use_name_time',
        type: FormItemType.text,
    },
];
```

#### 参数说明

| 参数       | 说明         | 类型                                             | 默认值    |
| ---------- | ------------ | ------------------------------------------------ | --------- |
| [fields]   | 字段列表     | IFormItem[]                                      | []        |
| [formData] | 表单的值     | IFormData                                        | undefined |
| [layout]   | 表单布局     | 'vertical' \| 'horizontal' \| 'inline'( 自适应 ) | vertical  |
| [disabled] | 表单是否只读 | boolean                                          | false     |

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

### 请求缓存拦截器 📍

#### 如何使用

```typescript
import { CacheInterceptor } from 'ngx-zorro/interceptors';
providers: [CacheInterceptor],
```

```typescript
const headers = new HttpHeaders({ 'Cache-Map': 'Storage' });
this.http.get(url, { headers }).subscribe();
```

#### 具有的能力

> 把一些结果稳定不变的 GET 请求缓存起来了，缓解请求压力

## 工具

### 缓存装饰器 🚩

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
import { DownFileService } from 'ngx-zorro/utils';
constructor(private downFile: DownFileService) {}

// 必须配合 blob http 拦截器才能使用
import { BlobInterceptor } from 'ngx-zorro/interceptors';
providers: [...BlobInterceptor],
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

| 参数   | 说明                                                                                                                | 类型                    | 默认值 |
| ------ | ------------------------------------------------------------------------------------------------------------------- | ----------------------- | ------ |
| method | 请求类型                                                                                                            | 'get' \| 'post'         | -      |
| url    | 请求地址，url 可以传递自定义文件名；<br />如：api/file/down?fileName=身份证.jpg，文件名则优先使用 url 参数 fileName | string                  | -      |
| params | 请求参数                                                                                                            | **Record**<string, any> | -      |

###
