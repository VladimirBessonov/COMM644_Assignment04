function fibonacci(num){

    var a = 1, b = 0, temp;
    while (num >= 0){
        temp = a;
        a = a + b;
        b = temp;
        num--;
    }
    return b;
}

this.addEventListener('message', (e) => {
    console.log('received', e.data)
    const result = fibonacci(e.data)
    //  const result = e.data
    console.log(result)
    postMessage(result)
})