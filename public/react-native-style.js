'use strict'

import Dimensions from 'Dimensions'
//
// // Precalculate Device Dimensions for better performance
// const x = Dimensions.get('window').width;
// const y = Dimensions.get('window').height;
//
// // Calculating ratio from iPhone breakpoints
// const ratioX = x < 375 ? (x < 320 ? 0.75 : 0.875) : 1 ;
// const ratioY = y < 568 ? (y < 480 ? 0.75 : 0.875) : 1 ;
//
// // We set our base font size value
// const base_unit = 16;
//
// // We're simulating EM by changing font size according to Ratio
// const unit = base_unit * ratioX;
//
// // We add an em() shortcut function
// function em(value) {
//   return unit * value;
// }

function opacity(hex, opac) {
  let parts
  if(hex.length < 6) {
    let result = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(hex)
    parts = {
      r: parseInt(result[1]+result[1], 16),
      g: parseInt(result[2]+result[2], 16),
      b: parseInt(result[3]+result[3], 16)
    }
  }
  else {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    parts = {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    }
  }
  return 'rgba(' + parts.r + ',' + parts.g + ',' + parts.b + ', ' + opac + ')'
}

//https://material.google.com/style/color.html#color-color-palette
let CP = {
  //Indigo
  prim_50: '#E3F2FD',
  prim_100: '#C5CAE9',
  prim_200: '#9FA8DA',
  prim_300: '#7986CB',
  prim_400: '#5C6BC0',
  prim_500: '#3F51B5',
  prim_600: '#3949AB',
  prim_700: '#303F9F',
  prim_800: '#283593',
  prim_900: '#1A237E',
  prim_a100: '#8C9EFF',
  prim_a200: '#536DFE',
  prim_a700: '#304FFE',

  indigo50: '#E3F2FD',
  indigo100: '#C5CAE9',
  indigo200: '#9FA8DA',
  indigo300: '#7986CB',
  indigo400: '#5C6BC0',
  indigo500: '#3F51B5',
  indigo600: '#3949AB',
  indigo700: '#303F9F',
  indigo800: '#283593',
  indigo900: '#1A237E',
  indigoA100: '#8C9EFF',
  indigoA200: '#536DFE',
  indigoA400: '#3D5AFE',
  indigoA700: '#304FFE',

  //red
  sec_500: '#F44336',
  sec_900: '#B71C1C',
  sec_a200: '#FF5252',
  sec_a700: '#DD2C00',

  red50: '#FFEBEE',
  red100: '#FFCDD2',
  red200: '#EF9A9A',
  red300: '#E57373',
  red400: '#EF5350',
  red500: '#F44336',
  red600: '#E53935',
  red700: '#D32F2F',
  red800: '#C62828',
  red900: '#B71C1C',
  redA100: '#FF8A80',
  redA200: '#FF5252',
  redA400: '#FF1744',
  redA700: '#D50000',

  //grey
  grey_300: '#E0E0E0',
  grey_400: '#BDBDBD',
  grey_500: '#9E9E9E',
  grey_600: '#757575',
  grey_700: '#616161',

  grey300: '#E0E0E0',
  grey400: '#BDBDBD',
  grey500: '#9E9E9E',
  grey600: '#757575',
  grey700: '#616161',

  //green
  green50: '#E8F5E9',
  green100: '#C8E6C9',
  green200: '#A5D6A7',
  green300: '#81C784',
  green400: '#66BB6A',
  green500: '#4CAF50',
  green600: '#43A047',
  green700: '#388E3C',
  green800: '#2E7D32',
  green900: '#1B5E20',
  greenA100: '#B9F6CA',
  greenA200: '#69F0AE',
  greenA400: '#00E676',
  greenA700: '#00C853',

  //green
  prim50: '#E8F5E9',
  prim100: '#C8E6C9',
  prim200: '#A5D6A7',
  prim300: '#81C784',
  prim400: '#66BB6A',
  prim500: '#4CAF50',
  prim600: '#43A047',
  prim700: '#388E3C',
  prim800: '#2E7D32',
  prim900: '#1B5E20',
  primA100: '#B9F6CA',
  primA200: '#69F0AE',
  primA400: '#00E676',
  primA700: '#00C853',
  

  //yellow
  yellow_400: '#FFEE58',

  white: '#ffffff',
  black: '#000000',
}

