// Q8 - Implement Array.prototype.myMap to behave like Array.prototype.map
'use strict';

if (!Array.prototype.myMap) {
    Array.prototype.myMap = function(callback, thisArg) {
        if (this == null) throw new TypeError('Array.prototype.myMap called on null or undefined');
        if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

        const result = [];
        for (let i = 0; i < this.length; i++) {
            if (i in this) {
                result[i] = callback.call(thisArg, this[i], i, this);
            }
        }
        return result;
    };
}

// Demo
console.log('\n--- Q8 Demo: Array.prototype.myMap ---');
const arr = [1, 2, 3];
const doubled = arr.myMap(n => n * 2);
console.log('[1,2,3].myMap(n => n * 2) =>', doubled);

// Compare with native map
console.log('Native map produces same result:', JSON.stringify(doubled) === JSON.stringify(arr.map(n => n * 2)), '\n');
