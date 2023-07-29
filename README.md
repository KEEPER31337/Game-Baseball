<div align="center">
<img src="https://keeper.or.kr/static/media/keeper_logo.95fc99d7fb9d9db8b162.png" width="300" alt=""/>
</div>

# <div align="center">Game-Baseball</div>

>
> 키퍼 홈페이지 프론트엔드 리뉴얼2에 들어갈 숫자야구 게임입니다.
> 
> 개발기간 : 2023. 05. ~ 
> 

## 🛠️참여자

<table>
<tr>
<td align="center">
<a href="https://github.com/publdaze">
<img src="https://avatars.githubusercontent.com/u/78250089?v=4" width="80" alt=""/>
<br />
<sub><b>publdaze</b></sub>
</a>
<br />
</td>
<td align="center">
<a href="https://github.com/jasper200207">
<img src="https://avatars.githubusercontent.com/u/51306225?v=4" width="80" alt=""/>
<br />
<sub><b>jasper200207</b></sub>
</a>
<br />
</td>
<td align="center">
<a href="https://github.com/KimHaejoong1">
<img src="https://avatars.githubusercontent.com/u/128127416?v=4" width="80" alt=""/>
<br />
<sub><b>KimHaejoong1</b></sub>
</a>
<br />
</td>
<td align="center">
<a href="https://github.com/pipisebastian">
<img src="https://avatars.githubusercontent.com/u/81643702?v=4" width="80" alt=""/>
<br />
<sub><b>pipisebastian</b></sub>
</a>
<br />
</td>
<td align="center">
<a href="https://github.com/sososo0">
<img src="https://avatars.githubusercontent.com/u/94467302?v=4" width="80" alt=""/>
<br />
<sub><b>sososo0</b></sub>
</a>
<br />
</td>
<td align="center">
<a href="https://github.com/wns1826">
<img src="https://avatars.githubusercontent.com/u/14329410?v=4" width="80" alt=""/>
<br />
<sub><b>wns1826</b></sub>
</a>
<br />
</td>
</tr>
</table>

## 🎮게임 소개

숫자 야구는 0~9 로 이루어진 중복없는 네 자리 숫자를 9이닝 동안 맞추는 게임입니다.

숫자는 맞지만 위치가 틀리면 볼 🟢

숫자와 위치가 모두 맞으면 스트라이크 🟡

숫자와 위치가 모두 틀리면 ⚫️ ⚫️

한 이닝 당 30초의 시간이 주어지고, 시간 내에 입력하지 않으면 ❌ 표시와 함께 다음 이닝으로 넘어갑니다.

---

## 📦기술 스택

#### Enviroment

<img src="https://img.shields.io/badge/visual_studio_code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

#### Config

<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">

#### Development

<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">

---

## 🖥️화면 구성


| 시작 페이지 | 횟수 초과 | 게임 페이지 | 
| --- | --- | --- |
| <img src="https://user-images.githubusercontent.com/128127416/243159251-4846a350-0b10-4c86-b688-03138a83f54d.png" width="300"> |  <img src="https://user-images.githubusercontent.com/81643702/256970360-892864ac-f313-4031-b143-b475a1e54eae.png" width="300"> | <img src="https://i.ibb.co/9WLGzzV/2023-07-29-180808.png" width="300"> |
| <div align="center">성공</div> | <div align="center">실패</div> |
| <img src="https://i.ibb.co/mNjHM4g/2023-07-29-181216.png" width="300"> | <img src="https://i.ibb.co/6BNnLK3/2023-07-29-181419.png" width="300"> |

## ⚙️API 주소 목록

https://api.dev.keeper.or.kr/docs/game/baseball.html

야구 게임 정보 `game-info`

플레이 여부 `is-already-played`

야구 게임 START `start`

야구 게임 GUESS `guess`

야구 게임 결과 가져오기 `result`

---

## 📂아키텍쳐

### 디렉토리 구조
```
├──.eslintrc.js
├──.gitignore
├──.nvmrc
├──.prettierrc.json
├──package-lock.json
├──package.json
├──postcss.config.js
├──tailwind.config.js
├──tsconfig.json
├──.github
│   ├──pull_request_template.md
│   │ 
│   └──ISSUE_TEMPLATE
│   │   ├──bug-fix-template.md
│   │   ├──feature-template.md
│   │   └──refactor-template.md
├──public
│   ├──favicon.ico
│   ├──index.html
│   ├──logo192.png
│   ├──logo512.png
│   ├──manifest.json
│   └──robots.txt
└─src
    ├──App.tsx
    ├──index.tsx
    ├──react-app-env.d.ts
    ├──tailwind.css
    ├──api : api 관련 폴더
    │   ├──baseballApi.ts
    │   └──dto.ts
    ├──components : 게임 컴포넌트 폴더
    │   ├──CountdownBar.tsx 
    │   ├──InfoModal.tsx
    │   ├──NumberInput.tsx
    │   ├──PointInfo.tsx
    │   ├──TurnInfoBoard.tsx
    │   └──TurnInfoCard.tsx
    └─screens
        ├──GamePlay.tsx  : 게임 실행
        └──GameStart.tsx : 게임 최초 화면
```
