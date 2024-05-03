class Curve{
    useChartXAxis = true;

    private dataSet;
    private label;
    constructor(dataSet, xField, yField = "MD", label = ""){
        if (label != ""){
            this.label = label;
        }
        else{
            this.label = xField;
        }
        this.xField = xField
        this.dataSet = dataSet.map(row => {"yField" : row[yField], "xField" : row[xField]})
    }

    toggleUseXAxis(){
        this.toggleUseXAxis = !this.toggleUseXAxis
    }
    get axisName(){
        return "x-axis-" +  this.useChartXAxis ? "main" : this.label;
    }
    getDataSetSpec(){

        return ({
            label: this.label,
            data: this.dataSet.map(row => ({ y: row["yField"], x: row["xField"] })),
            xAxisID: this.axisName
          })
    }
    getAxisSpec(){
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