import {Col, Row} from "antd";
import React from "react";

export default class AppMethods {

    static serialize(model:any, keys:string[]){
        let ret:any = {};

        keys.forEach(key => {
            if (model.hasOwnProperty(key)) ret[key] = model[key];
        });

        return ret;
    }

    static getGrid<T>(items:T[], numColumns:2|3|4|6|8|12, render:(item:T)=>any, gutter = 16){
        let remainder = items.length % numColumns;
        let numRows = ((items.length - remainder) / numColumns);
        if (remainder > 0) numRows += 1;
        let rows = [];

        //antd grid (or any grid for that matter) uses a 24 point grid system
        let span = 24 / numColumns;

        for (let i = 0; i < numRows; i++) {
            let columns = [];
            for (let j = 0; j < numColumns; j++) {
                let index = (i * numColumns) + j;

                //If we're on the last row, and j index is greater than what's left for that row:
                if (i === numRows && j > remainder - 1 && i !== 0) continue;
                let item = items[index];
                if (item){
                    let renderedItem = render(item);
                    if (renderedItem) columns.push(<Col key={j} span={span}>{renderedItem}</Col>)
                }
            }
            rows.push(<Row key={i} gutter={gutter}>{columns}</Row>)
        }
        return rows;
    }

    static mapIsEmpty<T, TItem>(map:Map<T, TItem>){
        if (!map) return true;
        else return [...map.values()].length === 0;
    }

}