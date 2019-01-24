const axios = require('axios');
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export function getWeatherDataByLocation(location = '', key = '', lang = 'zh', unit = 'm') {

  weatherUrl = 'https://yuan-weather.herokuapp.com/api/city/' + location;


  return axios.get(weatherUrl);
}