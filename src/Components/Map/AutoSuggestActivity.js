import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  ActivityIndicator,
  Button
} from 'react-native';
import MapmyIndiaGL from 'mapmyindia-map-react-native-beta';
import Mapmyindia from 'mapmyindia-restapi-react-native-beta';
import {point} from '@turf/helpers';
import exampleIcon from '../../assets/marker.png';
import Toast from 'react-native-simple-toast';

const styles = {
  icon: {
    iconImage: exampleIcon,
    iconAllowOverlap: true,
    iconSize: 0.2,
    iconAnchor:"bottom"
  },
};

class AutoSuggestActivity extends Component {
  constructor(props) {
    super(props);
    this.timeout = 0;
    this.state = {
      query: '',
      placesList: '',
      selectedPlace: '',
      progressBar: false,
      mapFlex: 1,
      mounted: false,
      eLoc:'AP5G6Q',
      formattedAddress:''
    };
  }

  componentDidMount() {
    this.setState({
      mounted: true,
    });
  }

  //api call for auto suggest
  callAutoSuggest(text) {
    if (text.length > 2) {
      let arr = [];
      Mapmyindia.atlas_auto({query: text}, response => {
       
        if (this.state.mounted) {
           console.log(response);
          if (
            response.suggestedLocations != undefined &&
            response.suggestedLocations.length > 0
          ) {
            for (let i = 0; i < response.suggestedLocations.length; i++) {
              arr.push([
                response.suggestedLocations[i].placeName,
                response.suggestedLocations[i].eLoc,
                // [
                //   response.suggestedLocations[i].longitude,
                //   response.suggestedLocations[i].latitude,
                // ],
                response.suggestedLocations[i].placeAddress,
              ]);
            }
            this.setState({
              placesList: arr,
              progressBar: false,
              mapFlex: 0,
            });
          } else {
            Toast.show('No suggestions found', Toast.SHORT);
            this.setState({
              progressBar: false,
            });
          }
        }

        console.log(this.state.placesList);
      });
    } else if (text.length <= 2) {
      this.setState({
        placesList: '',
        progressBar: false,
        mapFlex: 1,
      });
    }
  }

  componentWillUnmount() {
    this.setState({
      mounted: true,
    });
    clearTimeout(this.timeout);
  }

  //on InputBox text changing
  onTextChange(text) {
    this.setState({
      query: text,
      progressBar: true,
    });

    //api method  called only when user will stop typing for two second
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
     // console.log('calling');
      this.callAutoSuggest(text.trim());
    }, 2000);
  }

  //onList item selection
  onPress(location) {
   // this.camera.moveTo(location, 1000);
   console.log('loca : '+location);
   this.camera.flyWithEloc(location[1],1000);

    this.setState({
      //selectedPlace: [location[0], location[1]],
      placesList: '',
      mapFlex: 1,
     // selectedPlaceEloc:'',
      eLoc:location[1],
      formattedAddress:location[0]+" "+location[2]
    });
  }

  onConfirm()
  {
    //this.props.changeFromAddress(this.state.formattedAddress);
     if( this.state.formattedAddress){
      console.log(this.state.formattedAddress);
    //  _storeData('from',this.state.formattedAddress);
    //   _storeData(Constant.fromELOC,this.state.fromELOC);
  
     if(this.props.route.params.flag == 'from'){
      this.props.navigation.navigate('Dashboard',{
        formattedAddress:this.state.formattedAddress,
        flag:'from',
        fromEloc:this.state.eLoc
  
      });
     }else
      if(this.props.route.params.flag == 'to'){
        console.log('inside to : '+this.state.formattedAddress);
      this.props.navigation.navigate('Dashboard',{
        formattedAddress:this.state.formattedAddress,
        flag:'to',
        toEloc:this.state.eLoc
  
      });
     }
  
      
    }
    
  }
  //line separator for autosuggest list
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: '#CED0CE',
          marginLeft: 30,
        }}
      />
    );
  };

  render() {
    const list =
      this.state.placesList != '' ? (
        <View
          style={{
            flex: 1,
          }}>
          <FlatList
            data={this.state.placesList}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={(item, index) => item.key}
            renderItem={dataItem => (
              <TouchableOpacity
                key={dataItem.item}
                style={{paddingLeft: 10, paddingBottom: 10, paddingRight: 5}}
                onPress={() => this.onPress(dataItem.item)}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    style={{height: 20, width: 20}}
                    source={require('../../assets/marker.png')}
                  />
                  <View
                    style={{
                      flexDirection: 'column',
                      paddingStart: 10,
                      paddingEnd: 5,
                    }}>
                    <Text style={{fontSize: 16, color: 'grey'}}>{dataItem.item[0]}</Text>
                    <Text style={{color: 'grey', marginRight: 5}}>
                      {dataItem.item[2]}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : null;

    //only place marker if place is selected
    const marker =
      this.state.selectedPlace != '' ? (
        <MapmyIndiaGL.ShapeSource
          id="symbolLocationSource"
          shape={point([
            this.state.selectedPlace[0],
            this.state.selectedPlace[1],
          ])}>
          <MapmyIndiaGL.SymbolLayer
            id="symbolLocationSymbols"
            style={styles.icon}
          />
        </MapmyIndiaGL.ShapeSource>
      ) : null;

    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', paddingLeft: 5, paddingRight: 5}}>
          <TextInput
            style={{flex: 1,height:50,padding:10,color:'#000000',}}
            placeholder="Search place.."
            value={this.state.query}
            onChangeText={text => this.onTextChange(text)}
          />
          <ActivityIndicator
            animating={this.state.progressBar}
            hidesWhenStopped={true}
            color="blue"
          />
             <Button title="Confirm" onPress={() => this.onConfirm()} />
        </View>
        {list}
        <MapmyIndiaGL.MapView style={{flex: this.state.mapFlex}}>
          <MapmyIndiaGL.Camera
            zoomLevel={10}
            ref={c => (this.camera = c)}
          //  centerCoordinate={[78.6569, 22.9734]}
          centerELoc={this.state.eLoc}
          />
          {/* {marker} */}
          <MapmyIndiaGL.PointAnnotation
            id="markerId"
            title="Marker"
            show
            zoomLevel={5}
           eLoc={this.state.eLoc}
          // style={{}}
           centerELoc={this.state.eLoc}
            >
            <MapmyIndiaGL.SymbolLayer
            id="symbolLocationSymbols"
            style={styles.icon}
          />
          </MapmyIndiaGL.PointAnnotation>
        </MapmyIndiaGL.MapView>
      </View>
    );
  }
}

export default AutoSuggestActivity;