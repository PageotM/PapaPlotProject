  class Track{
    curveList = []
    get trackSpec(){
        const datasets = [];
        let scalesSpec = {
            "x-axis-main": {
              type: 'linear',
              position: 'top'
            },
            y: {
              type: 'linear',
              position: 'left',
              grid: {
                drawOnChartArea: true,
              }
            }
          }
        for(const curve of this.curveList){
            datasets.push(curve.datasetSpec);
            if (!curve.useChartXAxis){
                scalesSpec = {...scalesSpec, ...curve.axisSpec};
            }
        }
        const specs = {
            type: 'line',
            maintainAspectRatio: false,
            data: {
              datasets: datasets
            },
            options:{
              aspectRatio:0.5,
              scales: scalesSpec
              }
            }
        return (specs);
    }

  }

  export default Track;