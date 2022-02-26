names = ["Sonu", "Monu", "rajkumer"];
exampleOne = new CompleteMe("#example-one", {
  data: names,
  suggestResult: true,
  canAddNewRecords: true,
  onSelect: function (value) {
    return console.log("onSelect " + value);
  },
  onAdd: function (newRecord) {
    return console.log("onAdd " + newRecord);
  },
});
