import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
  },
  headercontainer: {
    backgroundColor: '#16a086',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  backbutton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    paddingHorizontal: 5,
    borderRadius: 5,
    position: 'absolute',
    left: 10,
    top: 5,
  },
  whitecolor: {
    color: 'white',
  },
  citytitle: {
    marginVertical: 10,
  },
  horizontalflex: {
    flex: 1,
    flexDirection: 'row'
  },
  centerflex: {
    justifyContent: 'center'
  },
  evenflexitems: {
    flex: 1,
    backgroundColor: 'blue'
  },
  horizontalcenter: {
    textAlign: 'center',
    width: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  widthevenly: {
    flex: 1
  },
  nowcondition: {
    flex: 1,
    flexDirection: 'row'
  },
  textaligncenter: {
    textAlign: 'center',
  },
  weathericon: {
    width: 100,
    height: 100,
    alignSelf: 'flex-end'
  }
});

export default styles;