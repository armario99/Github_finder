// Init Github
const github = new Github;  //github.js의 클래스
// Init UI
const ui = new UI;          //ui.js의 클래스

// Search input
const searchUser = document.getElementById('searchUser'); //input 요소

// Search input event listener
searchUser.addEventListener('keyup', (e) => {
  // Get input text // 사용자가 키를 입력할 때 마다 EventListener 동작
  //입력된 텍스트를 가져와 userText에 저장
  const userText = e.target.value;

  if(userText !== ''){
   // Make http call  //Github 클래스의 getUser 메서드를 호출하여 사용자 이름을 기반으로 HTTP 요청
   github.getUser(userText)
    .then(data => {
      if(data.profile.message === 'Not Found') {
        // Show alert //사용자가 존재하지 않을 경우에는 'User not found' 경고
        ui.showAlert('User not found', 'alert alert-danger');
      } else {
        // Show profile //사용자 프로필과 레포지토리 목록을 표시
        ui.showProfile(data.profile);
        ui.showRepos(data.repos);
      }
      console.log(data)
    })
  } else {
    // Clear profile //검색 상자가 비어있는 경우에는 사용자 프로필을 지우고 UI를 초기화
    ui.clearProfile();
  }
}); 

