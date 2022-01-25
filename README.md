# SNS 은이네 문방구 

멋쟁이사자처럼 프론트엔드 스쿨 1기 내 그룹으로 진행한 프로젝트입니다.  10-20대 팬시 상품에 관심이 있는 사람들을 타겟으로, 문구 제품 등을 구매하거나 공유할 수 있는 플랫폼입니다. 

문구상품이라는 공통된 주제로 서로 일상을 공유하고 SNS 활동을 통해 소통을 할 수 있습니다. 

글과 사진과 함께 게시물을 작성하여 자신의 일상을 공유할 수 있습니다. 다른 사용자를 팔로우하면 유저가 올린 게시물을 홈 피드에서 소식을 확인할 수도 있습니다. 또한 다른 사용자와 메시지를 주고 받을 수 있습니다. 


## stack

### Frontend

- HTML
- CSS
- JAVASCRIPT

### Backend

- 제공된 API 사용

## product

[피그마](https://www.figma.com/file/B8eOhMJbVSxL47lWaVqVTm/%EC%9D%80%EB%B0%A9%EA%B5%AC)

[은이네 문방구]()

# 역할

## member

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/gureumwoon"
        ><img
          src="https://avatars.githubusercontent.com/gureumwoon"
          width="100px;"
          alt=""
        /><br /><sub><b>김채운</b></sub></a
      ><br />
    </td>
    <td align="center">
      <a href="https://github.com/Moonhokyun"
        ><img
          src="https://avatars.githubusercontent.com/Moonhokyun"
          width="100px;"
          alt=""
        /><br /><sub><b>문호균</b></sub></a
      ><br />
    </td>
    <td align="center">
      <a href="https://github.com/charile1"
        ><img
          src="https://avatars.githubusercontent.com/charile1"
          width="100px;"
          alt=""
        /><br /><sub><b>박경서</b></sub></a
      ><br />
    </td>
    <td align="center">
      <a href="https://github.com/leewooseong"
        ><img
          src="https://avatars.githubusercontent.com/leewooseong"
          width="100px;"
          alt=""
        /><br /><sub><b>이우성</b></sub></a><br />
    </td>
  </tr>
</table>

## UI 모듈 제작

| 이름       | 모듈                                     |
| ---------- | ---------------------------------------- |
| **문호균** | home-post, user-search, userfollow       |
| **박경서**   | top-\*                                   |
| **이우성** | buttons, text-Active-input               |
| **김채운** | product, tab-menu, comment, delete alert |

## page UI 및 기능 구현

| 이름       | pages                                           |
| ---------- | ----------------------------------------------- |
| **문호균** | splash, 로그인, 404 페이지     |
| **박경서**   | 회원가입, 피드(홈), 검색, 좋아요 버튼|
| **이우성** | 사용자 프로필 페이지, 채팅 목록 / 채팅방,  팔로워, 팔로잉 목록, 좋아요 버튼   |
| **김채운** | 내 프로필 수정 , 상품 등록, 게시글 댓글, 게시글 작성 페이지 , 좋아요 버튼                            |

### 로그인/로그아웃

- 초기 화면
  - 시작시 스플래쉬 화면 전환
  - 로그인을 하지 않은 경우 : 로그인 화면
  - 로그인이 되어있는 경우 : 감귤마켓 피드
- 로그인

  - 토큰을 사용해 로그인 구현
  - 입력에 대한 유효성 검사

- 회원가입
  - 이메일 주소 유효성 검사
  - 프로필 사진 등록
  - 계정 중복 확인

## 회원가입

- 로그인 메인 화면에서 `회원가입` 을 누르거나 이메일 로그인 화면에서 `이메일로 회원가입` 을 누르면 회원가입 화면이 나타납니다.
- 회원가입 페이지에서는 유효성 검사가 로그인 페이지와 조금 다르게 진행됩니다.
- 이메일 주소 또는 비밀번호를 입력하고 입력창에서 포커스를 잃으면 바로 유효성 검사가 진행되고 통과하지 못한 경우 경고 문구가 각 입력창 하단에 표시됩니다.
- 이메일 주소의 형식이 유효하지 않거나 이미 가입된 이메일일 경우,  또는 비밀번호가 6자 미만일 경우에는 각 입력창 하단에 경구 문구가 나타납니다.
- 입력창에 focus 될 경우에는 선의 색이 변합니다.(회색, #DBDBDB → 주황색, #F26E22)
- 작성이 완료된 후, 유효성 검사를 통과할 경우 `다음` 버튼이 활성화되며, 버튼을 클릭하면 프로필 설정 폼이 나타납니다.
- 프로필 설정에 필요한 프로필 사진, 사용자 이름(2~10자 이내), 계정 ID, 소개를 입력받습니다.
    - 프로필 사진은 등록하지 않을 경우 기본 이미지가 등록됩니다.
    - 사용자 이름과 소개는 다른 사용자와 중복될 수 있습니다.
    - 계정 ID는 중복이 불가합니다.
    - 프로필 설정에서도 같은 방식으로 유효성 검사가 진행됩니다. 계정 ID에 대한 중복 유무와 형식을 검사합니다.


![회원가입(1)](https://user-images.githubusercontent.com/89507327/150912995-e411f540-3e6f-409a-ba3d-9fc81d8d790c.gif)

<img width="200px" src="https://user-images.githubusercontent.com/89507327/150913204-8b55e16a-81e9-4407-aa6d-d65b2b97222c.gif">


<table>
  <tr>
    <td align="center">
        <img
          src="https://user-images.githubusercontent.com/89507327/150913204-8b55e16a-81e9-4407-aa6d-d65b2b97222c.gif"
          width="300px;"
          alt=""
        /><br/><sub><b>회원가입 유효성</b></sub><br />
    </td>
     <td align="center">
        <img
          src="https://user-images.githubusercontent.com/89507327/150913204-8b55e16a-81e9-4407-aa6d-d65b2b97222c.gif"
          width="300px;"
          alt=""
        /><br /><sub><b>회원가입 유효성</b></sub><br />
    </td>
   <td align="center">
        <img
          src="https://user-images.githubusercontent.com/89507327/150913204-8b55e16a-81e9-4407-aa6d-d65b2b97222c.gif"
          width="300px;"
          alt=""
        /><br /><sub><b>회원가입 유효성</b></sub><br />
    </td>
  </tr>
</table>

### userpage

- 사용자 프로필 페이지

  - 사용자 이름, 계정 ID, 소개, 팔로워 및 팔로잉 수, 판매 상품, 업로드한 게시글을 확인
  - 본인의 페이지인 경우, 프로필 수정과 상품 등록 가능
  - 게시글 조회 (목록형, 앨범형)
  - 게시글 삭제

- 팔로워, 팔로잉 목록

  - 해당 유저의 팔로워, 팔로잉 리스트 확인
  - 팔로우, 언팔로우 기능

- 게시물 등록
  - 텍스트 및 이미지 등록
  - 이미지 등록시 최대 3장까지 등록 가능
- 게시물 상세 조회
  - 게시물 클릭시 상세 조회
  - 좋아요 기능
  - 댓글 조회
  - 댓글 등록

### chat

- 채팅방
  - 텍스트 입력 후 전송시 UI상으로 메세지 전송 (실제 전송 x)
