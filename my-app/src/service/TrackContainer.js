import SingleChart from "../ReactElement/ChartElement"

const TrackContainer = ({ trackList }) => {
    return (
      <div className = "multipleTrackContainer">
        {trackList.map((item, index) => (
          <SingleChart key={index} track={item} />
        ))}
      </div>
    );
  };
  export default TrackContainer;