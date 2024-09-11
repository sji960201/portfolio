$(document).ready(function () {
  // 페이지 로드 시 #about 섹션을 활성화 상태로 설정
  $(".bodywrap section").removeClass("active");
  $("#about").addClass("active");

  // 페이지 로드 시 첫 번째 submenu 항목의 비디오를 자동으로 재생
  const $firstMenuLink = $(".submenu li:first-child a");
  const firstVideoId = $firstMenuLink.attr("href");

  const $firstSection = $(".bodywrap section.active");
  const $firstVideoItem = $firstSection.find(firstVideoId);

  // 첫 번째 비디오 항목을 활성화
  $(".video-item").removeClass("active");
  $firstVideoItem.addClass("active");

  // 첫 번째 비디오를 재생
  const video = $firstVideoItem.find("video")[0];
  if (video) {
    video.currentTime = 0; // 비디오를 처음부터 시작하도록 설정
    video.play(); // 비디오 재생
  }

  // 탭 메뉴 클릭 시 해당하는 섹션 활성화
  $(".tabmenu li a").click(function (e) {
    e.preventDefault();

    const targetSection = $(this).attr("href");

    $(".bodywrap section").removeClass("active");
    $(targetSection).addClass("active");

    // 비디오 박스 초기화 및 첫 번째 비디오 활성화
    if (targetSection.startsWith("#content")) {
      $(targetSection).find(".video-item").removeClass("active");
      const $firstVideo = $(targetSection).find(".video-item:first");
      $firstVideo.addClass("active");

      // 첫 번째 비디오만 재생
      const video = $firstVideo.find("video")[0];
      if (video) {
        video.currentTime = 0; // 비디오를 처음부터 시작하도록 설정
        video.play(); // 비디오 재생
      }
    }

    $(".tabmenu li a").removeClass("active");
    $(this).addClass("active");

    $(".submenu li a").removeClass("active");
  });

  // .logo 클릭 시 #about 섹션으로 스크롤
  $(".logo").click(function (e) {
    e.preventDefault();

    $(".bodywrap section").removeClass("active");
    $("#about").addClass("active");

    $(".submenu li a").removeClass("active");
  });

  // .submenu의 링크 클릭 시 해당하는 video 아이템 활성화
  $(".submenu li a").click(function (e) {
    e.preventDefault();

    const targetVideo = $(this).attr("href");

    const $activeSection = $(".bodywrap section.active");
    $activeSection.find(".video-item").removeClass("active");
    const $targetVideo = $activeSection.find(targetVideo);
    $targetVideo.addClass("active");

    // 비디오 재생
    const video = $targetVideo.find("video")[0];
    if (video) {
      video.currentTime = 0; // 비디오를 처음부터 시작하도록 설정
      video.play(); // 비디오 재생
    }

    $(".submenu li a").removeClass("active");
    $(this).addClass("active");
  });
});