var C = {
  //green
  prim50: '#E8F5E9',
  prim100: '#C8E6C9',
  prim200: '#A5D6A7',
  prim300: '#81C784',
  prim400: '#66BB6A',
  prim500: '#4CAF50',
  prim600: '#43A047',
  prim700: '#388E3C',
  prim800: '#2E7D32',
  prim900: '#1B5E20',
  primA100: '#B9F6CA',
  primA200: '#69F0AE',
  primA400: '#00E676',
  primA700: '#00C853',

  app: CP.green500,
  accent: '#5975ff', //CP.inidgoA100, //over button, accent usually indicates another color group
  uiActive: '#3a4ca6',
  uiLighter: '#c5cae9',
  uiDarker: '#242f66',
  bgLighter: '#1c244d',
  bgDarker: '#0e1226',
  // dark: 700 //status bar

  prim: CP.prim500,
  primTrans: opacity(CP.prim500, 0.3),

  primControl: CP.prim500,
  primControlDown: CP.green900,
  primControlActive: CP.primA200,


  //app color
  //primary action color
  //input color (faded action color?)

  //primary text on light bg rgba(0,0,0,0.87) textPrimOnLight

  success: CP.green500,
  successThin: CP.green600,
  successPressed: CP.green900,
  successActive: CP.greenA200,
  danger: CP.red500,
  dangerThin: CP.red600, //thin text needs darker color to match bolder text or icons
  dangerPressed: CP.red700,

  textBlack: 'rgba(0,0,0,0.87)',
  textBlackSec: 'rgba(0,0,0,0.54)',
  textBlackDisabled: 'rgba(0,0,0,0.38)',
  textWhite: 'rgba(255,255,255,1)',
  textWhiteSec: 'rgba(255,255,255,0.7)',
  textWhiteDisabled: 'rgba(255,255,255,0.5)',

  sepBlack: 'rgba(0,0,0,0.12)',
  sepWhite: 'rgba(255,255,255,0.12)',







  faintBorderLight: CP.grey_300,
  faintBorderDark: CP.grey_700,


  drawerMenuBg: '#222326',
  drawerHeaderBg: '#1e1e21',
  drawerBorder: '#313336',

  textGrey: '#7e838f',
  textRed: '#f00',

  advBoxBg: '#fff',
  advBoxSep: CP.grey_300,//'#c8c7cc',

  activeSoft: CP.prim_a200,
  activeSoftDown: CP.prim_a700,
  activeHard: CP.sec_500,
  activeHardDown: CP.sec_900,
  activeGrey: CP.grey_400,

  modal: 'rgba(0,0,0,0.65)',

  white: CP.white,
  black: CP.black,
}

C = {
  ...C,

  statusBarBg: C.prim600,
  navBg: C.prim500,
  navBgTrans: opacity(C.prim500, 0.3),
  navBorder: C.prim600,
  navText: C.textWhite,
  navTab: C.textWhiteSec,
  navTabActive: C.primA400,

  pageBg: CP.grey300,
}

var D = {
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,

  textXLarge: 30,
  textLarge: 24,
  textMedium: 18,
  textSmall: 12,
  textMicro: 8,

  hair: StyleSheet.hairlineWidth,

  zNavBar: 2,
  zCamera: 3,
  zPrompt: 4,
}

