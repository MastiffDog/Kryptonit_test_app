//логика приведения полей таблицы к читабельному виду (поле дата, поле status)

import { type createdItem } from "@/Types/createdItem";
import { type formattedItem } from "@/Types/formattedItem";
import format from 'date-fns/format';

export const formatTableFields = (tableList: createdItem[]) => {
    const formattedList : formattedItem[] = [];
    tableList.forEach(item => {
        const created: string = format(item.created, 'MM/dd/yyyy');
        let status: string = "";
        item.status ? status = "Доступен" : status = "Не доступен";
        formattedList.push({
            id: item.id,
            name: item.name,
            created: created,
            count: item.count,
            status: status
        })
    })

    return formattedList;
}