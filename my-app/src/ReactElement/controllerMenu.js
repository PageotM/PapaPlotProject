import Controller from "../service/ControllerService";
import Track from "../service/TrackService";

function selectFile(event) {
    Controller.selectedFile = event.target.files[0];
}
function addSelectedFile() {
    if (!Controller.selectedFile) return;

    Controller.parseCSVFromFile(Controller.selectedFile)
        .then(parsedData => {
            // Do something with the parsed data
            Controller.addTable(parsedData, "default Name");
        })
        .catch(error => {
            console.error('Error parsing CSV file:', error);
        });

}
const ControllerMenu = ({ trackList, setTrackList }) => {
    return (
        <div id="menuController">
            <ul>
                <li>
                    <input onChange={selectFile} type="file" accept=".csv" />
                    <button onClick={addSelectedFile}>Read File</button>
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
