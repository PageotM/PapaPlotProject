import Controller from "../service/ControllerService";
import Track from "../service/TrackService";

function selectFile(event) {
    Controller.selectedFile = event.target.files[0];
}
async function getTableFromFile() {
    if (!Controller.selectedFile) return;

    const parsedData = await Controller.parseCSVFromFile(Controller.selectedFile)
    return Controller.formatData(parsedData, document.getElementById("tableNameInput" ).value);


}
const ControllerMenu = ({ trackList, setTrackList , tableList, setTableList}) => {
    return (
        <div id="menuController">
            <ul>
                <li>
                    <input onChange={selectFile} type="file" accept=".csv" />
                    <input id="tableNameInput" type="text"></input>
                    <button onClick={async () => {
                        const newTable = await getTableFromFile();
                        console.log(newTable);
                        setTableList([...tableList, newTable]);
                        console.log(tableList);}
                    }>Read File</button>
                </li>
                <li>
                    <button onClick={() => 
                        setTrackList([...trackList, new Track()])}>Add Track</button>
                </li>
                <li>
                    <select>
                        {Controller.trackList.map((track,index) => (
                <option key={index}>{track}</option>
                        ))}                    
                </select>
                    <select>
                        <option></option>
                    </select>
                    <select>
                        <option></option>
                    </select>

                    <button>Add Curve</button>

                </li>
                <li>
                    <select>
                        <option value="track">Track</option>
                    </select>
                    <select>
                        <option value="curve">Curve</option>
                    </select>
                    <button>Add Curve to Track</button>
                </li>
            </ul>
        </div>
    );
}

export default ControllerMenu;
