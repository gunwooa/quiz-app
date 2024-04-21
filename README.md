# 클래스띵

- 해당 프로젝트는 react-native-cli로 개발되었습니다.
- [Github Project](https://github.com/users/gunwooa/projects/2/views/1?pane=info)를 사용하여 이슈를 관리하였습니다.

<br />

## 시작하기

### 개발 환경 설정

macOS 에서 Android, iOS 각각 링크를 참고하여 개발 환경을 섫정해주세요.

- [Android 개발 환경 설정](https://reactnative.dev/docs/environment-setup?platform=android)
- [iOS 개발 환경 설정](https://reactnative.dev/docs/environment-setup?platform=ios)

### 프로젝트 설치 및 실행

1. 레포지토리를 클론합니다:

   ```bash
   git clone https://github.com/gunwooa/quiz_app
   ```

2. 프로젝트 경로에서 의존성을 설치합니다:

   ```bash
   yarn

   cd ios && pod install && cd ..
   ```

3. 프로젝트 경로에서 애플리케이션을 실행합니다:

   ```bash
   yarn start --reset-cache

   yarn ios # iOS 실행
   yarn android # Android 실행
   ```

<br />

## 사용 가능한 스크립트

프로젝트 경로에서 다음 스크립트를 실행할 수 있습니다:

- `yarn start` : 앱을 개발 모드로 실행합니다.
- `yarn ios` : iOS 디바이스 또는 시뮬레이터에서 앱을 실행합니다.
- `yarn android` : 안드로이드 디바이스 또는 에뮬레이터에서 앱을 실행합니다.
- `yarn test` : 테스트 러너를 시작합니다.
- `yarn lint` : lint 검사를 시작합니다.
