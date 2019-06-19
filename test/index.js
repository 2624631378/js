// let random = Math.random()
// let test = new Promise((resolve, reject) => {

//     console.log(random);

//     if (random > 0.5) {
//         resolve('大于0.5')
//     } else {
//         reject('小于等于0.5')
//     }
// })

// let p = test.then((result) => {
//     console.log('resolve1');

//     console.log(result)
//     return random
// }).catch((result) => {
//     console.log('reject');
//     console.log(result)
//     return result
// }).then((result) => {
//     console.log('resolve2');
//     console.log(result)
//     return result
// }).then((result) => {
//     console.log('resolve3');
//     console.log('last', result)
// })

// let p1 = new Promise((resolve, reject) => {
//     resolve('成功了')
//   })

//   let p2 = new Promise((resolve, reject) => {
//     resolve('success')
//   })

//   let p3 = Promise.reject('失败')

//   Promise.all([p1, p2]).then((result) => {
//     console.log(result)               //['成功了', 'success']
//   }).catch((error) => {
//     console.log(error)
//   })

//   Promise.all([p1,p3,p2]).then((result) => {
//     console.log(result)
//   }).catch((error) => {
//     console.log(error)      // 失败了，打出 '失败'
//   })



//   let p1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('success')
//     },1000)
//   })

//   let p2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('failed')
//     }, 500)
//   })

//   Promise.race([p1, p2]).then((result) => {
//     console.log(result)
//   }).catch((error) => {
//     console.log(error)  // 打开的是 'failed'
//   })




// function getUserName() {
//     let data = 'superman';
//     return new Promise((resolve, reject) => {
//        resolve(data)
//     })
// }

// function getUser(username) {
//     let data = {
//         id: 1,
//         username: 'superman',
//         gender: 'male'
//     }
//     return new Promise((resolve, reject) => {
//         if (username) {
//           resolve(data)
//         } else {
//             reject('err');
//         }
//     })
// }
// getUserName().then(username => {
//         return getUser();
//     })
//     .then(user => {
//         console.log(user);
//     })
//     .catch(err => {
//         console.log(err);
//     })


// const yid = (a,b) => {
//     return (...arr) => {
//         return [a.apply(null, arr), b.apply(null, arr)]
//     }
// };

const yid = () => {
    return (...arr) => { 
        let newArr =arr.sort();
        return [newArr[0], newArr[newArr.length-1]]
    }
};



const minMax = yid(Math.min, Math.max);
 // [1,5]
console.log(minMax(1, 2, 3, 4, 5));


// function avg(...arg) {
//     console.log(typeof arg);
//     arg.sort();
//     console.log(arg);
//     arg.pop();
//     arg.shift();
   
//     return arg
// }

// avg(2, 4, 6,70,20,0);


// function minMax(){
//     console.log(arguments);
// }
// minMax(1, 2, 3, 4, 5)