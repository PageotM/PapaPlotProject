import React from 'react';
import SingleChart from './ChartElement';
import defaultData from '../testingData/data'


const App = () => {
return(<div>
    <SingleChart data = {defaultData} field = {"Total Gas"}/>
</div>
);
}

export default App;
