import { AbstractControl, FormArray, FormControl } from '@angular/forms';
import { FormItemType } from './FormItemType';
import { TemplateRef } from '@angular/core';

/**
 * 表单项配置信息
 */
export type IFormItem =
    | IFormItemText
    | IFormItemNumber
    | IFormItemDate
    | IFormItemRadio
    | IFormItemCheckbox
    | IFormItemSelect
    | IFormItemTextarea
    | IFormItemDefined;

/**
 * 表单项基础配置信息
 */
export interface IFormItemBase {
    /**
     * 用于ngFor的trackBy属性
     */
    id?: string;
    /**
     * 字段名称
     */
    label?: string;
    /**
     * 字段编码
     */
    controlName: string;
    /**
     * 是否必填
     */
    required?: boolean;
    /**
     * 字段类型
     */
    type: FormItemType;
    /**
     * 当前表单项没有值时的提示信息
     */
    placeholder?: string;
    /**
     * 默认值
     */
    defaultValue?: any;
    /**
     * 是否只读
     */
    disabled?: boolean;
    /**
     * 是否隐藏
     */
    hidden?: boolean;
    /**
     * 自定义验证器；可以是函数或字符串
     * 返回值示例：return { uncertainty: true, message: '提示内容' }
     */
    validatorScript?: ValidatorScript;
}

/**
 * 自定义验证器类型
 */
export type ValidatorScript = string | ValidatorScriptFn;

/**
 * 自定义验证器错误返回值类型
 */
export interface ValidatorError {
    uncertainty?: boolean;
    message?: string;
}

/**
 * 自定义验证器函数约束类型
 */
export type ValidatorScriptFn = (control: AbstractControl, fields: IFormItem[]) => ValidatorError;

/**
 * 文本类型字段相关配置
 */
export interface IFormItemText extends IFormItemBase {
    /**
     * 字段类型 text
     */
    type: FormItemType.text;
}

/**
 * 数字类型字段相关配置
 */
export interface IFormItemNumber extends IFormItemBase {
    /**
     * 字段类型 number
     */
    type: FormItemType.number;
    /**
     * 最大值
     */
    max?: number;
    /**
     * 最小值
     */
    min?: number;
}

/**
 * 日期类型字段相关配置
 */
export interface IFormItemDate extends IFormItemBase {
    /**
     * 字段类型 date
     */
    type: FormItemType.date;
    /**
     * 显示格式
     */
    formatText?: string;
    /**
     * 结果格式
     */
    formatValue?: string;
    /**
     * 显示模式
     */
    mode?: 'date' | 'month' | 'year';
}

/**
 * 录入框选项属性
 * select, checkbox, radio等选项
 */
export interface IFormItemOption {
    /**
     * 项名称
     */
    label: string;
    /**
     * 值
     */
    value: any;
    /**
     * 项对应的FormControl
     */
    control?: FormControl;
}

/**
 * 单选类型字段相关配置
 */
export interface IFormItemRadio extends IFormItemBase {
    /**
     * 字段类型 radio
     */
    type: FormItemType.radio;
    /**
     * 配置项
     */
    options: Array<IFormItemOption>;
}

/**
 * 多选类型字段相关配置
 */
export interface IFormItemCheckbox extends IFormItemBase {
    /**
     * 字段类型 checkbox
     */
    type: FormItemType.checkbox;
    /**
     * 配置项
     */
    options: Array<IFormItemOption>;
    /**
     * 配置项对应表单构造器FormArray
     */
    controlArray?: FormArray;
}

/**
 * 多选类型字段相关配置
 */
export interface IFormItemSelect extends IFormItemBase {
    /**
     * 字段类型 select
     */
    type: FormItemType.select;
    /**
     * 配置项
     */
    options: Array<IFormItemOption>;
    /**
     * 支持清除按钮
     */
    allowClear?: boolean;
    /**
     * 是否支持搜索
     */
    showSearch?: boolean;
}

/**
 * 下拉选项类型字段相关配置
 */
export interface IFormItemTextarea extends IFormItemBase {
    /**
     * 字段类型 textarea
     */
    type: FormItemType.textarea;
    /**
     * 占据行数（默认4行）
     */
    rows?: number;
}

/**
 * 自定义字段类型字段相关配置
 */
export interface IFormItemDefined extends IFormItemBase {
    /**
     * 字段类型自定义 defined
     */
    type: FormItemType.defined;
    /**
     * 自定义类型字段模板
     * 注：要保证Template模板加载完成才能赋值给template字段
     */
    template: TemplateRef<any>;
}
