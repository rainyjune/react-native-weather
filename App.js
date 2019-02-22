import React, { Component } from 'react';
import { Alert, Button, Image, ScrollView, Text, TouchableHighlight, View } from 'react-native';
import { getWeatherDataByLocation, adaptAPIResponse } from './hweather';
import styles from './styles';

export default class WeatherOfCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      nowWeatherIcon: '',
      nowWeatherText: '',
      nowWeatherTemp: '',
      nowAirQuality: '',
      pm25: '',
      lastUpdatedTime: '',
      todayTempRange: '',
      forecasts: [],
    };
  }
  _onPressBackButton() {
    Alert.alert('Back');
  }
  componentDidMount() {
    function getLevel(aqi) {
      return aqi > 200 ? 'level_5' : aqi > 150 ? 'level_4' : aqi > 100 ? 'level_3' : aqi > 50 ? 'level_2' : 'level_1';
    }

    function getWeek(day) {
      return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][day];
    }

    getWeatherDataByLocation('shenzhen').then(rawdata => {
      const data = rawdata.data;
      let newState = {};
      var location = data.location;

      newState.location = `${location.state}${location.city}`;
      newState.nowWeatherIcon = `.${data.current_observation.icon_url}`;
      newState.nowWeatherTemp = `${data.current_observation.temperature}${(isNaN(data.current_observation.temperature) ? '' : '℃')}`;
      newState.nowWeatherText = data.current_observation.weather;
      newState.lastUpdatedTime = data.current_observation.observation_time;
      newState.todayTempRange = `${data.forecast[0].low_temperature} ~ ${data.forecast[0].high_temperature}℃`;
      newState.nowAirQuality = data.current_observation.aqi;
      newState.pm25 = data.current_observation.pm25;
      newState.forecasts = data.forecast.map(dailyData => ({
        weekday: (isNaN(dailyData.date.weekday) ? dailyData.date.weekday : getWeek(dailyData.date.weekday)),
        date: `${dailyData.date.month}-${(dailyData.date.day > 9 ? dailyData.date.day : "0" + dailyData.date.day)}`,
        icon_url: `https://yuan-weather.000webhostapp.com${dailyData.icon_url}`,
        condition: dailyData.condition,
        high_temperature: dailyData.high_temperature,
        low_temperature: dailyData.low_temperature
      }));
      this.setState(newState);
    }).catch(err => {
      alert(err.message);
    });
  }
  render() {
    const {
      backbutton,
      centerflex,
      citytitle,
      container,
      evenflexitems,
      headercontainer,
      horizontalcenter,
      horizontalflex,
      nowcondition,
      weathericon,
      whitecolor,
      widthevenly,
      textaligncenter
    } = styles;
    return (
      <ScrollView style={container}>
        <View style={headercontainer}>
          <TouchableHighlight style={backbutton} onPress={this._onPressBackButton}>
            <Text style={whitecolor}>Back</Text>
          </TouchableHighlight>
          <Text style={[horizontalcenter, whitecolor]}>天气预报</Text>
        </View>
        <View>
          <Text style={[horizontalcenter, citytitle]}>{this.state.location}</Text>
          <View style={nowcondition}>
            <View style={widthevenly}>
              <Image source={{uri: "https://yuan-weather.000webhostapp.com/images/cond_icon/100.png"}} style={weathericon}/>
            </View>
            <View style={widthevenly}>
              <Text style={{marginVertical: 16}}>{this.state.nowWeatherTemp}℃</Text>
              <Text>{this.state.nowWeatherText}</Text>
            </View>
          </View>
        </View>
        <Text style={textaligncenter}>{this.state.lastUpdatedTime}</Text>
        <Text style={textaligncenter}>{this.state.todayTempRange}</Text>
        <View style={[horizontalflex, centerflex]}>
          <Text>空气质量：</Text>
          <Text>{this.state.nowAirQuality}</Text>
          <Text> PM2.5浓度：{this.state.pm25}</Text>
          <Text>μg/m³</Text>
        </View>

        <View style={[horizontalflex, centerflex, {maxWidth: 350, marginLeft: 'auto', marginRight: 'auto'}]}>
          {this.state.forecasts.map(item => (
            <View style={evenflexitems} key={`${item.date}`}>
              <Text style={textaligncenter}>{item.weekday} {item.date}</Text>
              <Image source={{uri: item.icon_url}} style={weathericon} />
              <Text style={textaligncenter}>{item.condition}</Text>
              <Text style={textaligncenter}>{item.high_temperature}°</Text>
              <Text style={textaligncenter}>{item.low_temperature}°</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
};

