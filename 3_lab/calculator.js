const operators = {
  "+": { precedence: 2, associativity: "Left", func: (a, b) => a + b },
  "-": { precedence: 2, associativity: "Left", func: (a, b) => a - b },
  "*": { precedence: 3, associativity: "Left", func: (a, b) => a * b },
  "/": { precedence: 3, associativity: "Left", func: (a, b) => a / b },
  "^": {
    precedence: 4,
    associativity: "Right",
    func: (a, b) => Math.pow(a, b),
  },
};

const functions = {
  sqrt: { func: (a) => Math.sqrt(a) },
  exp: { func: (a) => Math.exp(a) },
  log: { func: (a) => Math.log(a) },
  sin: { func: (a) => Math.sin(a) },
  cos: { func: (a) => Math.cos(a) },
  tan: { func: (a) => Math.tan(a) },
};

const constants = {
  e: Math.E,
  pi: Math.PI,
  π: Math.PI,
};

function tokenize(expr) {
  expr = expr.replace(/\s+/g, "");
  const regex = /([0-9]*\.?[0-9]+|[+\-*/^(),]|[a-zA-Zπ]+)/g;
  return expr.match(regex);
}

function infixToPostfix(tokens) {
  let outputQueue = [];
  let operatorStack = [];

  tokens.forEach((token) => {
    if (!isNaN(token)) {
      outputQueue.push(parseFloat(token));
    } else if (token in constants) {
      outputQueue.push(constants[token]);
    } else if (token in functions) {
      operatorStack.push(token);
    } else if (token === ",") {
      while (
        operatorStack.length &&
        operatorStack[operatorStack.length - 1] !== "("
      ) {
        outputQueue.push(operatorStack.pop());
      }
    } else if (token in operators) {
      while (
        operatorStack.length &&
        operatorStack[operatorStack.length - 1] in operators
      ) {
        let o1 = token;
        let o2 = operatorStack[operatorStack.length - 1];
        if (
          (operators[o1].associativity === "Left" &&
            operators[o1].precedence <= operators[o2].precedence) ||
          (operators[o1].associativity === "Right" &&
            operators[o1].precedence < operators[o2].precedence)
        ) {
          outputQueue.push(operatorStack.pop());
          continue;
        }
        break;
      }
      operatorStack.push(token);
    } else if (token === "(") {
      operatorStack.push(token);
    } else if (token === ")") {
      while (
        operatorStack.length &&
        operatorStack[operatorStack.length - 1] !== "("
      ) {
        outputQueue.push(operatorStack.pop());
      }
      if (!operatorStack.length) {
        throw new Error("Неверное расположение скобок");
      }
      operatorStack.pop();
      if (
        operatorStack.length &&
        operatorStack[operatorStack.length - 1] in functions
      ) {
        outputQueue.push(operatorStack.pop());
      }
    } else {
      throw new Error("Неизвестный токен: " + token);
    }
  });

  while (operatorStack.length) {
    let op = operatorStack.pop();
    if (op === "(" || op === ")") {
      throw new Error("Неверное расположение скобок");
    }
    outputQueue.push(op);
  }

  return outputQueue;
}

function evaluatePostfix(postfix) {
  let stack = [];
  postfix.forEach((token) => {
    if (typeof token === "number") {
      stack.push(token);
    } else if (token in operators) {
      let b = stack.pop();
      let a = stack.pop();
      let result = operators[token].func(a, b);
      stack.push(result);
    } else if (token in functions) {
      let a = stack.pop();
      let result = functions[token].func(a);
      stack.push(result);
    } else {
      throw new Error("Неизвестный оператор в выражении: " + token);
    }
  });
  if (stack.length !== 1) {
    throw new Error("Ошибка вычисления выражения");
  }
  return stack[0];
}

function evaluateExpression(expr) {
  try {
    const tokens = tokenize(expr);
    const postfix = infixToPostfix(tokens);
    const result = evaluatePostfix(postfix);
    return result;
  } catch (error) {
    return "Ошибка: " + error.message;
  }
}

function calculate() {
  const expr = document.getElementById("expression").value;
  const result = evaluateExpression(expr);
  document.getElementById("result").textContent = "Результат: " + result;
}
