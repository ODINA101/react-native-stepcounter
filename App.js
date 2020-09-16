/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {DeviceEventEmitter} from 'react-native';
import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import GoogleFit, { Scopes, observeSteps } from 'react-native-google-fit'
import moment from 'moment';
import Fitness from '@ovalmoney/react-native-fitness';
 

 
export default class App extends React.Component {
state = {
	stepData:[],
	todaySteps:{quantity:0}
}


 getSteps(startDate, endDate, hour) {
    return Fitness.getSteps({startDate, endDate, hour});
}

 getRandomInt(max) {
    let integer = Math.floor(Math.random() * max) + 1;
    let double = (integer*.25);
    return (integer + double).toFixed(2);
}

async componentDidMount() {
      const permissions = [
        { kind: Fitness.PermissionKind.Step, access: Fitness.PermissionAccess.Write },
      ];
      await Fitness.requestPermissions(permissions)
      Fitness.isAuthorized(permissions)
        .then((authorized) => {
          // Do something
          // alert(authorized)
          setInterval(() => {
          Fitness.getSteps({startDate:new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) ,endDate:new Date(Date.now()),interval:'day'}).then(res =>{
            // console.log(JSON.stringify(res))
            // res.map(item => {
            //   console.log(item)
            // })
            this.setState({stepData:res})
          })
         },100)

          setInterval(() => {
           Fitness.getSteps({startDate:new Date(Date.now() - 24 * 60 * 60 * 1000),endDate:new Date(Date.now()),interval:'hour'}).then(res =>{
            // console.log(JSON.stringify(res))
            res.map(item => {
              console.log(item)
            })
            
            this.setState({todaySteps:res[0]})
          })

          },100)
        



        })
        .catch((error) => {
          alert(error)
          // Do something
        });
// alert(JSON.stringify(generateWeeklyAnalysis()))


        Fitness.subscribeToSteps().then(data =>{
           // alert('a')
        }) 
    //      let datesArray = [
    //     {day: 'Monday', distance: 0},
    //     {day: 'Tuesday', distance: 0},
    //     {day: 'Wednesday', distance: 0},
    //     {day: 'Thursday', distance: 0},
    //     {day: 'Friday', distance: 0},
    //     {day: 'Saturday', distance: 0},
    //     {day: 'Sunday', distance: 0}
    // ];
    // let totalDistance = 0;
    // let today = new Date().getDay();

    // for (let i = 0; i < today; i++){
    //     let initialDate = new Date(Date.now() - 86400000*(today-i));
    //     let startDate = new Date(initialDate.getFullYear(), initialDate.getMonth(), initialDate.getDate(), 0, 0, 0);
    //     let endDate = new Date(initialDate.getFullYear(), initialDate.getMonth(), initialDate.getDate(), 23, 59, 59);
    //     let res = await this.getSteps(startDate, endDate, 'hour');
    //     let distance = res.length === 0 ? this.getRandomInt(6) : res;
    //     datesArray[i].distance = distance;
    //     totalDistance += distance*1000*2;
    // }
    
    // return {
    //     datesArray,
    //     totalDistance
    // };

    alert(JSON.stringify(datesArray))

// 	  DeviceEventEmitter.addListener(
//             'StepChangedEvent',
//             (steps) => alert('step')
//             //(steps) => console.log('StepChangedEvent', steps)
//         );
   
//       //  googleFit.observeSteps();
//  const options = {
//   scopes: [
//     Scopes.FITNESS_ACTIVITY_READ_WRITE,
//     Scopes.FITNESS_BODY_READ_WRITE,
//   ],
// }
// GoogleFit.authorize(options)
//   .then(authResult => {
//   if (authResult.success) {
//  const options = {
//   startDate: "2017-01-01T00:00:17.971Z", // required ISO8601Timestamp
//   endDate: new Date().toISOString(), // required ISO8601Timestamp
//   bucketUnit: "DAY", // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
//   bucketInterval: 1, // optional - default 1. 
// };
//       // alert('AUTH_SUCCESS')
//        GoogleFit.startRecording((callback) => {
//         GoogleFit.getDailyStepCountSamples(options)
//          .then((res) => {
//              alert( res)
//          })
//          .catch((err) => {console.warn(err)})
//          GoogleFit.getDailySteps().then((data)=>{
//         alert(JSON.stringify(data))

//       }).catch((e) =>{
//        alert(e)
//       })
//       // alert(JSON.stringify(callback))
//      // Process data from Google Fit Recording API (no google fit app needed)
//    });
//     // adjustment is 0 by default, determine the first day of week, 0 == Sunday, 1==Monday, etc.
//     // adjustment=0
//     // GoogleFit.getWeeklySteps(date, adjustment).then().catch()

//     } else {
//      alert('AUTH_DENIED')
//     }

//   })
//   .catch(() => {
//      //AUTH_ERROR
//   })
}

render(){
  return (
    <View style={styles.container}>
    {
      this.state.stepData.map(item => {
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        let d = moment(item.startDate)
       

        let dayName = days[d.day()]

        return (
           <Text style={styles.txt}>{dayName} steps:{item.quantity}</Text>
        )
      })
    }
   <Text style={styles.txt}>Today steps:{this.state.todaySteps.quantity}</Text>
    </View>
       
  );
}
    
}

const styles = StyleSheet.create({
 container:{
 	flex:1
 },
 txt:{
 	fontSize:20
 }
});

