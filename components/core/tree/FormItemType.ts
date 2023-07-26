/**
 * 字段显示类型
 */
export enum FormItemType {
    /**
     * 文本
     */
    text = 'text',
    /**
     * 数字型
     */
    number = 'number',
    /**
     * 时间日期
     */
    date = 'date',
    /**
     * 单选
     */
    radio = 'radio',
    /**
     * 多选
     */
    checkbox = 'checkbox',
    /**
     * 下拉框
     */
    select = 'select',
    /**
     * 备注
     */
    textarea = 'textarea',
    /**
     * 自定义类型
     */
    defined = 'defined',
}
