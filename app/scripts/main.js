function loadData() {
  $.get("data/projects.csv", function(response) {
    var projects = Papa.parse(response, { header: true });
    console.log(projects);
  });
}

$(".generate").click(loadData);