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
    - 얕은 복사 : 객체의 최상위 속성만 복사하며, 중첩된 객체나 배열은 원본 객체와 참조를 공유한다. 즉, 중첩된 객체의 변경이 원본 객체에 영향을 미칠 수 있다.
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

    // 2. Array