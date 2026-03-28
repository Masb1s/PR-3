function getBracketString(id) {
    const raw = document.getElementById(id).value.trim();
    if (!raw) {
        console.error("Помилка: рядок порожній.");
        return null;
    }
if (!/^[(){}\[\]]+$/.test(raw)) {
        console.error("Помилка: дозволені лише дужки (), {}, [].");
        return null;
    }
    return raw;
}

function getStrictNumber(id) {
    const raw = document.getElementById(id).value.trim();
    if (!raw) {
        console.error("Помилка: число не введено.");
        return null;
    }
    if (!/^-?\d+$/.test(raw)) {
        console.error("Помилка: введено не число.");
        return null;
    }
    return Number(raw);
}

class Stack {
    constructor() {
        this.items = [];
    }
    push(v) {
        this.items.push(v);
    }
    pop() {
        if (this.items.length === 0) {
            console.error("Помилка: стек порожній.");
            return null;
        }
        return this.items.pop();
    }
    peek() {
        return this.items.length === 0 ? null : this.items[this.items.length - 1];
    }
    isEmpty() {
        return this.items.length === 0;
    }
    size() {
        return this.items.length;
    }
}

function testStack() {
    const s = new Stack();
    console.log("Порожній:", s.isEmpty() === true);
    s.push(10);
    s.push(20);
    console.log("Верхівка:", s.peek() === 20);
    console.log("Розмір:", s.size() === 2);
    console.log("Pop:", s.pop() === 20);
    console.log("Pop:", s.pop() === 10);
    console.log("Underflow:", s.pop() === null);
}

class QueueTwoStacks {
    constructor() {
        this.inStack = [];
        this.outStack = [];
    }
    enqueue(v) {
        this.inStack.push(v);
    }
    shiftStacks() {
        if (this.outStack.length === 0) {
            while (this.inStack.length > 0) {
                this.outStack.push(this.inStack.pop());
            }
        }
    }
    dequeue() {
        this.shiftStacks();
        if (this.outStack.length === 0) {
            console.error("Помилка: черга порожня.");
            return null;
        }
        return this.outStack.pop();
    }
    peek() {
        this.shiftStacks();
        return this.outStack.length === 0 ? null : this.outStack[this.outStack.length - 1];
    }
}

function testQueue() {
    const q = new QueueTwoStacks();
    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    console.log("Peek:", q.peek() === 1);
    console.log("Dequeue:", q.dequeue() === 1);
    console.log("Dequeue:", q.dequeue() === 2);
    console.log("Dequeue:", q.dequeue() === 3);
    console.log("Empty dequeue:", q.dequeue() === null);
}

class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }
    push(v) {
        this.stack.push(v);
        if (this.minStack.length === 0 || v <= this.minStack[this.minStack.length - 1]) {
            this.minStack.push(v);
        }
    }
    pop() {
        if (this.stack.length === 0) {
            console.error("Помилка: стек порожній.");
            return null;
        }
        const removed = this.stack.pop();
        if (removed === this.minStack[this.minStack.length - 1]) {
            this.minStack.pop();
        }
        return removed;
    }
    top() {
        return this.stack.length === 0 ? null : this.stack[this.stack.length - 1];
    }
    getMin() {
        return this.minStack.length === 0 ? null : this.minStack[this.minStack.length - 1];
    }
}

function testMinStack() {
    const ms = new MinStack();
    ms.push(2);
    ms.push(0);
    ms.push(3);
    console.log("Min:", ms.getMin() === 0);
    ms.pop();
    console.log("Min:", ms.getMin() === 0);
}

class LRUCache {
    constructor(capacity = 2) {
        this.capacity = capacity;
        this.map = new Map();
    }
    get(key) {
        if (!this.map.has(key)) return null;
        const value = this.map.get(key);
        this.map.delete(key);
        this.map.set(key, value);
        return value;
    }
    put(key, value) {
        if (this.map.has(key)) {
            this.map.delete(key);
        } else if (this.map.size >= this.capacity) {
            const firstKey = this.map.keys().next().value;
            this.map.delete(firstKey);
        }
        this.map.set(key, value);
    }
}

function testLRU() {
    const lru = new LRUCache(2);
    lru.put(1, 1);
    lru.put(2, 2);
    console.log("Get 1:", lru.get(1) === 1);
    lru.put(3, 3);
    console.log("Get 2:", lru.get(2) === null);
    lru.put(4, 4);
    console.log("Get 1:", lru.get(1) === null);
    console.log("Get 3:", lru.get(3) === 3);
    console.log("Get 4:", lru.get(4) === 4);
}

function isValidParentheses(str) {
    const stack = [];
    const pairs = { ")": "(", "}": "{", "]": "[" };
    for (let ch of str) {
        if (["(", "{", "["].includes(ch)) {
            stack.push(ch);
        } else if (pairs[ch]) {
            if (stack.pop() !== pairs[ch]) return false;
        }
    }
    return stack.length === 0;
}

function testParentheses() {
    console.log("({}):", isValidParentheses("({})") === true);
    console.log("([]):", isValidParentheses("([])") === true);
    console.log("({[]}):", isValidParentheses("({[]})") === true);
    console.log("(()):", isValidParentheses("(()") === false);
}

function runStackTests() {
    console.clear();
    testStack();
}

function runQueueTests() {
    console.clear();
    testQueue();
}

function runMinStackTests() {
    console.clear();
    testMinStack();
}

function runLRUTests() {
    console.clear();
    testLRU();
}

function runValidParentheses() {
    console.clear();
    const str = getBracketString("inputString");
    if (!str) return;
    console.log("Valid:", isValidParentheses(str));
}
