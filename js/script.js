$(document).ready(function () {
  // 페이지 로드 시 #about 섹션을 활성화 상태로 설정
  $(".bodywrap section").removeClass("active");
  $("#about").addClass("active");

  // 페이지 로드 시 첫 번째 submenu 항목의 비디오를 자동으로 재생
  activateFirstVideo();

  // 탭 메뉴 클릭 시 해당하는 섹션 활성화
  $(".tabmenu li a").click(function (e) {
    e.preventDefault();

    const targetSection = $(this).attr("href");

    $(".bodywrap section").removeClass("active");
    $(targetSection).addClass("active");

    // 비디오 박스 초기화 및 첫 번째 비디오 활성화
    if (targetSection.startsWith("#content")) {
      activateFirstVideoInSection(targetSection);
    }

    $(".tabmenu li a").removeClass("active");
    $(this).addClass("active");

    // .submenu의 첫 번째 항목을 활성화
    activateFirstSubmenuLink(targetSection);
  });

  // .logo 클릭 시 #about 섹션으로 스크롤
  $(".logo").click(function (e) {
    e.preventDefault();

    $(".bodywrap section").removeClass("active");
    $("#about").addClass("active");

    $(".submenu li a").removeClass("active").css("background-color", "");
    muteAllVideos();
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

    // 현재 활성화된 submenu 항목의 배경을 흰색으로 변경
    $(".submenu li a").removeClass("active").css("background-color", "");
    $(this).addClass("active").css("background-color", "white");

    // 현재 활성화된 비디오의 소리만 켜기
    muteAllVideos();
    if (video) {
      video.muted = false;
    }
  });

  // 첫 번째 비디오를 활성화 및 재생
  function activateFirstVideo() {
    const $firstMenuLink = $(".submenu li:first-child a");
    const firstVideoId = $firstMenuLink.attr("href");

    const $firstSection = $(".bodywrap section.active");
    const $firstVideoItem = $firstSection.find(firstVideoId);

    $(".video-item").removeClass("active");
    $firstVideoItem.addClass("active");

    const video = $firstVideoItem.find("video")[0];
    if (video) {
      video.currentTime = 0;
      video.play();
      video.muted = false; // 첫 번째 비디오의 소리 켜기
    }

    // 첫 번째 submenu 항목의 배경을 흰색으로 설정
    $(".submenu li a").removeClass("active").css("background-color", "");
    $firstMenuLink.addClass("active").css("background-color", "white");
  }

  // 주어진 섹션의 첫 번째 비디오를 활성화 및 재생
  function activateFirstVideoInSection(section) {
    $(section).find(".video-item").removeClass("active");
    const $firstVideo = $(section).find(".video-item:first");
    $firstVideo.addClass("active");

    const video = $firstVideo.find("video")[0];
    if (video) {
      video.currentTime = 0;
      video.play();
      video.muted = false; // 첫 번째 비디오의 소리 켜기
    }
  }

  // 주어진 섹션의 첫 번째 submenu 링크를 활성화
  function activateFirstSubmenuLink(section) {
    const $activeSection = $(section);
    const $firstSubmenuLink = $activeSection.find(".submenu li:first-child a");

    $activeSection
      .find(".submenu li a")
      .removeClass("active")
      .css("background-color", "");
    $firstSubmenuLink.addClass("active").css("background-color", "white");

    // 첫 번째 비디오의 소리를 켭니다
    const firstVideoId = $firstSubmenuLink.attr("href");
    const $firstVideoItem = $activeSection.find(firstVideoId);
    const video = $firstVideoItem.find("video")[0];
    if (video) {
      video.muted = false;
    }
  }

  // 모든 비디오를 뮤트합니다
  function muteAllVideos() {
    $(".video-item video").each(function () {
      this.muted = true;
    });
  }
});
