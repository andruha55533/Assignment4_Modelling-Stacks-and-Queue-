// 1. Unique Chars

function firstUnique(s) {
   const frequency = new Map();

   for(let char of s) {
    frequency.set(char, (frequency.get(char) || 0) + 1);
   }

   for(let i = 0;i < s.length; i++) {
     if(frequency.get(s[i]) === 1) {
        return i;
     }
   }
   return -1;
}

// 2. Stack-out-of-Queue

class MyStack {
    constructor(){
        this.que1 = [];
        this.que2 = [];
    }

    push(x) {
        if(this.que1.length === 0) {
            this.que1.push(x);

        while(this.que2.length > 0){
            this.que1.push(this.que2.shift());
        }
        } else {
            this.que2.push(x);
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

// 3. Last Executions

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

// 4. Two-sided locked Queue

class MyCircularDeque {
    constructor(k) {
        this.capacity = k;
        this.size = 0;
        this.front = 0;
        this.rear = 0;
        this.data = new Array(k);
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

// 5. Usual locked Queue

class MyCircularQueue {
    constructor(k) {
        this.capacity = k;
        this.size = 0;
        this.front = 0;
        this.rear = -1;
        this.data = new Array(k);
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

// 6. Stamp

function movesToStamp(stamp, target) {
    const result = [];
    const stampLen = stamp.length;
    const targetLen = target.length;
    const total = targetLen * 10;
    let changed = true;
    
    const canStamp = (pos) => {
        let matched = false;
        for (let i = 0; i < stampLen; i++) {
            if (target[pos + i] === '?') continue;
            if (target[pos + i] !== stamp[i]) return false;
            matched = true;
        }
        return matched;
    };
    
    const doStamp = (pos) => {
        let stamped = false;
        for (let i = 0; i < stampLen; i++) {
            if (target[pos + i] !== '?') {
                target = target.substring(0, pos + i) + '?' + target.substring(pos + i + 1);
                stamped = true;
            }
        }
        return stamped;
    };
    
    target = target.split('');
    
    while (result.length < total) {
        changed = false;
        
        for (let i = 0; i <= targetLen - stampLen; i++) {
            if (canStamp(i)) {
                result.push(i);
                doStamp(i);
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

// 7. Sliding Window

function maxsliding(nums, k) {
      const result = [];
      const deque = [];

      for(let i = 0; i < nums.length; i++) {
        if(deque.length > 0 && deque[0] < i - k + 1){
            deque.shift();
        }

        while(deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]){
            deque.pop();
        }

        deque.push(i);

        if(i >= k - 1){
            result.push(nums[deque[0]]);
        }
      }

      return result;
}

// 8. Constrained Subset Sum

function constrainedSum(nums, k){
      const n = nums.length;
      const dp = new Array(n);
      const deque = [];

      let maxsum = -Infinity;

      for(let i = 0; i < n; i++) {
        while(deque.length > 0 && deque[0] < i - k){
            deque.shift();
        }

      const previous = deque.length > 0 ? dp[deque[0]] : 0;
      dp[i] = Math.max(nums[i], nums[i] + previous);

      while(deque.length > 0 && dp[deque[deque.length - 1]] <= dp[i]) {
        deque.pop();
      }

      deque.push(i);

      maxsum = Math.max(maxsum, dp[i]);
      }

      return maxsum;
}