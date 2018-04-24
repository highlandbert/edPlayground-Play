
export default class AuthService {

	static getCredentials() {
		return JSON.parse(window.localStorage.getItem('auth'));
	}

	static hasCredentials() {
		return window.localStorage.getItem('auth') !== null;
	}

	static getUsername() {
		return this.hasCredentials()
			? this.getCredentials().username
			: 'Stranger';
	}

	static getUserId() {
    return this.hasCredentials()
      ? this.getCredentials()._id
      : 0;
  }

	static doLogin() {
		this.deleteCredentials();
		window.location.href = "/auth";
	}
}