var S = {
  container: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: CP.grey300,
  },

  textXLarge: {
    fontSize: D.textXLarge
  },
  textLarge: {
    fontSize: D.textLarge
  },
  textMedium: {
    fontSize: D.textMedium
  },
  textSmall: {
    fontSize: D.textSmall
  },
  textMicro: {
    fontSize: D.textMicro
  },

  textBlack: {color: C.textBlack},
  textBlackSec: {color: C.textBlackSec},
  textBlackDisabled: {color: C.textBlackDisabled},
  textWhite: {color: C.textWhite},
  textWhiteSec: {color: C.textWhiteSec},
  textWhiteDisabled: {color: C.textWhiteDisabled},

  textGrey: {
    color: C.textGrey
  },
  textRed: {
    color: C.textRed
  },

  textCenter: {
    textAlign: 'center' //horizontal
  },
  textTop: {
    textAlignVertical: 'top' //android textinput
  },
  textMiddle: {
    textAlignVertical: 'center' //android textinput
  },
  textBottom: {
    textAlignVertical: 'bottom' //android textinput
  },



  circleImage: function(wh) {
    return {
      width: wh,
      height: wh,
      borderRadius: wh/2
    }
  },

  hRule:{
    height: StyleSheet.hairlineWidth*2,
    alignSelf: 'stretch',
    backgroundColor: CP.grey_500
  },
  hRuleLight:{
    height: StyleSheet.hairlineWidth*2,
    alignSelf: 'stretch',
    backgroundColor: C.faintBorderLight
  },
  hRuleDark:{
    height: StyleSheet.hairlineWidth*2,
    alignSelf: 'stretch',
    backgroundColor: C.faintBorderDark
  },
  vRule:{
    width: StyleSheet.hairlineWidth*2,
    alignSelf: 'stretch',
    backgroundColor: CP.grey_500
  },
  vRuleLight:{
    width: StyleSheet.hairlineWidth*2,
    alignSelf: 'stretch',
    backgroundColor: C.sepBlack,
  },
  vRuleDark:{
    width: StyleSheet.hairlineWidth*2,
    alignSelf: 'stretch',
    backgroundColor: C.faintBorderDark
  },

  flow1: {
    flex: 1,
  },
  flow0: {
    flex: 0,
    flexGrow: 0,
    flexShrink: 0,
  },
  flow: (val) => ({flex: val}),

  hbox:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'nowrap'
  },
  vbox:{
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'nowrap'
  },

  cbox: {
    flexDirection: 'row', //just as default
    justifyContent: 'center',
    alignItems: 'center',
  },
  vCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
    flexWrap: 'nowrap',
  },
  hCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'nowrap',
  },

  // alignItems enum('flex-start', 'flex-end', 'center', 'stretch')
  // alignSelf enum('auto', 'flex-start', 'flex-end', 'center', 'stretch')
  // justifyContent enum('flex-start', 'flex-end', 'center', 'space-between', 'space-around')
  // flexDirection enum('row', 'column')
  // flexWrap enum('wrap', 'nowrap')

  flexRow:{
    flexDirection: 'row'
  },
  flexColumn:{
    flexDirection: 'column'
  },

  flexWrap:{
    flexWrap: 'wrap'
  },
  flexNowrap:{
    flexWrap: 'nowrap'
  },

  flowStart:{
    justifyContent: 'flex-start'
  },
  flowEnd:{
    justifyContent: 'flex-end'
  },
  flowCenter:{
    justifyContent: 'center'
  },
  flowEdges:{
    justifyContent: 'space-between'
  },
  flowSpaced:{
    justifyContent: 'space-around'
  },

  spanStart:{
    alignItems: 'flex-start'
  },
  spanEnd:{
    alignItems: 'flex-end'
  },
  spanCenter:{
    alignItems: 'center'
  },
  spanStretch:{
    alignItems: 'stretch'
  },

  iSpanStart:{
    alignSelf: 'flex-start'
  },
  iSpanEnd:{
    alignSelf: 'flex-end'
  },
  iSpanCenter:{
    alignSelf: 'center'
  },
  iSpanStretch:{
    alignSelf: 'stretch'
  },


  bgPrim: {backgroundColor: C.prim},
  bgPrimTrans: {backgroundColor: C.primTrans},
  bgWhite:{
    backgroundColor: 'white'
  },
  bgBlack:{
    backgroundColor: 'black'
  },
  bgRed:{
    backgroundColor: '#ff9999'
  },
  bgGreen:{
    backgroundColor: '#99ff99'
  },
  bgBlue:{
    backgroundColor: '#9999ff'
  },
  bgModal:{
    backgroundColor: C.modal,
  },
  bgModalDark:{
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  bgGrey:{
    backgroundColor: C.faintBorderLight
  },
  bgTrans:{
    backgroundColor: 'transparent'
  },

  bg: (color) => {
    return {
      backgroundColor: color
    }
  },

  bgOpacity: (color, opac=1) => {
    return {
      backgroundColor: opacity(color, opac)
    }
  },

  bb1:{
    borderColor: 'black',
    borderWidth: 1
  },
  bg1: {
    borderColor: 'grey',
    borderWidth: 1
  },
  bw1:{
    borderColor: 'white',
    borderWidth: 1
  },

  lightShadow: {
    //IOS Shadow
    shadowColor: C.black,
    shadowOpacity: 0.3,
    shadowOffset: {width:0, height:1},
    shadowRadius: 3,

    //Android Shadow
    elevation: 4,
  },



  sw: (percentage) => {
    return {
      width: D.screenWidth * percentage
    }
  },
  sh: (percentage) => {
    return {
      width: D.screenHeight * percentage
    }
  },
}


let dirs = ['', 'left', 'top', 'right', 'bottom']
let vdirs = ['top', 'bottom']
let hdirs = ['left', 'right']

function f(s)
{
  return s.charAt(0)
}

function c(s)
{
  return s.charAt(0).toUpperCase() + s.slice(1)
}

