class Curve{
    useChartXAxis = true;
    private dataSet;
    private xField;
    constructor(dataSet, xField, yField = "MD"){
        this.xField = xField
        this.dataSet = dataSet.map(row => {yField : row[yField], xField : row[xField]})
    }

    toggleUseXAxis(){
        this.toggleUseXAxis = !this.toggleUseXAxis
    }
    getDataSetSpec(){
        
    }
}
export {Curve}