import { MissionUtils } from "@woowacourse/mission-utils";
import { MESSAGE, NUMBER } from "../Constant/constant";
import { print } from "../Utils/Utils";
import { checkRandomNumber } from "../Validates";

const { Random } = MissionUtils;
const participantsDistance = {};

/**
 * 참가자의 진행여부를 판단하기 위한 값들을 전송하는 함수
 * @param {*} participants : 참가자 명단
 * @param {*} participantsDistance : 참가자 거리
 * @returns 회당 참가자 거리를 반환
 */
const xxx = async (participants) => {
  let index = 0;
  while (index < participants.length) {
    await changeDistance(participants, index);
    index++;
  }
};

/**
 * 각 참가자 진행여부를 판단하고 결과를 반환하며 진행거리를 숫자로 보관해 비교를 쉽게 함
 * @param {*} participants : 참가자 명단
 * @param {*} index : 순서
 * @returns randomNumber에 따른 참가자 거리를 반환, "참가자" : ["거리", 총 거리 길이(number)]
 */
const changeDistance = async (participants, index) => {
  const randomNumber = Random.pickNumberInRange(NUMBER.MIN, NUMBER.MAX);
  await checkRandomNumber(randomNumber);

  const name = participants[index];
  if (randomNumber >= NUMBER.STANDARD) {
    participantsDistance[name] = participantsDistance[name]
    ? [participantsDistance[name][0] + '-', participantsDistance[name][1] + 1]
    : ['-', 1];
  } else {
    participantsDistance[name] = participantsDistance[name] ? [...participantsDistance[name]] : ['', 0];
  }

};

/**
 * 매 게임 진행마다 참가자 진행 결과를 출력
 * @param {*} participants : 참가자 명단
 * @param {*} participantsDistance : 참가자 거리
 */
const showResult = async (participants) => {
  for (let i = 0; i < participants.length; i++) {
    const result = `${participants[i]} : ${
      participantsDistance[participants[i]][0]
    }`;
    print(result);
  }
};

/**
 * 실제 게임 진행 부분
 * @param {*} attempt : 총 실행 횟수
 * @param {*} participants : 참가자 명단
 * @param {*} distance : APP에서 참가자 상태를 관리하는 전역 변수
 * @returns 최종 참가자 거리를 반환
 */
export const progress = async (attempt, participants) => {
  print(MESSAGE.RESULT);
  for (let i = 0; i < attempt; i++) {
    await xxx(participants);
    await showResult(participants);
  }

  return participantsDistance;
};
