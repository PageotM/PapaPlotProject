import Track from "./TrackService";

class Controller {

    static selectedFile = null;
    static dataTableList = [];
    static curveList = [];
    static trackList = [];
    
    static parseCSVFromFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const fileContent = reader.result;
                const parsedData = Controller._parseCSVContent(fileContent);
                resolve(parsedData);
            };
            reader.onerror = () => {
                reject(reader.error);
            };
            reader.readAsText(file);
        });
    }

    static _parseCSVContent(fileContent) {
        const lines = fileContent.trim().split('\n');
        const headers = lines[0].split(',');

        const data = [];
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = values[j];
            }
            data.push(obj);
        }
        return data;
    }
    static addTable(data, dataTableName) {
        const numericData = data.filter(row => {
            return Object.values(row).every(value => !isNaN(parseFloat(value)));
        });
        const tableDataObject = {};
        tableDataObject[dataTableName] = numericData;
    
        Controller.dataTableList.push(tableDataObject);
        console.log(Controller.dataTableList);
    }
}


export default Controller;