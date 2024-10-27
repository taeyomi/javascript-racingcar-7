import { Console, MissionUtils } from "@woowacourse/mission-utils";
import Car from "./car.js";
import { validateCarName, countValidate, resetCarSet } from "./validation.js";
import { INPUT_CAR_NAME, INPUT_COUNT_EXECUTE } from "./constant.js";
class RacingGame {
  constructor() {
    this.cars = [];
    this.counts = "";
    this.startGame();
  }

  async init() {
    while (true) {
      const isValidInput = await this.getUserInput();
      if (isValidInput) {
        break;
      }
    }
  }

  async getUserInput() {
    try {
      const userInputNames = await Console.readLineAsync(INPUT_CAR_NAME);
      const names = userInputNames.split(",");
      this.checkCarName(names);
      const userInputCounts = await Console.readLineAsync(INPUT_COUNT_EXECUTE);
      countValidate(userInputCounts);
      this.counts = userInputCounts;
      return true;
    } catch (error) {
      this.handleInitError(error);
      return false;
    }
  }

  handleInitError(error) {
    Console.print(error.message);
    this.cars = [];
    resetCarSet();
  }

  checkCarName(names) {
    names.forEach((element) => {
      const name = element.trim();
      validateCarName(name);
      this.cars.push(new Car(name));
    });
  }

  getScores() {
    this.cars.forEach((car) => {
      if (MissionUtils.Random.pickNumberInRange(0, 9) >= 4) {
        car.score += "-";
      }
      Console.print(`${car.name} : ${car.score} `);
    });
    Console.print("");
  }

  async startGame() {
    await this.init();
    Console.print("실행 결과");
    for (let i = 0; i < this.counts; i++) {
      this.getScores();
    }
    this.printWinner();
  }

  printWinner() {
    let winners = "";
    let maxScore = 0;
    this.cars.forEach((e) => {
      if (maxScore == e.score.length) {
        winners += `, ${e.name}`;
      } else if (maxScore <= e.score.length) {
        maxScore = e.score.length;
        winners = e.name;
      }
    });
    Console.print(`최종 우승자: ${winners}`);
  }
}

export default RacingGame;
