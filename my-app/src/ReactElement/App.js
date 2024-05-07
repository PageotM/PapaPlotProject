import React from 'react';
import SingleChart from './ChartElement';
import defaultData from '../testingData/data'
import { Curve } from '../service/CurveService';
import Track from '../service/TrackService';

const App = () => {
const curve1 = new Curve(defaultData, "Total Gas")
const Track1 = new Track();
Track1.curveList = [curve1];



return(<div>
    <SingleChart track = {Track1} />
</div>
);
}

export default App;
