# ngx-Zorro

[![npm version](https://img.shields.io/npm/v/ngx-zorro/latest.svg)](https://www.npmjs.com/package/ngx-zorro)

ngx-zorro 是一个`angular`的组件库，基于`ng-zorro-antd`开发的一些常用组件

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

### loading 组件

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

### 动态表单构造组件

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

```typescript
fieldList = [
    {
        label: '身份证',
        controlName: 'icard',
        type: FormItemType.text,
        validatorScript: (control: AbstractControl, fields: IFormItem[]) => {
            if (control.value) {
                if (control.value.length !== 18) {
                    return { uncertainty: true, message: '身份证长度不够18位' };
                }
            }
            return {};
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
            return {};
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

| 参数       | 说明     | 类型                                   | 默认值    |
| ---------- | -------- | -------------------------------------- | --------- |
| [fields]   | 字段列表 | IFormItem[]                            | []        |
| [formData] | 表单的值 | IFormData                              | undefined |
| [layout]   | 表单布局 | 'vertical' \| 'horizontal' \| 'inline' | vertical  |

## 指令

### 防抖事件指令

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
