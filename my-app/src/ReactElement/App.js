import React, { useEffect, useState } from 'react';
import SingleChart from './ChartElement';
import defaultData from '../testingData/data'
import { Curve } from '../service/CurveService';
import Track from '../service/TrackService';
import ControllerMenu from './controllerMenu';
import TrackContainer from '../service/TrackContainer';

const App = () => {
    const [trackList, setTrackList] = useState([]);
    const [curveList, setCurveList] = useState([]);
    const [tableList, setTableList] = useState([]);



    useEffect(() => {
        const curve1 = new Curve(defaultData, "Total Gas");
        const track1 = new Track();
        track1.curveList = [curve1];
        setTrackList([track1]);
        setCurveList([{populatedCurve:curve1}]);
    }, []);


    return (
        <div >
            <TrackContainer trackList={trackList} />
            <ControllerMenu trackList={trackList} setTrackList={setTrackList} tableList = {tableList} setTableList = {setTableList} curveList={curveList} setCurveList={setCurveList}/>
        </div>
    );
}

export default App;
