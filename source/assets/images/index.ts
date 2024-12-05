import {ImageRequireSource} from 'react-native';

export const images: {[key: string]: ImageRequireSource} = {
  day: require('./day.png'),
  logo: require('./logo.png'),
  info: require('./info.png'),
  back: require('./back.png'),
  date: require('./date.png'),
  mail: require('./mail.png'),
  night: require('./night.png'),
  close: require('./close.png'),
  print: require('./print.png'),
  silai: require('./silai.png'),
  empty: require('./empty.png'),
  search: require('./search.png'),
  logout: require('./logout.png'),
  packing: require('./packing.png'),
  complete: require('./complete.png'),
  extruder: require('./extruder.png'),
  rewinding: require('./rewinding.png'),
  arrow_down: require('./arrow_down.png'),
  lamination: require('./lamination.png'),
  last_login: require('./last_login.png'),
  right_arrow: require('./right_arrow.png'),
  material_out: require('./material_out.png'),
  phone_number: require('./phone_number.png'),
} as const;
