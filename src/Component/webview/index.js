import React from 'react'
import { WebView } from 'react-native-webview'
import DeviceInfo from 'react-native-device-info';
import { BackHandler, Platform } from 'react-native';

const WebViewComponent = ({ pushToken }) => {

    let handleSetRef = React.useRef();

    const url = 'https://jinseop-api.click/';

    const [ platformCheck, isPlatformCheck] = React.useState(Platform.OS);

    // web -> react native로 데이터를 전송해줄 때 사용을 한다.
    const getMessage = (e) => {
        if(e.nativeEvent.data !== 'undefined'){
            const event = JSON.parse(e.nativeEvent?.data);
            console.log('nativeLog', event.test);  
        }
    }

    // react native -> web으로 데이터를 보내줄 때 사용할 함수
    const getProgress = ({ nativeEvent }) => {
        // progress : 현재 load의 상태를 나타낸다.
        if(nativeEvent.progress === 1){
            // handleSetRef.postMessage(JSON.stringify({token : pushToken}));
        }

    }

    React.useEffect(() => {

        if(platformCheck === 'android'){
          BackHandler.addEventListener('hardwareBackPress',onAndroidBackPress);
        }
    
        return () => {
          if(platformCheck === 'android'){
            BackHandler.removeEventListener('hardwareBackPress',onAndroidBackPress);
          }
        }
    
        
    }, []);

    const onAndroidBackPress = () => {
        if(handleSetRef.current){
            handleSetRef.current.goBack();
          return true;
        }
        return false;
    }

    return(
            /**
             * onLoadProgress : load의 상태를 나타낸다.
             * onLoad : load가 될 경우 실행될 함수
             * onLoadEnd : load가 끝났을 경우 실행하는 함수
             * onLoadStart : load를 하자마자 시작할 함수
            */
        <>
            {/* - source : 해당하는 html or uri
            - onMessage : web -> react native으로 보내는 데이터
            - onLoadProgress : react navite -> web으로 보내는 데이터
            - userAgent : web에서 해당하는 user의 정보를 넘겨줄때 사용하는 데이터 */}
            <WebView
                ref={ (e) => handleSetRef = e }
                source={ { uri : url }}
                onMessage={ (e) => getMessage(e)} 
                onLoadProgress={ (e) => getProgress(e)}
                userAgent={ DeviceInfo.getUserAgent() + `${platformCheck}-APP`}/>
        </>
    )
}


export default WebViewComponent