const {
  add,
  calculateTip,
  cel̥siusToFahrenheit,
  fahrenheitToCelsius,
} = require("../src/math");

// console.log(typeof calculateTip)
// test("Should calculate total with tip", () => {
//   const total = calculateTip(10, 0.3);
//   expect(total).toBe(13);

//   if (total !== 13) {
//     throw new Error("Test tip should be 13. got" + total);
//   }
// });

// test("Should calculate total with default tip", () => {
//   const total = calculateTip(10);
//   expect(total).toBe(12.5);
// });

// test("should convert fahrenheit to celsius", () => {
//     const temp = fahrenheitToCelsius(104)
//     expect(temp).toBe(40)
// })

// test("should convert celsius to fahrenheit", () => {
//     const temp =cel̥siusToFahrenheit(40)
//     expect(temp).toBe(104)
// })

// test('Async test demo', (done) => {
//     setTimeout(() => {
//         done()
//         expect(1).toBe(2)
//     }, 2000);

// })

test("Should two numbers", (done) => {
  add(2, 3).then((sum) => {
    expect(sum).toBe(5);
    done();
  });
});

test("Should add two numbers async/await", async () => {
  const sum = await add(10, 22);
  expect(sum).toBe(32);
});

// test("this should fail",() => {
//     throw new Error("Failure!")
// })
