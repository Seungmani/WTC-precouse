import Menu from "../src/Model/Menu";

describe("Menu 클래스 테스트", () =>{
	test("메뉴를 입력하지 않으면 에러", () => {
		expect(() => {
			new Menu([ '' ]);
		}).toThrow('[ERROR] 메뉴를 입력해 주세요');
	});
	test.each([
		[[ '티본스테이크', '바비큐립-1', '초코케이크-2', '제로콜라-1' ]],
		[[ '티본스테이크-1', '바비큐립1', '초코케이크-2', '제로콜라-1' ]],
		[[ '티본스테이크-1', '바비큐립-1', '초코케이크#2', '제로콜라-1' ]],
		[[ '티본스테이크-1', '바비큐립-1', '초코케이크-2', '제로콜라-123' ]],
		[[ '티본스테이크-1', '바비큐립-1', '초코케이크-2', '제로콜라--23' ]],
		[[ '티본스테이크-1', '바비큐립-1', '초코케이크-2제로콜라-1' ]],
		[[ '티본스테이크-1', '바비큐립-1', '초코케이크2제로콜라-1' ]],
		[[ '-1', '바비큐립-1', '초코케이크2제로콜라-1' ]],
		[[ '-', '바비큐립-1', '초코케이크2제로콜라-1' ]],
		[[ '티본스테이크-', '바비큐립-1', '초코케이크2제로콜라-1' ]],
		[[ '티본스테이크-2 ', '바비큐립-1', '초코케이크-2', '제로콜라-1' ]],
		[[ '티본스테이크-2', '바비큐립- 1', '초코케이크-2', '제로콜라-1' ]],
		[[ '티본스테이크-2', '바비큐립-1', '초코케이크- 2 ', '제로콜라-1' ]],
		[[ '티본스테이크 -2', '바비큐립-1', '초코케이크-2 ', '제로콜라-1' ]],
		[[ ' 티본스테이크-2', '바비큐립-1', '초코케이크-2 ', '제로콜라-1' ]],
		[[ ' 티본스테이크 -2', '바비큐립-1', '초코케이크-2 ', '제로콜라-1' ]],
	])
	("메뉴-개수 입력 형식이 다르면 에러", (input) => {
		expect(() => {
			new Menu(input);
		}).toThrow("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
	});
	test.each([
		[["티본테이크-1"]],
		[["바비큐립초코케이크-1"]],
	])
	("메뉴가 없으면 에러", (input) => {
		expect(() => {
			new Menu(input);
		}).toThrow("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
	});
	test("메뉴가 중복이면 에러", () => {
		expect(() => {
			new Menu(["티본스테이크-1", "티본스테이크-3"]);
		}).toThrow("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
	});
	test.each([
		[[ '티본스테이크-20', '바비큐립-1', '초코케이크-2', '제로콜라-1' ]],
		[[ '티본스테이크-7', '바비큐립-8', '초코케이크-9', '제로콜라-10' ]],
	])
	("총 주문 개수가 20개 초과면 에러 ", (input) => {
		expect(() => {
			new Menu(input);
		}).toThrow("[ERROR] 총 메뉴 주문 수는 20개를 초과할 수 없습니다. 다시 입력해 주세요.");
	});
	test("주문 개수가 숫자가 0인 경우 ", () => {
		expect(() => {
			new Menu(['티본스테이크-0']);
		}).toThrow("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
	});
	test("주문을 음료만 한 경우", () => {
		expect(() => {
			new Menu(['제로콜라-1', '레드와인-1']);
		}).toThrow("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
	});
})