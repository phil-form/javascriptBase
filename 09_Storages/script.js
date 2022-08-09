localStorage.setItem('token', 'test');
console.log(localStorage.getItem('token'));

sessionStorage.setItem('testSession', '123456789');
console.log(sessionStorage.getItem('testSession'));

// b + a = ba
// ba + + a = ba + NaN
// ba + NaN = baNaN
// baNaN + a
// baNaNa
console.log(('b' + 'a' + + 'a' + 'a').toLowerCase());
