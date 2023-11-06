import { print } from "./view/print";
import { readLineAsync } from "./view/readLineAsync";
import { MissionUtils } from "@woowacourse/mission-utils";
import { MESSAGE } from "./constant/MESSAGE";
import { LOTTO_SETTINGS } from "./constant/LOTTO_SETTINGS";
import Lotto from "./model/Lotto";
import Money from "./model/Money";
import LottoAnswer from "./model/LottoAnswer";

const { Random } = MissionUtils;

const printProgressNumber = async (progressNumber) => {
  print(`\n${progressNumber}${MESSAGE.TOTAL_PURCHASE}`);
}

// Lotto class
// ----------- 로또 발행
const totalLotto = []; // 전체 로또 번호 보관
// 발행한 로또 수량 및 번호를 출력한다.
const drawLottoNumber = async () => {
  const lotto = Random.pickUniqueNumbersInRange(LOTTO_SETTINGS.LOTTO_MIN_NUMBER, LOTTO_SETTINGS.LOTTO_MAX_NUMBER, LOTTO_SETTINGS.LOTTO_LENGTH);
  const lottoNumber = new Lotto(lotto).getLottoNumber();
  totalLotto.push(lottoNumber);
};

// 발행한 로또 출력
const printLotto = (totalLotto) => {
  const lotto = totalLotto
  .map((numbers) => `[${numbers.join(", ")}]`)
  .join("\n");

  print(lotto);
}


class App {

  async play() {
    // setting
    let money;
    try{
      const inputMoney = await readLineAsync(MESSAGE.INPUT_AMOUNT); // 구입금액을 입력해 주세요.
      money = new Money(inputMoney);
    } catch(error) {
      print(error.message);
      const inputMoney = await readLineAsync(MESSAGE.INPUT_AMOUNT); // 구입금액을 입력해 주세요.
      money = new Money(inputMoney);
    }
    console.log(money);
    //---------------
    const progressNumber = money.getMoney() / 1000;
    await printProgressNumber(progressNumber); // 게임 횟수 출력
    // 번호 출력
    for (let i=0; i < progressNumber; i++) {
      await drawLottoNumber();
    }
    printLotto(totalLotto); // 발행한 로또 출력

    // 번호 입력 받기
    let answer;
    try{
      const inputAnswerNumber = await readLineAsync(MESSAGE.INPUT_WINNING_NUMBERS);
      answer = new LottoAnswer(inputAnswerNumber);

      const inputBonusNumber = await readLineAsync(MESSAGE.INPUT_BONUS_NUMBER);
      answer.setBonusNumber(inputBonusNumber);
    } catch(error) {
      print(error.message);
    }
    // 정답과 보너스 번호
    const {answerNumber, bonusNumber} = answer.getFullNumber();

    // 결과 계산

    
  }

}

export default App;
