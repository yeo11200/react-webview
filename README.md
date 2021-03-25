# 초기세팅 
- https://reactnative.dev/
- https://reactnavigation.org/

 ## 환경변수
- Mac OS X

        export ANDROID_HOME=/<installation location>/android-sdk-macosx
        export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools

- Linux

        export ANDROID_HOME=/<installation location>/android-sdk-linux
        export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools

- Windows

        set ANDROID_HOME=C:\<installation location>\android-sdk-windows
        set PATH=%PATH%;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools


# 기본설치
- npm install -g react-native-cli
- react-native init harisusan --version="0.62.2"
- npm install @react-navigation/native

- npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view

- npm install @react-navigation/stack

- npm install babel-plugin-root-import --save-dev 설치 후
    - babel.config.js 에 플러그인 추가 하면 src ~ 로접근 가능
        ```
        plugins: [
            [
            'babel-plugin-root-import',
                {
                    rootPathPrefix: '~',
                    rootPathSuffix: 'src',
                },
            ],
        ],
        ```


# UI 프레임워크
- https://akveo.github.io/
- https://akveo.github.io/react-native-ui-kitten/
- npm i @ui-kitten/components @eva-design/eva @ui-kitten/eva-icons react-native-svg


# http 통신
- npm install axios
- 안드로이드 패키지에
  - res / xml / network_security_config.xml 파일 작성
  ```
  <?xml version="1.0" encoding="utf-8"?>
  <network-security-config>
      <domain-config cleartextTrafficPermitted="true">
          <domain includeSubdomains="true">Your URL(ex: 127.0.0.1)</domain>
      </domain-config>
  </network-security-config>
  ```
 - 매니페스트 파일에서 옵션 추가
  ```
  <?xml version="1.0" encoding="utf-8"?>
  <manifest ...>
    <uses-permission android:name="android.permission.INTERNET" />
    <application
      android:networkSecurityConfig="@xml/network_security_config"
    >
    </application>
  </manifest>
  ```

# React Native Async Storage(=LocalStorage)
- https://react-native-async-storage.github.io/async-storage/
- npm i @react-native-community/async-storage


# Build 방법
- react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

- react-native 최초 설치 후 안드로이드 스튜디오로 실행할 경우 위와 같은 오류 발생할때
  1. [패키지명]/android/app/src/main/assets 폴더가 있는지 확인하고 없으면 생성
  2. [패키지명]/android 폴더에서 ./gradlew clean 실행
  3. [패키지명] 폴더에서 아래 명령어 실행
    ```
    react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
    ```
  4. react-native run-android


# Firebase 연동
```npm

npm install --save @react-native-firebase/app @react-native-firebase/messaging
```

- 앱이 켜져있을 경우 push(App.js에 적용)
```js
  import messaging from '@react-native-firebase/messaging';

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
```

- 앱이 꺼져있을 경우 push(index.js에 적용)
```js
  import messaging from '@react-native-firebase/messaging';

  useEffect(() => {
    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

```
