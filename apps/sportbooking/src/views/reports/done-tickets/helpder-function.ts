import { format } from "@mf-core/core-ui";
import { ITicketReport } from "@mf-core/sportbooking-core";

export const groupBy = (data: ITicketReport[], fieldId: keyof ITicketReport): { [key: string]: Array<ITicketReport> } => {
    return data.reduce((a, c) => {
        const field = c[fieldId] as number;

        if (!a[field]) {
            a[field] = [];
        }
        a[field].push(c);
        return a;
    }, {} as { [key: number]: Array<ITicketReport> });
}

export const groupByToArray = (data: ITicketReport[], fieldId: keyof ITicketReport) => {
    const grouped = groupBy(data, fieldId);
    return Object.keys(grouped).map((key) => ({
        fieldId: parseInt(String(key)),
        items: grouped[key]
    }))
}
export const getSum = (data: ITicketReport[], fieldId: keyof ITicketReport) => {
    return data.reduce((a, c) => a += c[fieldId] as number || 0, 0);
}

export const formatDate = (value: Date) => {
    return format(new Date(value), "yyyy-MM-dd");
}

export const groupBySumHours = (data: ITicketReport[], fieldId: keyof ITicketReport) => {
    const grouped = groupByToArray(data, fieldId);
    return grouped.map((child) => ({
        fieldId: child.fieldId,
        count: child.items.length,
        sumServiceType1: getSum(child.items, "serviceType1"),
        sumServiceType2: getSum(child.items, "serviceType2"),
        sumServiceType3: getSum(child.items, "serviceType3"),
        sumServiceType4: getSum(child.items, "serviceType4"),
        sumServiceType5: getSum(child.items, "serviceType5"),
        sumServiceType6: getSum(child.items, "serviceType6"),
        sumServiceType7: getSum(child.items, "serviceType7"),
        sumServiceType8: getSum(child.items, "serviceType8"),
    }))
}
