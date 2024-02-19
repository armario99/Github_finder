class Github {
  constructor() {
    //GitHub API에 접근하기 위해 클라이언트 ID 및 시크릿을 사용
    this.client_id = 'e932ba1d163e2d200af4';
    this.client_secret = '0e1ae9f3a7ec4b8dbdf6ab4108dd7af75030dfbb';
    this.repos_count = 5;
    this.repos_sort = 'created: asc';
  }
  //GitHub API는 일정 시간 동안 허용된 요청 횟수를 초과하면 일시적으로 더 이상의 요청을 허용하지 않을 수 있다.
  async getUser(user) {
    //사용자 이름을 매개변수로 받아와 해당 사용자의 프로필 및 레포지토리 정보를 가져온다
    const profileResponse =
      await fetch(
        //fetch 함수를 통해 GitHub API에 HTTP 요청을 보내고, 해당 응답을 기다립니다.
        `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
      );

    const repoResponse =
      await fetch(
        `https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`
      );
    //각각 프로필 및 레포지토리 응답을 JSON 형식으로 파싱
    const profile = await profileResponse.json();
    const repos = await repoResponse.json();

    return {
      profile,
      repos
    }
  }
}