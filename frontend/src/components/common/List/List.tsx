import React, { FunctionComponent } from 'react';
import './styles.scss';

interface Props {
    initialDescription?:string|React.ReactChild,
    points:any[],
    ordered?:boolean
}

const List:FunctionComponent<Props> = (props:Props) => {

    const {initialDescription, points, ordered} = props;

    const getListPoints = () => {
        return points.map((point, i) => <li key={i}>{point}</li>)
    };

    const getList = () => {
        if (ordered) return <ol>{getListPoints()}</ol>;
        else return <ul>{getListPoints()}</ul>;
    };

    return (
        <div className='list-component'>
            {initialDescription}
            {getList()}
        </div>
    )
};

export default List;