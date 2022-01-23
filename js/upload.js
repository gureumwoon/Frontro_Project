const profileImg = document.querySelector('.profile-pic');
const textarea = document.querySelector('.upload-txt');
const prevImg = document.querySelector('.prev-img');
const backBtn = document.querySelector('.back-btn');
const txtContent = document.querySelector('.post-content> textarea');
const token = localStorage.getItem("Token")
let imgIndex = 0;
const formData = new FormData();


backBtn.addEventListener('click', () => {
    history.back();
})

function resize(obj) {
    obj.style.height = '1px';
    obj.style.height = (12 + obj.scrollHeight) + 'px';
}

function loadFile(e) {
    if (3 < e.files.length) {
        alert('이미지는 3장까지만 가능합니다.');
        return
    }
    for (const file of e.files) {
        const list = document.createElement('li');
        const button = document.createElement('button');
        const oImg = document.createElement("img"); // 사진 이미지
        const oImg2 = document.createElement("img"); // x버튼 이미지

        prevImg.appendChild(list);
        list.appendChild(oImg);
        list.appendChild(button);
        button.appendChild(oImg2);
        if (e.files.length === 1) {
            list.setAttribute('id', `img${imgIndex}`);
            button.classList.add('img-cancel-btn');
            oImg2.setAttribute('src', 'src/png/x.png');
            oImg2.setAttribute('alt', '사진 업로드 취소 버튼');
            oImg.setAttribute('src', URL.createObjectURL(file));
            oImg.setAttribute('alt', 'previewimg');
            oImg.setAttribute('height', '228px');
            oImg.setAttribute('width', '304px');
            return;
        }
        list.setAttribute('id', `img${imgIndex}`);
        button.classList.add('img-cancel-btn');
        oImg2.setAttribute('src', 'src/png/x.png');
        oImg2.setAttribute('alt', '사진 업로드 취소 버튼');
        oImg.setAttribute('src', URL.createObjectURL(file));
        oImg.setAttribute('alt', 'previewimg');
        oImg.setAttribute('height', '126px');
        oImg.setAttribute('width', '168px');

        oImg2.addEventListener('click', deletePrevImg(imgIndex));

        formData.append(imgIndex++, file);
    }
}

function deletePrevImg(imgIndex) {
    return () => {
        formData.delete(`img${imgIndex}`)
        document.getElementById(`img${imgIndex}`).remove()
    }
}

// fetch

const $image = document.querySelector("#real-input")
const $content = document.querySelector(".upload-txt")
const $submitBtn = document.querySelector("#submit-btn")
//여기부터
async function imageUpload(files, index) {
    const formData = new FormData();
    formData.append("image", files[index]);//formData.append("키이름","값")
    const res = await fetch(`http://146.56.183.55:5050/image/uploadfile`, {
        method: "POST",
        body: formData
    })
    const data = await res.json()
    const productImgName = data["filename"];
    return productImgName
}
async function createPost(e) {
    const url = "http://146.56.183.55:5050"
    //입력한 텍스트 불러와야함
    const contentText = $content.value
    //여기는 나중에 이미지 주소가 추가될 예정
    const imageUrls = []
    const files = $image.files
    //file갯수를 판별하여 3개 이하일때만 실행하게한다.
    if (files.length <= 3) {
        // file을 입력한 갯수만큼 반복해서 실행합니다. 여기서 이미지 url배열에 추가되는부분
        for (let index = 0; index < files.length; index++) {
            const imgurl = await imageUpload(files, index)
            //완성된 url을 만들어서 넣어준다.
            imageUrls.push(url + "/" + imgurl)
        }
        const res = await fetch(url + "/post", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,//토큰을 넣어줍니다. 
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "post": {
                    "content": contentText,
                    "image": imageUrls + '' //"imageurl1", "imageurl2" 형식으로 
                }
            })
        })
        const json = await res.json()
        console.log(json);
        location.href = "my_profile.html"
    } else {
        alert("아 이미지 갯수가 너무 많소")
    }

}
//여기까지 이미지 여러개 업로드하기.

async function getPostData() {
    const queryString = window.location.href.split('?')[1]
    const searchParams = new URLSearchParams(queryString)
    console.log("searchparams: ", searchParams)
    const postId = searchParams.get('id');
    const res = await fetch(`http://146.56.183.55:5050/post/${postId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    console.log(data);
    profileImg.src = data.post.author.image
    txtContent.value = data.post.content;
    dataImg = data.post.image
    for (const contentImg of dataImg) {
        prevImg.innerHTML += `
     <li>
        <img src=${contentImg}  alt="업로드 할 이미지1">
        <button class="img-cancel-btn">
            <img src="src/png/x.png" alt="사진 업로드 취소 버튼">
        </button>
     </li>
     `
        $submitBtn.classList.add('active')
    }
    deletePrevImg(dataImg);
}

if (queryString) {
    getPostData();
}

async function putData() {
    const queryString = window.location.href.split('?')[1]
    const searchParams = new URLSearchParams(queryString)
    console.log("searchparams: ", searchParams)
    const postId = searchParams.get('id');
    const imageUrls = []
    const content = textarea.value;

    const res = await fetch(`http://146.56.183.55:5050/post/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            post: {
                content: content,
                image: imageUrls + '',
            },
        }),
    });
    const data = await res.json();
    console.log(data);
    if (data) {
        alert('업로드 성공');
        location.href = `/pages/post.html?${data.post.id}`;
    } else {
        alert('업로드 실패');
    }
}

txtContent.addEventListener('input', () => {
    uploadBtnCheck()
})

function uploadBtnCheck() {
    if (txtContent.value && ($image.value || dataImg.length)) {
        $submitBtn.disabled = false;
        $submitBtn.classList.add('active')
    } else {
        $submitBtn.disabled = true;
        $submitBtn.classList.remove('active')
    }
}

$submitBtn.addEventListener('click', (e) => {
    const queryString = window.location.href.split('?')[1]
    const searchParams = new URLSearchParams(queryString)
    console.log("searchparams: ", searchParams)
    const postId = searchParams.get('id');
    if (postId) {
        putData()
    } else {
        createPost()
    }
});





