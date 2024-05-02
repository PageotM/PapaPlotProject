import Chart from 'chart.js/auto';
import SingleChart from './ChartElement';

const App = () => {
return(
    <div style={{ display: 'flex' }}>
      <SingleChart/>
      <SingleChart/>
      <SingleChart/>
    </div>
  );
}

export default App;
