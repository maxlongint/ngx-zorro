/**
 * 缓存类别
 */
export declare type StorageEngine = Storage;
/**
 * 缓存配置信息
 */
export interface StoreOptions {
    /**
     * 存储的key
     */
    key?: string;
    /**
     * 过期时间
     */
    expires?: number;
}

let prefix: string = 'NGX_ZORRO';

// 辅助函数用于设置前缀
export function setStorePrefix(newPrefix: string) {
    prefix = newPrefix;
}

/**
 * 存储在缓存
 * @param storage Storage类型 默认:sessionStorage
 * @param options 配置信息
 * @returns
 */
export function Store<T>(storage: StorageEngine = sessionStorage, options?: StoreOptions) {
    return function (target: any, name: string) {
        const { key, expires } = options || {};
        const storageKey = `@${prefix}_${key || name}`.toLocaleUpperCase();

        // getter function
        const getter = function () {
            const storedValue = storage.getItem(storageKey);
            if (storedValue) {
                const { data, expiry } = JSON.parse(storedValue);
                if (!expiry || expiry > Date.now()) {
                    return data as T;
                } else {
                    storage.removeItem(storageKey);
                }
            }
            return null;
        };

        // setter function
        const setter = function (newVal: any) {
            if (!target.hasOwnProperty('_isFirstTime')) {
                // 如果标记属性不存在，说明是第一次设置值
                target._isFirstTime = true;
                if (storage.getItem(storageKey)) {
                    return;
                }
            }
            if (newVal !== null && newVal !== undefined) {
                const valueToStore = JSON.stringify({
                    data: newVal,
                    expiry: expires ? Date.now() + expires : null,
                });
                storage.setItem(storageKey, valueToStore);
            } else {
                storage.removeItem(storageKey);
            }
        };

        // replace the property with a getter/setter
        Object.defineProperty(target, name, {
            get: getter,
            set: setter,
        });
    };
}
