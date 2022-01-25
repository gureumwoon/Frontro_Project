# SNS 은이네 문방구 

멋쟁이사자처럼 프론트엔드 스쿨 1기 내 그룹으로 진행한 프로젝트입니다.  10-20대 팬시 상품에 관심이 있는 사람들을 타겟으로, 문구 제품 등을 구매하거나 공유할 수 있는 플랫폼입니다. 

문구상품이라는 공통된 주제로 서로 일상을 공유하고 SNS 활동을 통해 소통을 할 수 있습니다. 

글과 사진과 함께 게시물을 작성하여 자신의 일상을 공유할 수 있습니다. 다른 사용자를 팔로우하면 유저가 올린 게시물을 홈 피드에서 소식을 확인할 수도 있습니다. 또한 다른 사용자와 메시지를 주고 받을 수 있습니다. 


## Stack

### Frontend

- HTML
- CSS
- JavaScript

### Backend

- 제공된 API 사용

## product

[피그마](https://www.figma.com/file/B8eOhMJbVSxL47lWaVqVTm/%EC%9D%80%EB%B0%A9%EA%B5%AC)

[은이네 문방구]("배포주소")

# 역할

## Member

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

## UI 모듈 제작 (수정 전)

| 이름       | 모듈                                     |
| ---------- | ---------------------------------------- |
| **문호균** | home-post, user-search, userfollow       |
| **박경서**   | top-\*                                   |
| **이우성** | buttons, text-Active-input               |
| **김채운** | product, tab-menu, comment, delete alert |

## Page UI 및 기능 구현

| 이름       | pages                                           |
| ---------- | ----------------------------------------------- |
| **문호균** | splash, 로그인, 404 페이지     |
| **박경서**   | 회원가입, 피드(홈), 검색, 좋아요 버튼|
| **이우성** | 사용자 프로필 페이지, 채팅 목록 / 채팅방,  팔로워, 팔로잉 목록, 좋아요 버튼   |
| **김채운** | 내 프로필 수정 , 상품 등록, 게시글 댓글, 게시글 작성 페이지 , 좋아요 버튼                            |


## 회원가입 (박경서)

- 회원가입 화면 이동
    - 로그인 메인 화면에서 `회원가입` 을 누르거나 이메일 로그인 화면에서 `이메일로 회원가입` 을 누르면 회원가입 화면이 나타납니다.
- 회원가입 유효성 검사
    - 이메일 주소 또는 비밀번호를 입력하고 입력창에서 포커스를 잃으면 바로 유효성 검사가 진행되고 통과하지 못한 경우 경고 문구가 각 입력창 하단에 표시됩니다.
    - 이메일 주소의 형식이 유효하지 않거나 이미 가입된 이메일일 경우, 또는 비밀번호가 6자 미만일 경우에는 각 입력창 하단에 경구 문구가 나타납니다.
    - 입력창에 focus 될 경우에는 선의 색이 변합니다.(회색, #DBDBDB → 노란색, #EB5757)
    - 작성이 완료된 후, 유효성 검사를 통과할 경우 `다음` 버튼이 활성화되며, 버튼을 클릭하면 프로필 설정 폼이 나타납니다.
- 프로필 설정
    - 프로필 설정에 필요한 프로필 사진, 사용자 이름(2~10자 이내), 계정 ID, 소개를 입력받습니다.
    - 프로필 사진은 등록하지 않을 경우 기본 이미지가 등록됩니다.
    - 사용자 이름과 소개는 다른 사용자와 중복될 수 있습니다.
    - 계정 ID에 대한 중복 유무와 형식을 검사합니다.
    - 작성이 완료된 후, 유효성 검사를 통과할 경우 `은이네 문방구 시작하기` 버튼이 활성화되며, 버튼을 클릭하면 다시 로그인 페이지가 나타납니다.

<!-- <p align="center" >
<kbd>
<img width="300px" style = "border : 1px solid" src= "https://user-images.githubusercontent.com/89507327/150913204-8b55e16a-81e9-4407-aa6d-d65b2b97222c.gif">
</kbd>
</p> -->

<table>
  <tr>
    <td align="center">
        <img
          src="https://user-images.githubusercontent.com/89507327/150941506-775d8215-e64b-4707-b7e3-2dbb52143a50.gif"
          width="300px;"
          alt=""
        /><br/><sub><b>회원가입 화면 이동</b></sub><br />
    </td>
     <td align="center">
        <img
          src="https://user-images.githubusercontent.com/89507327/150942314-4a09a24f-84e9-4087-ab1c-c4a9122cffbd.gif"
          width="300px;"
          alt=""
        /><br /><sub><b>회원가입 유효성 검사</b></sub><br />
    </td>
   <td align="center">
        <img
          src="https://user-images.githubusercontent.com/89507327/150945741-91513041-d691-4ee0-91f9-48fa6c251700.gif"
          width="300px;"
          alt=""
        /><br /><sub><b>프로필 설정 폼</b></sub><br />
    </td>
  </tr>
</table>


## 은이네 문방구 피드 (박경서)

- 은이네 문방구 피드는 사용자들이 올린 게시글들이 표시되는 페이지입니다.

- 팔로우가 없는 경우
    - 팔로우한 사용자가 없을 경우와 내가 팔로우한 사용자가 올린 게시글이 없는 경우 "유저를 검색해 팔로우 해보세요!" 문구와 함께 `검색하기` 버튼이 표시됩니다.
- 팔로우가 있는 경우
    - 자신이 팔로우한 사용자의 게시글만 확인할 수 있습니다.
    - `댓글 아이콘` 클릭 시 상세 페이지 이동이 가능합니다.
    - `더보기 버튼`을 클릭하면 신고하기 모달 창이 뜹니다.
    - 가로스크롤로 사용자의 이미지 슬라이드를 확인 할 수 있습니다. 
    - `사용자 프로필 사진, 사용자 이름, 계정 ID` 클릭 시 해당하는 유저의 프로필로 이동합니다. 
- 좋아요 기능
    - 게시글 하단에는 하트 모양에 좋아요 버튼이 있습니다.
    - 빈 하트를 클릭하면 색이 칠해지고 좋아요 수가 증가하고, 색이 칠해진 하트를 클릭하면 빈 하트로 변하고 좋아요 수가 감소합니다.



<table>
  <tr>
    <td align="center">
        <img
          src="https://user-images.githubusercontent.com/89507327/150957884-404c20ee-497b-4112-9926-507ad037e7f8.gif"
          width="300px;"
          alt=""
        /><br/><sub><b>팔로워가 없는 경우</b></sub><br />
    </td>
     <td align="center">
        <img
          src="https://user-images.githubusercontent.com/89507327/150957985-f673da31-d096-480e-aa40-c46fc635a444.gif"
          width="300px;"
          alt=""
        /><br /><sub><b>팔로워가 있는 경우</b></sub><br />
    </td>
   <td align="center">
        <img
          src="https://user-images.githubusercontent.com/89507327/150958286-88467eae-0b65-486a-8503-bdfba083e816.gif"
          width="300px;"
          alt=""
        /><br /><sub><b>좋아요 기능, 모달창 구현, 이미지 슬라이드
        </b></sub><br />
    </td>
  </tr>
</table>


### 검색 (박경서)

- 은이네 문방구 피드 상단에 돋보기 버튼(검색 버튼)을 클릭하면 표시되는 페이지입니다.
- 사용자 이름을 검색할 수 있는 페이지입니다.
- 현재 마크업만 구현, 기능 구현 예정 

<p align="center" >
<kbd>
<img width="300px" style = "border : 1px solid" src= "https://user-images.githubusercontent.com/89507327/150961335-2cfe98b8-b535-442b-bcf9-9750df68d237.png">
</kbd>
</p>