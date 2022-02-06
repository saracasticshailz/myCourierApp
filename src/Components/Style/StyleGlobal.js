import { StyleSheet} from 'react-native';


const styles = StyleSheet.create({
  horizontalView:{
    flexDirection:'row'
  },
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,  
    marginVertical: 6,
    margin:2,
   // padding:10,
    flexDirection:'row'
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  btnText: {
        color: "#000000",
        fontSize: 16,
        justifyContent: "space-between",
        textAlign: "center",
      },
    mainView:{
    flex:1,
    },
    buttonStyle: {
      width: '50%',
      marginTop: 12,
      backgroundColor: "#d3d3d3",
      padding: 15,
      borderRadius: 50,
      // marginRight:5,
      // marginLeft:15
      justifyContent: "space-between",
      textAlign: 'center',
      alignContent: 'space-between',
      alignItems: 'center'
    },
    normalText:{
      color:'#000000',
      margin:5
    },
  container: {
    flexDirection: 'column', 
    flexGrow: 1,
    backgroundColor: '#ffffff',   
    justifyContent: 'flex-end',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  headerView:{
marginLeft:15,
marginTop:25
  },
  smallHeader:{
    fontSize:15,
    color:'#000000',
    marginLeft:5,
    marginTop:10
   // marginLeft:'10'
 
  },
  mainHeader:{
    fontWeight:"bold",
    fontSize:30,
    color:"#000000",
    marginTop:20,
    
  },
  inputView:{
   flexDirection:'row',
    marginTop:20,
    padding:10,
    fontSize:25,
    borderColor:'#d3d3d3',
    borderWidth:5,
    borderRadius:10,
    marginLeft:15,
    marginRight:15
 
  },
  inputText:{
    height:50,
    color:"#000000",
    fontSize:25,
  
    
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"100%",
    backgroundColor:"#0000FF",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10 
  },
  loginText:{
    color:"white"
  },
  bottomView: {
    width: '100%',
    height: 50,
    backgroundColor: '#EE5407',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', 
    bottom: 0, 
  },
    otpInputContainer: {
    marginBottom: 20,

   // justifyContent: 'flex-start',
  //  flexDirection:'row',
  margin:10,
  marginTop:20
   
    
  },  
  roundedOtpInput: {
    borderRadius: 10,
    borderWidth: 4,
  },
  boldTextStyle: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
    marginTop: 15
  },
  underlineTextContainer: {
    borderBottomWidth: 2,
    borderColor: '#000000',
    marginLeft: 25,
}

});
export default styles;