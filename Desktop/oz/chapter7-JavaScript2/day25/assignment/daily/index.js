// 1. JSON 직렬화와 undefined 처리
    /*
    JSON.stringify()메서드는 객체 내에서 undefined속성을 무시한다.(`undefined`로 설정된 속성은 결과 JSON 문자열에 포함되지 않는다.)
    */

// 2. 배열 내의 undefined 값 처리
    /*
    JSON.stringify()는 이를 null로 처리한다.
    */

// 3. Date 객체의 직렬화 결과
    /*
    원래의 객체가 아닌, 문자열로 변환된 상태로 직렬화된다.(ISO 8601문자열로 변환)
    */    

// 4. Date 객체의 복원
    /*
    JSON.parse(JSON.stringify(new Date())); 의 실행 결과
    -> `Date` 객체가 아닌 ISO8601 형식의 문자열.(`Date` 객체는 직렬화 후 복원되지 않고 단순한 문자열로 변환됨)

// 5. JSON에서 지원하지 않는 데이터 타입
    /*  1. `Function`: 함수는 JSON으로 직렬화할 수 없다.
        2. `Symbol`: 심볼은 JSON으로 직렬화할 수 없다.
        3. `BigInt`: BigInt 타입은 JSON으로 직렬화할 수 없다.
        4. `undefined`: `undefined`는 JSON으로 직렬화할 수 없다. (객체의 속성에서 무시됨)
        이 외에도 `NaN`과 `Infinity`와 같은 값도 JSON에서 지원되지 않음.
    */

// 6. 얕은 복사와 깊은 복사의 차이점
    /*
    - 얕은 복사 : 객체의 최상위 속성(1차원)만 복사하며, 중첩된 객체나 배열은 원본 객체와 참조를 공유한다. 즉, 중첩된 객체의 변경이 원본 객체에 영향을 미칠 수 있다.
    - 깊은 복사 : 객체의 모든 속성을 재귀적으로 복사하여 중첩된 객체나 배열도 새로운 인스턴스로 생성한다. 따라서 원본 객체와 복사된 객체는 서로 독립적이다.
    */

// 7. `JSON.parse(JSON.stringify())`와 깊은 복사를 수행하지 못하는 경우
    /*
    - 함수 : 객체 내에 함수가 포함된 경우, 함수는 직렬화되지 않으므로 복사된 객체에는 해당 함수가 없음.
    - `undefined` : `undefined` 값은 직렬화 과정에서 제거되므로, 복사된 객체에서 해당 속성이 사라짐.
    - `Symbol` : 심볼 속성은 직렬화되지 않으므로 복사된 객체에 포함되지 않음.
    - `Date` 객체 : `Date` 객체는 문자열로 변환되므로, 복사된 객체는 `Date` 객체가 아닌 문자열로 나타남.
    - `Map`, `Set` : 이러한 데이터 구조는 JSON으로 직렬화할 수 없으므로 복사되지 않음.
    */

// 8. 얕은 복사 방법
    // 1. spread연산자(ES6) : 배열 또는 객체의 얕은 복사를 할 때 자주 사용
        const originalArray = [1, 2, 3];
        const shallowCopy = [...originalArray];

    // 2. Array.prototype.slice() : 배열의 얕은 복사를 수행
        const arr = [1, 2, 3];
        const shallowCopy2 = arr.slice();

    // 3. Object.assign() : 객체의 속성을 복사하여 새로운 객체 생성
        const obj = { a:1, b:{ c:2 }};
        const shallowCopy3 = {...obj};

// 9. 깊은 복사의 필요성
    /*
    - 중첩된 객체 수정 : 중첩된 객체를 수정할 때 원본 객체에 영향을 주지 않으려면 깊은 복사가 필요함.
        (사용자 설정 객체가 있을 때, 특정 사용자의 설정을 변경하고 싶지만 원본 설정을 유지해야 할 경우)
    */
    const userSettings = {theme: {color:'blue'}, notifications: true};
    const userSettingCopy = JSON.parse(JSON.stringify(userSettings));
    userSettingCopy.theme.color = 'red';    // 원본은 영향을 받지 않음

    console.log(userSettings.theme.color);  // 'blue'

