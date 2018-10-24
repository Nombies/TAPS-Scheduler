var jsonObj = {
  attr1 : "1",
  attr2 : ["one"]
}

jsonObj.attr2.push("two");

console.log(jsonObj.attr2[1]);
