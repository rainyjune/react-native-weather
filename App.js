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

      newState.location = location.state + location.city;
      newState.nowWeatherIcon = '.' + data.current_observation.icon_url;
      newState.nowWeatherTemp = data.current_observation.temperature + (isNaN(data.current_observation.temperature) ? '' : '℃');
      newState.nowWeatherText = data.current_observation.weather;
      newState.lastUpdatedTime = data.current_observation.observation_time;
      newState.todayTempRange = data.forecast[0].low_temperature + ' ~ ' + data.forecast[0].high_temperature + '℃';
      newState.nowAirQuality = data.current_observation.aqi;
      newState.pm25 = data.current_observation.pm25;
      newState.forecasts = data.forecast.map(dailyData => ({
        weekday: (isNaN(dailyData.date.weekday) ? dailyData.date.weekday : getWeek(dailyData.date.weekday)),
        date: dailyData.date.month + '-' + (dailyData.date.day > 9 ? dailyData.date.day : "0" + dailyData.date.day ),
        icon_url: 'https://yuan-weather.000webhostapp.com' + dailyData.icon_url,
        condition: dailyData.condition,
        high_temperature: dailyData.high_temperature,
        low_temperature: dailyData.low_temperature
      }));
      this.setState(newState);
    }).catch((err) => {
      alert(err.message);
    });
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.headercontainer}>
          <TouchableHighlight style={styles.backbutton} onPress={this._onPressBackButton}>
            <Text style={styles.whitecolor}>Back</Text>
          </TouchableHighlight>
          <Text style={[styles.horizontalcenter, styles.whitecolor]}>天气预报</Text>
        </View>
        <View>
          <Text style={[styles.horizontalcenter, styles.citytitle]}>{this.state.location}</Text>
          <View style={styles.nowcondition}>
            <View style={styles.widthevenly}>
              <Image source={{uri: "https://yuan-weather.000webhostapp.com/images/cond_icon/100.png"}} style={styles.weathericon}/>
            </View>
            <View style={styles.widthevenly}>
              <Text style={{marginVertical: 16}}>{this.state.nowWeatherTemp}℃</Text>
              <Text>{this.state.nowWeatherText}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.textaligncenter}>{this.state.lastUpdatedTime}</Text>
        <Text style={styles.textaligncenter}>{this.state.todayTempRange}</Text>
        <View style={[styles.horizontalflex, styles.centerflex]}>
          <Text>空气质量：</Text>
          <Text>{this.state.nowAirQuality}</Text>
          <Text> PM2.5浓度：{this.state.pm25}</Text>
          <Text>μg/m³</Text>
        </View>

        <View style={[styles.horizontalflex, styles.centerflex, {maxWidth: 350, marginLeft: 'auto', marginRight: 'auto'}]}>
          {this.state.forecasts.map(item => (
            <View style={styles.evenflexitems} key={'' + item.date}>
              <Text style={styles.textaligncenter}>{item.weekday} {item.date}</Text>
              <Image source={{uri: item.icon_url}} style={styles.weathericon} />
              <Text style={styles.textaligncenter}>{item.condition}</Text>
              <Text style={styles.textaligncenter}>{item.high_temperature}°</Text>
              <Text style={styles.textaligncenter}>{item.low_temperature}°</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
};

