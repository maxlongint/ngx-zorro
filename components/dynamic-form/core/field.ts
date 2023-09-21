import { AbstractControl, FormControl } from '@angular/forms';
import { InjectionToken, Injector, Type } from '@angular/core';
import { FormControlType } from './form-control-type';

export const FORM_FIELD_CONFIG = new InjectionToken<FormFieldConfig[]>('FORM_FIELD_CONFIG');

export const FORM_DATA = new InjectionToken<Record<string, any>>('FORM_DATA');

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
     * 验证脚本
     */
    verifyScript?: VerifyScript;
    /**
     * 触发脚本
     */
    triggerScript?: TriggerScript;
    /**
     * 特定模板属性
     */
    props?: Props;
}

export interface FormFieldProps {}

export interface VerifyScriptError {
    uncertainty: boolean;
    message: string;
}

export type VerifyScript = string | VerifyScriptFn;
export type VerifyScriptFn<Props = FormFieldProps & { [key: string]: any }> = (
    control: AbstractControl,
    fields: FormFieldConfig<Props>[],
) => VerifyScriptError;

export type TriggerScript = string | TriggerScriptFn;
export type TriggerScriptFn<Props = FormFieldProps & { [key: string]: any }> = (
    control: AbstractControl,
    fields: FormFieldConfig<Props>[],
) => void;

export type FormFieldConfigs = FormFieldConfig[];
