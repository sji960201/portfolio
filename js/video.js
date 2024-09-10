window.addEventListener("load", () => {
  // 모달 관련 변수
  const modal = document.getElementById("modal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const youtubeVideo = document.getElementById("youtubeVideo");
  // 카드 컨테이너 변수
  const cardContainer = document.getElementById("cardContainer");

  // JSON 파일을 연동하여 카드 목록을 생성
  fetch("data/video.json")
    .then((response) => {
      //    console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      createCardList(data);
    })
    .catch((error) => console.error(error));

  // 카드 목록 생성 함수
  const createCardList = (data) => {
    let tags = "";
    const videos = data.videos;
    //   console.log(videos);
    //   console.log(videos[0].description);

    videos.forEach((video) => {
      //    console.log(video);
      // html 임시 태그 만들기
      let tempTag = "";
      tempTag = `   
   <div class="card" data-video-id="${video.videoId}">
    <img
     class="thumbnail"
     src="${video.thumbnail}"
     alt="${video.title}"
    />
   </div>`;

      console.log(tempTag);
      tags = tags + tempTag;
      console.log(tags);
    });

    console.log(cardContainer);
    cardContainer.innerHTML = tags;

    // 카드 클릭 이벤트 함수 호출
    clickCard();
  };

  // 카드 클릭 이벤트 함수 정의
  const clickCard = () => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      console.log(card);
      card.addEventListener("click", () => openModal(card));
    });
  };

  // 모달 열기 함수
  const openModal = (card) => {
    const videoId = card.getAttribute("data-video-id");
    const description = card.getAttribute("data-description");

    youtubeVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;

    modal.style.display = "block";
  };

  // 모달 닫기 함수
  const closeModal = () => {
    modal.style.display = "none";
    youtubeVideo.src = "";
  };

  // 모달 닫기 버튼 클릭 시 모달 닫기
  closeModalBtn.addEventListener("click", closeModal);

  // 모달 외부 배경 클릭 시 모달 닫기
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
});