// 10. 깊은 복사 구현 방법
    // 1) 재귀 함수 : 객체의 모든 속성을 재귀적으로 복사하여 깊은 복사를 수행하는 방법
    // 2) 깊은 복사 라이브러리 사용 : 깊은 복사를 보다 안정적이고 간편하게 처리하기 위해 Lodash와 같은 라이브러리의 `_.cloneDeep()`메서드를 사용


// 11. Object.assign()의 한계
        /*
        - 얕은 복사 : 객체의 최상위 속성만 복사됨.
        중첩된 객체나 배열은 참조로 복사되므로, 원본 객체와 복사된 객체가 같은 중첩된 객체를 참조하게 된다.
        이로 인해 복사된 객체의 중첩된 속성을 수정하면 원본 객체에도 영향을 미친다.
        */

// 12. 배열 복사 시의 spread 연산자
    const originalArray1 = [1, 2, { a: 3 }];
    const copiedArray = [...originalArray1];    // 서로 독립적인 배열이 아니다.

    copiedArray[2].a = 4;
    /* `copiedArray`는 `originalArray`의 얕은 복사본이다. {a:3} 객체는 원본 배열의 객체와 같은 참조를 가진다.
        => 두 배열은 최상위 요소는 독립적이지만, 중첩된 객체는 공유하고 있기 때문에 서로 독립적인 배열이 아니다.
    */

// 13. 재귀를 통한 깊은 복사(기본 원리)
    /*
    1) 기본 데이터 타입 확인 : 함수는 입력 값이 기본 데이터 타입(숫자, 문자열, 불리언 등)인지 확인하고 기본 데이터 타입은 그대로 반환한다.
    2) 객체 및 배열 처리 : 입력값이 객체 또는 배열인 경우, 새로운 객체 또는 배열을 생성한다.
    3) 재귀 호출 : 객체의 각 속성이나 배열의 각 요소에 대해 재귀적으로 복사 함수를 호출하여 깊은 복사를 수행한다.
    4) 결과 반환 : 모든 속성과 요소가 복사된 후, 새로 생성된 객체 또는 배열을 반환한다.
    */

// 14. JSON.stringfy() 의 함수 처리
    /* `JSON.stringfy()`는 객체 내에 함수가 포함된 경우 해다 함수를 직렬화하지 않는다.
        함수는 JSON형식으로 변환할 수 없는 데이터 타입이기 때문에, 직렬화 과정에서 함수는 무시된다.
    */

// 15. 깊은 복사 후 객체 수정( copt.b.c 값을 수정해도 original.b.c 값이 변경되지 않도록)
    const original = { a: 1, b: { c: 2 } };
    // const copy = Object.assign({}, original);    (변경 전)
    const copy = JSON.parse(JSON.stringify(original));  // 깊은 복사

    copy.b.c = 3;

    console.log(original.b.c);  // 2
    console.log(copy.b.c);  // 3

// 16. `slice()`와 얕은 복사
    // 중첩배열이나 객체가 있는 경우, 원본 배열과 복사된 배열은 중첩된 요소를 공유하게 된다.

// 17. `JSON.parse()`의 반환 값
    JSON.parse('{"a":1, "b":true, "c":"hello"}');   // {a:1, b:true, c: "hello"}

// 18. 깊은 복사 후 참조 확인
    // 두 배열의 요소를 비교하여 참조가 동일한지 확인할 수 있다.

// 19. `Symbol()`타입의 직렬화
    // `Symbol()`타입은 `JSON.stringfy()`에 의해 직렬화 되지 않는다.(무시된다)

// 20. `JSON.stringfy()`의 순환 참조 문제
    // 객체가 순환 참조(자기 자신을 참조)하는 경우 `JSON.stringfy()`는 `TypeError`를 발생시킨다.