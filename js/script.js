jQuery(document).ready(function () {
  // 처음 페이지 로드 시 #about 섹션을 활성화 상태로 설정
  $(".bodywrap section").removeClass("active");
  $("#about").addClass("active");

  // 탭 메뉴 클릭 시 해당하는 섹션 활성화
  $(".tabmenu li a").click(function (e) {
    e.preventDefault();

    // 클릭된 탭의 href 속성 값 (섹션의 ID)을 가져오기
    const targetSection = $(this).attr("href");

    // 모든 섹션에서 active 클래스를 제거하고, 클릭한 섹션에 active 클래스 추가
    $(".bodywrap section").removeClass("active");
    $(targetSection).addClass("active");

    // 비디오 박스 초기화 및 첫 번째 비디오 활성화
    if (targetSection.startsWith("#content")) {
      // 현재 섹션의 비디오 박스를 초기화
      $(targetSection).find(".video-item").removeClass("active");
      $(targetSection).find(".video-item:first").addClass("active"); // 기본 비디오로 첫 번째 비디오 활성화
    }
  });

  // .logo 클릭 시 #about 섹션으로 스크롤
  $(".logo").click(function (e) {
    e.preventDefault();

    // #about 섹션에 active 클래스 추가
    $(".bodywrap section").removeClass("active");
    $("#about").addClass("active");
  });

  // .submenu의 링크 클릭 시 해당하는 video 아이템 활성화
  $(".submenu li a").click(function (e) {
    e.preventDefault();

    // 클릭된 서브메뉴의 href 속성 값 (비디오의 ID)을 가져오기
    const targetVideo = $(this).attr("href");

    // 현재 활성화된 섹션의 비디오 아이템을 활성화
    const $activeSection = $(".bodywrap section.active");
    $activeSection.find(".video-item").removeClass("active");
    $activeSection.find(targetVideo).addClass("active");
  });

  // .submenu의 li 클릭 시 배경색 변경
  $(".submenu li").click(function (e) {
    // 모든 서브메뉴 항목에서 'clicked' 클래스를 제거합니다.
    $(".submenu li").removeClass("clicked");

    // 클릭된 서브메뉴 항목에 'clicked' 클래스를 추가하여 배경색을 변경합니다.
    $(this).parent().addClass("clicked");
  });
});
