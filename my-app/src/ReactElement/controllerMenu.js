import DataReader from "../service/DataReaderService";
import Track from "../service/TrackService";
import { useState } from "react";
import { Curve } from "../service/CurveService";

function selectFile(event) {
    DataReader.selectedFile = event.target.files[0];
}
async function getTableFromFile() {
    if (!DataReader.selectedFile) return;

    const parsedData = await DataReader.parseCSVFromFile(DataReader.selectedFile)
    return DataReader.formatData(parsedData, document.getElementById("tableNameInput" ).value);


}
const ControllerMenu = ({ trackList, setTrackList , tableList, setTableList, curveList, setCurveList}) => {
    const [selectedTable, setSelectedTable] = useState(null);
    const [selectedTableKeys, setSelectedTableKeys] = useState([]);

    const handleTableChange = (event) => {
        const selectedTableString = event.target.value;
        const selectedTableObj = JSON.parse(selectedTableString);
        setSelectedTable(selectedTableObj);
        setSelectedTableKeys(Object.keys(Object.values(selectedTableObj)[0][0])); //C'est moche? oui, mais c'est pas toi qui décide.
    };
    const createNewCurve = () => {
        const param = document.getElementById("curveCreationParamSelect").value;
        const table = Object.values(selectedTable)[0];
        const name = document.getElementById("curveCreationNameSelect").value;
        console.log(param);
        const newCurve = new Curve(table, param);
        console.log(newCurve);
        const newItem = {};
        newItem[name] = newCurve
        setCurveList([...curveList, newItem]);
    }

    const assignCurve = () => {
    
        const curve = curveList[document.getElementById("curveAssignCurveSelect").value];
        const newTrackList = trackList;
        const track = newTrackList[document.getElementById("curveAssignTrackSelect").value];
        track.curveList.push(Object.values(curve)[0]);
        setTrackList([...newTrackList]);


        console.log("------")
    }
    const createNewTable = async () => {
        const newTable = await getTableFromFile();
        setTableList([...tableList, newTable]);
        console.log(tableList.length);
        if (tableList.length === 0){
            console.log(newTable);
            const selectedTableString = JSON.stringify(newTable);
            const selectedTableObj = JSON.parse(selectedTableString);
            setSelectedTable(selectedTableObj);
            setSelectedTableKeys(Object.keys(Object.values(selectedTableObj)[0][0])); //C'est moche? oui, mais c'est pas toi qui décide.
    
        }
    }
    const lemmeSee = () => {
        console.log(trackList);

        console.log(curveList);

        console.log(tableList);
    }

    return (
        <div id="menuController">
            <ul>
                <li>
                    <input onChange={selectFile} type="file" accept=".csv" />
                    <input id="tableNameInput" type="text"></input>
                    <button onClick={createNewTable}>Read File</button>
                </li>
                <li>
                    <button onClick={() => 
                        setTrackList([...trackList, new Track()])}>Add Track</button>
                </li>
                <li>
                    <select onChange={handleTableChange} id ="curveCreationTableSelect">
                    {tableList.map((table, index) => (
                            <option key={index} value={JSON.stringify(table)}>{Object.keys(table)[0]}</option>
                        ))}
                    </select>

                    <select id ="curveCreationParamSelect">
                        {selectedTableKeys.map((key, index) => (
                            <option key={index}>{key}</option>
                        ))}
                    </select>
                    <input type = "text" id = "curveCreationNameSelect"></input>
                    <button onClick={createNewCurve}>Create Curve</button>

                </li>
                <li>
                    <select id = "curveAssignCurveSelect">
                    {curveList.map((curve, index) => (
                            <option key={index} value={index}>{Object.keys(curve)[0]}</option>
                        ))}
                    </select>
                    <select id = "curveAssignTrackSelect">
                    {trackList.map((track, index) => (
                            <option key={index} value={index}>{index}</option>
                        ))}
                    </select>
                    <button onClick={assignCurve}>associate curve to Track</button>
                </li>
            </ul>
            <button onClick={lemmeSee}>GET STATUS</button>

        </div>
    );
}

export default ControllerMenu;
