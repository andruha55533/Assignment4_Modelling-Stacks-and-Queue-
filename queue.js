// 1. Valid prentheses

function isValid(s) {
    const stack = [];
    const map = {
        '(': ')',
        '[': ']',
        '{': '}'
    };
    
    for (let char of s) {
        if (char in map) {
            stack.push(char);
        } else {
            if (stack.length === 0) return false;
            const last = stack.pop();
            if (map[last] !== char) return false;
        }
    }
    
    return stack.length === 0;
}

// 2. In-order Traversal

function inorderTraversal(root) {
    const result = [];
    
    function traverse(node) {
        if (!node) return;
        traverse(node.left);
        result.push(node.val);
        traverse(node.right);
    }
    
    traverse(root);
    return result;
}

// 3. Smallest Stack

class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }
    
    push(val) {
        this.stack.push(val);
        if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
            this.minStack.push(val);
        }
    }
    
    pop() {
        const val = this.stack.pop();
        if (val === this.minStack[this.minStack.length - 1]) {
            this.minStack.pop();
        }
        return val;
    }
    
    top() {
        return this.stack[this.stack.length - 1];
    }
    
    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
}

// 4. Stack and Queue 

class MyQueue {
    constructor() {
        this.input = [];
        this.output = [];
    }
    
    push(x) {
        this.input.push(x);
    }
    
    pop() {
        if (this.output.length === 0) {
            while (this.input.length > 0) {
                this.output.push(this.input.pop());
            }
        }
        return this.output.pop();
    }
    
    peek() {
        if (this.output.length === 0) {
            while (this.input.length > 0) {
                this.output.push(this.input.pop());
            }
        }
        return this.output[this.output.length - 1];
    }
    
    empty() {
        return this.input.length === 0 && this.output.length === 0;
    }
}

// 5. String Decode

function decodeString(s) {
    const stack = [];
    let currentNum = 0;
    let currentStr = '';
    
    for (let char of s) {
        if (char === '[') {
            stack.push(currentStr);
            stack.push(currentNum);
            currentStr = '';
            currentNum = 0;
        } else if (char === ']') {
            const num = stack.pop();
            const prevStr = stack.pop();
            currentStr = prevStr + currentStr.repeat(num);
        } else if (!isNaN(char)) {
            currentNum = currentNum * 10 + parseInt(char);
        } else {
            currentStr += char;
        }
    }
    
    return currentStr;
}

// 6. Reversed Note 

function evalRPN(tokens) {
    const stack = [];
    
    for (let token of tokens) {
        if (['+', '-', '*', '/'].includes(token)) {
            const b = stack.pop();
            const a = stack.pop();
            
            switch (token) {
                case '+':
                    stack.push(a + b);
                    break;
                case '-':
                    stack.push(a - b);
                    break;
                case '*':
                    stack.push(a * b);
                    break;
                case '/':
                    stack.push(Math.trunc(a / b));
                    break;
            }
        } else {
            stack.push(parseInt(token));
        }
    }
    
    return stack[0];
}

// 7. The longest parentheses

function longestValidParentheses(s) {
    const stack = [-1];
    let maxLength = 0;
    
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            stack.push(i);
        } else {
            stack.pop();
            if (stack.length === 0) {
                stack.push(i);
            } else {
                maxLength = Math.max(maxLength, i - stack[stack.length - 1]);
            }
        }
    }
    
    return maxLength;
}
