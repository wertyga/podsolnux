const key = 'AIzaSyACURhTIfjvlJumntmEPqDfLYnsOux9nq8';

import './map.sass';

export class Map extends React.Component {
  constructor(props) {
    super(props);

    this.loadString = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`;
  };

  componentDidMount() {
    this.loadJS(this.loadString);
    window.initMap = this.initMap;

    if (window.google) this.initMap()
  };

  componentDidUpdate(prevProps) {
    if(this.props.lat !== prevProps.lat || this.props.lng !== prevProps.lng) {
      this.initMap()
    };
  }

  loadJS = (src) => {
    const mapScript = document.getElementById('map');
    if(!mapScript) {
      const script = window.document.createElement("script");
      script.src = src;
      script.id = 'map';
      script.async = true;
      document.head.appendChild(script);
    };
  }

  initMap = () => {
    const { lat, lng } = this.props
    const pod = { lat, lng };
    const map = new google.maps.Map(this.mainRef, {
      zoom: 17,
      center: pod
    });
    const marker = new google.maps.Marker({
      position: pod,
      map: map
    });
  }

  render() {
    return (
      <div
        className="map"
        ref={node => this.mainRef = node}
      />
    );
  };
}

//API key for Google maps: AIzaSyACURhTIfjvlJumntmEPqDfLYnsOux9nq8
//src string: https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap