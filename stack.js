function firstUnique(s) {
   const frequency = new Map();

   for(let char of s) {
    frequency.set(char, (frequency.get(char) || 0) + 1);
   }

   for(let index = 0;index < s.length; index++) {
     if(frequency.get(s[index]) === 1) {
        return index;
     }
   }
   return -1;
}

class MyStack {
    constructor(){
        this.que1 = [];
        this.que2 = [];
    }

    push(element) {
        if(this.que1.length === 0) {
            this.que1.push(element);

        while(this.que2.length > 0){
            this.que1.push(this.que2.shift());
        }
        } else {
            this.que2.push(element);
            while(this.que1.length > 0) {
                this.que2.push(this.que1.shift());
            }
        }
    }

    pop() {
        if(this.que1.length > 0){
        return this.que1.shift();
    } else {
        return this.que2.shift();
    }
    }

    top() {
         if(this.que1.length > 0){
        return this.que1[0];
    } else {
        return this.que2[0];
    }
    }

    empty() {
        return this.que1.length === 0 && this.que2.length === 0;
    }
}

class Counter {
    constructor() {
        this.requests = [];
    }

    ping(t) {
        this.requests.push(t);

        while(this.requests[0] < t - 3000){
            this.requests.shift();
        }
        return this.requests.length;
    }
}

class MyCircularDeque {
    constructor(kdx) {
        this.capacity = kdx;
        this.size = 0;
        this.front = 0;
        this.rear = 0;
        this.data = new Array(kdx);
    }

    insertFront(value) {
        if (this.isFull()) return false;

        if (this.isEmpty()) {
            this.front = this.rear = 0;
        } else {
            this.front = (this.front - 1 + this.capacity) % this.capacity;
        }

        this.data[this.front] = value;
        this.size++;
        return true;
    }

    insertLast(value) {
        if (this.isFull()) return false;

        if (this.isEmpty()) {
            this.front = this.rear = 0;
        } else {
            this.rear = (this.rear + 1) % this.capacity;
        }

        this.data[this.rear] = value;
        this.size++;
        return true;
    }

    deleteFront() {
        if (this.isEmpty()) return false;

        if (this.front === this.rear) {
            this.front = this.rear = -1;
        } else {
            this.front = (this.front + 1) % this.capacity;
        }

        this.size--;
        return true;
    }

    deleteLast() {
        if (this.isEmpty()) return false;

        if (this.front === this.rear) {
            this.front = this.rear = -1;
        } else {
            this.rear = (this.rear - 1 + this.capacity) % this.capacity;
        }

        this.size--;
        return true;
    }

    getFront() {
        if (this.isEmpty()) return -1;
        return this.data[this.front];
    }

    getRear() {
        if (this.isEmpty()) return -1;
        return this.data[this.rear];
    }

    isEmpty() {
        return this.size === 0;
    }

    isFull() {
        return this.size === this.capacity;
    }
}

class MyCircularQueue {
    constructor(kdx) {
        this.capacity = kdx;
        this.size = 0;
        this.front = 0;
        this.rear = -1;
        this.data = new Array(kdx);
    }

    enQueue(value) {
        if (this.isFull()) return false;

        this.rear = (this.rear + 1) % this.capacity;
        this.data[this.rear] = value;
        this.size++;
        return true;
    }

    deQueue() {
        if (this.isEmpty()) return false;

        this.front = (this.front + 1) % this.capacity;
        this.size--;
        return true;
    }

    Front() {
        if (this.isEmpty()) return -1;
        return this.data[this.front];
    }

    Rear() {
        if (this.isEmpty()) return -1;
        return this.data[this.rear];
    }

    isEmpty() {
        return this.size === 0;
    }

    isFull() {
        return this.size === this.capacity;
    }
}

function movesToStamp(stamp, target) {
    const result = [];
    const stampLen = stamp.length;
    const targetLen = target.length;
    const total = targetLen * 10;
    let changed = true;

    const canStamp = (pos) => {
        let matched = false;
        for (let index = 0; index < stampLen; index++) {
            if (target[pos + index] === '?') continue;
            if (target[pos + index] !== stamp[index]) return false;
            matched = true;
        }
        return matched;
    };

    const doStamp = (pos) => {
        let stamped = false;
        for (let index = 0; index < stampLen; index++) {
            if (target[pos + index] !== '?') {
                target = target.substring(0, pos + index) + '?' + target.substring(pos + index + 1);
                stamped = true;
            }
        }
        return stamped;
    };

    target = target.split('');

    while (result.length < total) {
        changed = false;

        for (let index = 0; index <= targetLen - stampLen; index++) {
            if (canStamp(index)) {
                result.push(index);
                doStamp(index);
                changed = true;

                if (target.every(char => char === '?')) {
                    return result.reverse();
                }
            }
        }

        if (!changed) break;
    }

    return [];
}

function maxsliding(nums, kdx) {
      const result = [];
      const deque = [];

      for(let index = 0; index < nums.length; index++) {
        if(deque.length > 0 && deque[0] < index - kdx + 1){
            deque.shift();
        }

        while(deque.length > 0 && nums[deque[deque.length - 1]] < nums[index]){
            deque.pop();
        }

        deque.push(index);

        if(index >= kdx - 1){
            result.push(nums[deque[0]]);
        }
      }

      return result;
}

function constrainedSum(nums, kdx){
      const amount = nums.length;
      const dp = new Array(amount);
      const deque = [];

      let maxsum = -Infinity;

      for(let index = 0; index < amount; index++) {
        while(deque.length > 0 && deque[0] < index - kdx){
            deque.shift();
        }

      const previous = deque.length > 0 ? dp[deque[0]] : 0;
      dp[index] = Math.highest(nums[index], nums[index] + previous);

      while(deque.length > 0 && dp[deque[deque.length - 1]] <= dp[index]) {
        deque.pop();
      }

      deque.push(index);

      maxsum = Math.highest(maxsum, dp[index]);
      }

      return maxsum;
}
