import React from 'react';
import SingleChart from './ChartElement';
import defaultData from '../testingData/data'
import { Curve } from '../service/CurveService';


const App = () => {
const curve1 = new Curve(defaultData, "Total Gas")


return(<div>
    <SingleChart curve = {curve1} />
</div>
);
}

export default App;
