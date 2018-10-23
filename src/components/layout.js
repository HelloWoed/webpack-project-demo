export default function(){
    const layout = 'this is layout...'
    var a = new Set();
    a.add('test');
    a.add('test1');
    a.add('test2');
    a.add('test3');
    a.add('test4');
    a.add('test5');
    let b = Array.from(a);
    console.log(b);
    console.log(layout);
}