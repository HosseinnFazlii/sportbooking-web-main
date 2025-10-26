import { useCallback, useEffect, useState } from 'react';
import { GridFilterModel, GridPaginationModel, GridSortModel, axiosInstance, getURLWithVersion, IServerResponse } from '@mf-core/core-ui';

const emptyValues = ["isEmpty", "isNotEmpty"];

const serverOperator: { [key: string]: string } = {
    "contains": "inc",
    "equals": "eq",
    "startsWith": "sw",
    "endsWith": "ew",
    "isEmpty": "ie",
    "isNotEmpty": "ine",
    "isAnyOf": "iao",
    "is": "eq",
    "not": "not",
    "after": "gt",
    "before": "lt",
    "onOrBefore": "lte",
    "onOrAfter": "gte",
};

export const createDataHookArray = <T>(apiPath: string) => (pagination?: GridPaginationModel, sort?: GridSortModel, filter?: GridFilterModel) => {
    const [data, setData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [reloadIndex, setReloadIndex] = useState<number>(0);

    const fetchData = useCallback(async (_apiPath: string, _pagination?: GridPaginationModel, _sort?: GridSortModel, _filter?: GridFilterModel) => {
        try {
            setIsLoading(true);
            const p = _pagination ? `&offset=${_pagination.page * _pagination.pageSize}&limit=${_pagination.pageSize}` : "";
            const s = _sort ? `&sort=${_sort.map(m => `${m.sort === "asc" ? "+" : "-"}${m.field}`).join(",")}` : "";
            const f = _filter ? `&lo=${_filter.logicOperator || "and"}&${_filter.items.filter(f => !emptyValues.includes(f.operator) && f.value !== undefined).map(i => `${i.field}:${serverOperator[i.operator]}=${(i.operator === "isAnyOf" ? i.value.join(",") : i.value) || ""}`).join("&")}` : "";
            const url = `${getURLWithVersion(_apiPath)}${p}${s}${f}`;

            const { data: response } = await axiosInstance.get<T[]>(url);
            setData(response);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchData(apiPath, pagination, sort, filter);
    }, [pagination?.page, pagination?.pageSize, sort, filter, reloadIndex]);

    return { isLoading, items: data, reload: async () => await setReloadIndex((index) => index + 1) };
};

export const createDataHook = <T>(apiPath: string) => (pagination?: GridPaginationModel, sort?: GridSortModel, filter?: GridFilterModel, urlParams?: string[]) => {
    const [data, setData] = useState<IServerResponse<T>>({ data: [], count: 0 });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [reloadIndex, setReloadIndex] = useState<number>(0);

    const fetchData = useCallback(async (_apiPath: string, _pagination?: GridPaginationModel, _sort?: GridSortModel, _filter?: GridFilterModel, returnData?: boolean) => {
        try {
            setIsLoading(true);
            const p = _pagination ? `&offset=${_pagination.page * _pagination.pageSize}&limit=${_pagination.pageSize}` : "";
            const s = _sort ? `&sort=${_sort.map(m => `${m.sort === "asc" ? "+" : "-"}${m.field}`).join(",")}` : "";
            const f = _filter ? `&lo=${_filter.logicOperator || "and"}&${_filter.items.filter(f => !emptyValues.includes(f.operator) && f.value !== undefined).map(i => `${i.field}:${serverOperator[i.operator]}=${(i.operator === "isAnyOf" ? i.value.join(",") : i.value) || ""}`).join("&")}` : "";
            const url = getURLWithVersion(`${_apiPath}${urlParams && urlParams.length > 0 ? "/" + urlParams.join("/") : ""}`) + `${p}${s}${f}`;

            const { data: response } = await axiosInstance.get<IServerResponse<T>>(url);

            if (returnData) {
                setIsLoading(false);

                return response?.data;
            }

            if (response && response.data && response.data.length > 0) {
                setData({ count: response.count, data: [...response.data] });
            } else {
                setData({ count: 0, data: [] });
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const updateServerData = useCallback((_apiPath: string) => async (_id: number | string, serverData: Partial<T>) => {
        try {
            setIsLoading(true);
            const url = getURLWithVersion(`${_apiPath}${_id ? `/${_id}` : ""}`);
            const { data: response } =
                _id ?
                    await axiosInstance.put(url, serverData) :
                    await axiosInstance.post(url, serverData);
            setIsLoading(false);
            return response;
        } catch (error) {
            console.error(error);
        }
    }, []);

    const deleteRecord = useCallback((_apiPath: string) => async (id: string | number) => {
        try {
            setIsLoading(true);
            const url = getURLWithVersion(`${_apiPath}/${id}`);
            const { data: response } = await axiosInstance.delete(url);
            setIsLoading(false);
            return response;
        } catch (error) {
            console.error(error);
        }
    }, []);

    const fetchAllData = useCallback(
        () => fetchData(
            apiPath,
            { page: 0, pageSize: Number.MAX_SAFE_INTEGER },
            sort,
            filter,
            true
        ),
        [apiPath, sort, filter, fetchData]
    );

    useEffect(() => {
        fetchData(apiPath, pagination, sort, filter);
    }, [pagination, pagination?.page, pagination?.pageSize, sort, filter, reloadIndex, fetchData]);

    return {
        isLoading,
        items: data,
        reload: async () => await setReloadIndex((index) => index + 1),
        deleteRecord: deleteRecord(apiPath),
        updateServerData: updateServerData(apiPath),
        fetchAllData,
    };
};

export interface IDataHookById<T> {
    isLoading: boolean;
    originalItem: T;
    item: T;
    clearData: () => Promise<void>;
    resetToOriginal: () => Promise<void>;
    updateOriginalData: (newData: T) => Promise<void>;
    updateLocalData: (newData?: Partial<T>) => Promise<void>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateServerData: (serverData: Partial<T>) => Promise<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateCustomServerData: (serverData: any, apiPath?: string) => Promise<any>;
    addListenerServerUpdate: (handle: () => void) => number;
    reload: () => Promise<void>;
}
export const createDataHookById = <T>(apiPath: string, defaultValue: T) => (id?: number): IDataHookById<T> => {
    const [data, setData] = useState<T>(defaultValue);
    const [originalData, setOriginalData] = useState<T>(defaultValue);
    const [listeners, setListeners] = useState<Array<() => void>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [reloadIndex, setReloadIndex] = useState<number>(0);

    const callListeners = useCallback(() => {
        listeners.forEach(f => f());
    }, [listeners]);

    const fetchData = useCallback(async (_apiPath: string, _id: number) => {
        try {
            setIsLoading(true);
            const url = getURLWithVersion(`${_apiPath}/${_id}`);

            const { data: response } = await axiosInstance.get<T>(url);
            // console.log(response);
            setData(response);
            setOriginalData(response);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const updateServerData = useCallback((_apiPath: string, _id?: number) => async (serverData: Partial<T>) => {
        try {
            setIsLoading(true);
            const url = getURLWithVersion(`${_apiPath}${_id ? `/${_id}` : ""}`);
            const { data: response } =
                _id ?
                    await axiosInstance.put(url, serverData) :
                    await axiosInstance.post(url, serverData);
            setOriginalData(oData => ({ ...oData, ...serverData }));
            setIsLoading(false);
            callListeners();
            return response;
        } catch (error) {
            console.error(error);
        }
    }, [callListeners]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateCustomServerData = useCallback((_apiPath: string, _id?: number) => async (serverData: any, newApiPath?: string) => {
        try {
            setIsLoading(true);
            const url = getURLWithVersion(`${newApiPath || _apiPath}${_id ? `/${_id}` : ""}`);
            const { data: response } =
                _id ?
                    await axiosInstance.put(url, serverData) :
                    await axiosInstance.post(url, serverData);
            setOriginalData(oData => ({ ...oData, ...serverData }));
            setIsLoading(false);
            callListeners();
            return response;
        } catch (error) {
            console.error(error);
        }
    }, [callListeners]);

    const clearData = async () => {
        return setData(defaultValue);
    }

    useEffect(() => {
        if (id !== undefined && !isNaN(id)) {
            fetchData(apiPath, id);
        } else {
            setIsLoading(false);
        }
    }, [reloadIndex, id, fetchData]);

    const addListenerServerUpdate = useCallback((listener: () => void) => {
        const newListeners = [
            ...listeners,
            listener
        ];
        setListeners(newListeners);

        return newListeners.length;
    }, [listeners]);

    return {
        isLoading,
        item: data,
        originalItem: originalData,
        updateOriginalData: async (newData: T) => await setOriginalData(newData),
        clearData,
        updateLocalData: async (newData?: Partial<T>) => await setData(oldData => ({ ...oldData, ...newData })),
        updateServerData: updateServerData(apiPath, id),
        updateCustomServerData: updateCustomServerData(apiPath, id),
        resetToOriginal: async () => { await setData(originalData); },
        reload: async () => await setReloadIndex((index) => index + 1),
        addListenerServerUpdate
    };
};

export const createSingleDataHook = <T>(apiPath: string, defaultValue: T) => () => {
    const [data, setData] = useState<T>(defaultValue);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [reloadIndex, setReloadIndex] = useState<number>(0);

    const fetchData = useCallback(async (_apiPath: string) => {
        try {
            setIsLoading(true);
            const url = getURLWithVersion(`${_apiPath}`);

            const { data: response } = await axiosInstance.get<T>(url);
            // console.log(response);
            setData(response);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchData(apiPath);
    }, [reloadIndex, fetchData]);

    return { isLoading, item: data, reload: async () => await setReloadIndex((index) => index + 1) };
};
