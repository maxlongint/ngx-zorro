import { AbstractControl, FormControl } from '@angular/forms';
import { InjectionToken, Injector, Type } from '@angular/core';
import { FormControlType } from './form-control-type';

export const FORM_FIELD_CONFIG = new InjectionToken<FormFieldConfig[]>('FORM_FIELD_CONFIG');

export interface FormFieldConfig<Props = FormFieldProps & { [key: string]: any }> {
    /**
     * 类型
     */
    type: string;
    /**
     * 字段名
     */
    key: string;
    /**
     * 用于 trackBy 的编码
     */
    id?: string;
    /**
     * 标签名称
     */
    label?: string;
    /**
     * 是否必填
     */
    required?: boolean;
    /**
     * 为空时显示的提示信息
     */
    placeholder?: string;
    /**
     * 是否只读
     */
    disabled?: boolean;
    /**
     * 是否隐藏
     */
    hidden?: boolean;
    /**
     * 标签样式 NgStyle
     */
    labelStyle?: { [styleKeyName: string]: any };
    /**
     * 录入框样式 NgStyle
     */
    inputStyle?: { [styleKeyName: string]: any };
    /**
     * 对应组件
     */
    component?: Type<FormControlType>;
    injector?: Injector;
    /**
     * 对应的
     */
    formControl?: FormControl;
    /**
     * 验证器
     */
    validatorScript?: ValidatorScript;
    /**
     * 特定模板属性
     */
    props?: Props;
}

export interface FormFieldProps {
    max?: number;
    min?: number;
    mode?: 'date' | 'week' | 'month' | 'year';
    rows?: number;
}

export type ValidatorScript = string | ValidatorScriptFn;
export type ValidatorScriptFn = (control: AbstractControl, fields: FormFieldConfig[]) => string | void;

export type FormFieldConfigs = FormFieldConfig[];