//width & height
for(let i=0; i<=54; i+=1)
{
  //1-20,25,30..100,150,200..1000
  let v = i
  if(i > 36)
    v = 100 + (i-36)*50
  else if(i > 20)
    v = 20 + (i-20)*5

  let styleName = 'w' + v
  S[styleName] = {
    'width': v
  }

  styleName = 'h' + v
  S[styleName] = {
    'height': v
  }

  styleName = 'wh' + v
  S[styleName] = {
    'width': v,
    'height': v
  }
}

//padding & margin
for(let v=0; v<=30; v+=1)
{
  for(let dir of dirs)
  {
    let styleName = 'p' + f(dir) + v
    let propName = 'padding' + c(dir)
    S[styleName] = {
        [propName]: v
    }

    styleName = 'm' + f(dir) + v
    propName = 'margin' + c(dir)
    S[styleName] = {
        [propName]: v
    }
  }

  S['pv' + v] = {
    paddingVertical: v
  }

  S['ph' + v] = {
    paddingHorizontal: v
  }

  S['mv' + v] = {
    marginVertical: v
  }

  S['mh' + v] = {
    marginHorizontal: v
  }
}

//abs
S['abs'] = (top=null, right=null, bottom=null, left=null) => {
  const o = {position: 'absolute'}
  if(top!=null) o.top = top
  if(right!=null) o.right = right
  if(bottom!=null) o.bottom = bottom
  if(left!=null) o.left = left
  return o
}
S['absTl'] = (top=null, left=null) => S.abs(top,null,null,left)
for(let v=0; v<=30; v+=5)
{
  let styleName = 'abs' + v
  S[styleName] = {
    position: "absolute",
    left: v,
    top: v,
    right: v,
    bottom: v
  }

  for(let vdir of vdirs)
  {
    for(let hdir of hdirs)
    {
      styleName = "abs_" + f(vdir) + f(hdir) + "_" + v
      let o = {
          position: "absolute",
      }
      o[vdir] = v
      o[hdir] = v
      S[styleName] = o
    }
  }

  for(let vdir of vdirs)
  {
    styleName = "abs_" + f(vdir) + "_" + v
    let o = {
      position: "absolute",
    }
    o[vdir] = v
    for(let hdir of hdirs)
      o[hdir] = v
    S[styleName] = o
  }

  for(let hdir of hdirs)
  {
    styleName = "abs_" + f(hdir) + "_" + v
    let o = {
      position: "absolute",
    }
    o[hdir] = v
    for(let vdir of vdirs)
      o[vdir] = v
    S[styleName] = o
  }
}

//border
S['border'] = (borderColor='#000', borderWidth=StyleSheet.hairlineWidth, borderRadius=0) => ({borderColor, borderWidth, borderRadius})
// S['borderRight'] = (borderColor='#000', borderWidth=1, borderRadius=0) => ({borderRightColor:borderColor, borderRightWidth:borderWidth, borderRadius})
//border radius
for(let v=2; v<=10; v+=2)
{
  let styleName = 'br' + v
  let propName = 'borderRadius'
  S[styleName] = {
    [propName]: v
  }

  for(let vdir of vdirs)
  {
    for(let hdir of hdirs)
    {
      styleName = 'br_' + f(vdir) + f(hdir) + '_' + v
      propName = 'border' + c(vdir) + c(hdir) + 'Radius'
      S[styleName] = {
        [propName]: v
      }
    }
  }
}

S = {
  ...S,

  mapOverlay_dark: [S.bgModal, S.p10, S.br8],
  mapOverlay_dark_sep: {
    backgroundColor: C.faintBorderDark,
    height: StyleSheet.hairlineWidth*2,
    marginVertical: 8,
    marginHorizontal: 0
  },
  mapOverlay_dark_label: {
    color: C.textWhite,
    fontSize: D.textMedium
  },
  mapOverlay_dark_icon: {
    color: C.textWhite,
    fontSize: D.textLarge
  },

  // options_light: [S.bgWhite, S.vbox, S.spanStretch],
  // options_light_group: {
  //   ...S.hbox,
  //   ...S.flowStart,
  //   paddingVertical: 12,
  //   paddingHorizontal: 15,
  // },
  // options_light_label: {
  //   color: C.textBlack,
  //   fontSize: D.textMedium,
  //   flex: 1,
  //   textAlign:'center'
  // },
  // options_light_icon: {
  //   color: C.textBlack,
  //   fontSize: D.textLarge
  // },
  // options_light_sep: {
  //   backgroundColor: C.faintBorderLight,
  //   height: StyleSheet.hairlineWidth*2
  // },
}

// console.log(S)
import {StyleSheet} from 'react-native'
module.exports = {CP:CP, C:C, D:D, S:S}//StyleSheet.create(S)}
