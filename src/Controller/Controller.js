import OutputView from "../View/OutputView";
import InputView from "../View/InputView";

class Controller {

	#date;
	#menuList;

	constructor() {
		this.#date = 0;
		this.#menuList = [];
	}

	async play() {
		OutputView.printWelcome();
		const date = await InputView.readDate();
		this.#date = date;
		this.#menuList = await InputView.readMenu();
	}
}

export default Controller;