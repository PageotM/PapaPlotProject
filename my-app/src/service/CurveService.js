class Curve{
    useChartXAxis = true;
    xField;
    yField;
    dataSet;
    label;
    constructor(dataSet, xField, yField = "MD", label = ""){
        this.useChartXAxis = true
        if (label !== ""){
            this.label = label;
        }
        else{
            this.label = xField;
        }
        this.xField = xField;
        this.yField = yField;
       // console.log(xField)
        //console.log(dataSet[0]);

       // console.log(dataSet[0]["Total Gas"]);
       //TODO: THIS WILL NOT WORK IF LAST CHARACTER OF XFIELD IS A WHITESPACE FOR SOME FUCKING REASON
        this.dataSet = dataSet.map(row =>  ({y : row[yField],
                                             x : row[xField]
                                            }))
    }

    toggleUseXAxis(){
        this.toggleUseXAxis = !this.toggleUseXAxis
    }
    get axisName(){
        return ("x-axis-" +  (this.useChartXAxis ? "main" : this.label));
    }
    get datasetSpec(){
        const dataSetSpec = {
            label: this.label,
            data: this.dataSet.map(row => ({ y: row.y, x: row.x })), /////yeesh that is steeep, TODO: cache
            xAxisID: this.axisName
          };
        return (dataSetSpec);
    }
    get axisSpec(){
        const axisSpec = {};
        axisSpec[this.axisName] = {
            type: 'linear',
            position: 'top',
            grid: {
            drawOnChartArea: false,
            }
        }
        return(axisSpec); 
    }
}
export {Curve}