const textarea = document.querySelector('.upload-txt')
const prevImg = document.querySelector('.prev-img')
let imgIndex = 0;
const formData = new FormData()


function resize(obj) {
    obj.style.height = '1px';
    obj.style.height = (12 + obj.scrollHeight) + 'px';
}

function loadFile(e) {
    if (3 < e.files.length) {
        alert('이미지는 3장까지만 가능합니다.')
        return
    }
    for (const file of e.files) {
        const list = document.createElement('li');
        const button = document.createElement('button')
        const oImg = document.createElement("img");
        const oImg2 = document.createElement("img");

        prevImg.appendChild(list);
        list.appendChild(oImg)
        list.appendChild(button)
        button.appendChild(oImg2);
        if (e.files.length === 1) {
            list.setAttribute('id', `img${imgIndex}`)
            button.classList.add('img-cancel-btn');
            oImg2.setAttribute('src', 'src/png/x.png');
            oImg2.setAttribute('alt', '사진 업로드 취소 버튼');
            oImg.setAttribute('src', URL.createObjectURL(file));
            oImg.setAttribute('alt', 'previewimg');
            oImg.setAttribute('height', '228px');
            oImg.setAttribute('width', '304px');
            return;
        }
        list.setAttribute('id', `img${imgIndex}`)
        button.classList.add('img-cancel-btn');
        oImg2.setAttribute('src', 'src/png/x.png');
        oImg2.setAttribute('alt', '사진 업로드 취소 버튼');
        oImg.setAttribute('src', URL.createObjectURL(file));
        oImg.setAttribute('alt', 'previewimg');
        oImg.setAttribute('height', '126px');
        oImg.setAttribute('width', '168px');

        oImg2.addEventListener('click', deletePrevImg(imgIndex))

        formData.append(imgIndex++, file)
    }
}

function deletePrevImg(imgIndex) {
    return () => {
        formData.delete(`img${imgIndex}`)
        document.getElementById(`img${imgIndex}`).remove()
    }
}

async function uploadImg() {
    const newFormData = new FormData()
    const files = [...formData.values()]
    for (const file of files) {
        newFormData.append('images', file)
    }
    const url = "http://146.56.183.55:5050"
    try {
        const response = await fetch(url + "/image/uploadfiles", {
            method: "POST",
            body: newFormData
        });

        const data = await response.json();
        console.log(data)
    } catch (err) {
        console.error(err)
    }
}


